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

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session_id parameter" },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verify payment was successful
    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 403 }
      );
    }

    const downloadPath = session.metadata?.downloadPath;

    if (!downloadPath) {
      return NextResponse.json(
        { error: "No downloads available for this purchase" },
        { status: 404 }
      );
    }

    // List files from blob storage
    const { blobs } = await list({ prefix: downloadPath });

    // Filter for audio files and extract filenames
    const audioFiles = blobs
      .filter((blob) => /\.(mp3|flac|wav|m4a)$/i.test(blob.pathname))
      .map((blob) => path.basename(blob.pathname))
      .sort((a, b) => {
        // Sort by track number if present at the start of the filename
        const numA = parseInt(a.match(/^(\d+)/)?.[1] || "999");
        const numB = parseInt(b.match(/^(\d+)/)?.[1] || "999");
        return numA - numB;
      });

    return NextResponse.json({
      albumTitle: session.metadata?.albumTitle || "Album",
      tracks: audioFiles,
    });
  } catch (error) {
    console.error("Tracks listing error:", error);
    return NextResponse.json(
      { error: "Error retrieving tracks" },
      { status: 500 }
    );
  }
}
