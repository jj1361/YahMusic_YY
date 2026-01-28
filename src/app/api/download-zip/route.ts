import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { list } from "@vercel/blob";
import path from "path";
import JSZip from "jszip";

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

    // Get the download path and album title from session metadata
    const downloadPath = session.metadata?.downloadPath;
    const albumTitle = session.metadata?.albumTitle || "Album";

    if (!downloadPath) {
      return NextResponse.json(
        { error: "No download available for this purchase" },
        { status: 404 }
      );
    }

    // Get all audio files from blob storage
    const { blobs } = await list({ prefix: downloadPath });

    // Filter for audio files
    const audioExtensions = [".mp3", ".flac", ".wav", ".m4a"];
    const audioBlobs = blobs.filter((blob) => {
      const ext = path.extname(blob.pathname).toLowerCase();
      return audioExtensions.includes(ext);
    });

    if (audioBlobs.length === 0) {
      return NextResponse.json(
        { error: "No audio files found" },
        { status: 404 }
      );
    }

    // Create a zip file
    const zip = new JSZip();

    // Add each audio file to the zip
    for (const blob of audioBlobs) {
      const response = await fetch(blob.url);
      const buffer = await response.arrayBuffer();
      const fileName = path.basename(blob.pathname);
      zip.file(fileName, buffer);
    }

    // Generate the zip file
    const zipBuffer = await zip.generateAsync({
      type: "nodebuffer",
      compression: "DEFLATE",
      compressionOptions: { level: 5 },
    });

    // Create a safe filename for the zip
    const safeAlbumTitle = albumTitle.replace(/[^a-zA-Z0-9\s]/g, "").trim();
    const zipFilename = `${safeAlbumTitle} - YermiYahu.zip`;

    return new NextResponse(new Uint8Array(zipBuffer), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${zipFilename}"`,
        "Content-Length": zipBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Zip download error:", error);
    return NextResponse.json(
      { error: "Error creating zip download" },
      { status: 500 }
    );
  }
}
