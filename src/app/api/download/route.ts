import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { list } from "@vercel/blob";
import path from "path";

export const dynamic = "force-dynamic";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(key, {
    apiVersion: "2024-09-30.acacia",
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");
    const track = searchParams.get("track");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session_id parameter" },
        { status: 400 }
      );
    }

    const stripe = getStripe();

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verify payment was successful
    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 403 }
      );
    }

    // Get the download path from session metadata
    const downloadPath = session.metadata?.downloadPath;

    if (!downloadPath) {
      return NextResponse.json(
        { error: "No download available for this purchase" },
        { status: 404 }
      );
    }

    if (!track) {
      return NextResponse.json(
        { error: "Missing track parameter" },
        { status: 400 }
      );
    }

    // Sanitize the track name to prevent directory traversal
    const sanitizedTrack = path.basename(track);
    const blobPath = `${downloadPath}/${sanitizedTrack}`;

    // Find the blob in storage
    const { blobs } = await list({ prefix: downloadPath });
    const blob = blobs.find((b) => b.pathname === blobPath);

    if (!blob) {
      console.error("File not found in blob storage:", blobPath);
      return NextResponse.json(
        { error: "Download file not found. Please contact support." },
        { status: 404 }
      );
    }

    // Fetch the file from blob storage
    const response = await fetch(blob.url);
    const fileBuffer = await response.arrayBuffer();

    // Determine content type based on file extension
    const ext = path.extname(sanitizedTrack).toLowerCase();
    const contentTypes: Record<string, string> = {
      ".zip": "application/zip",
      ".mp3": "audio/mpeg",
      ".flac": "audio/flac",
      ".wav": "audio/wav",
      ".m4a": "audio/mp4",
    };
    const contentType = contentTypes[ext] || "application/octet-stream";

    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${sanitizedTrack}"`,
        "Content-Length": fileBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Error processing download request" },
      { status: 500 }
    );
  }
}
