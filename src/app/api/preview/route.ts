import { NextRequest, NextResponse } from "next/server";
import { list } from "@vercel/blob";
import path from "path";

export const dynamic = "force-dynamic";

const ALBUM_PATH = "albums/WE BOW";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const track = searchParams.get("track");

    if (!track) {
      return NextResponse.json(
        { error: "Track parameter is required" },
        { status: 400 }
      );
    }

    // Sanitize the track name to prevent directory traversal
    const sanitizedTrack = path.basename(track);
    const blobPath = `${ALBUM_PATH}/${sanitizedTrack}`;

    // Find the blob in storage
    const { blobs } = await list({ prefix: ALBUM_PATH });
    const blob = blobs.find((b) => b.pathname === blobPath);

    if (!blob) {
      return NextResponse.json(
        { error: "Track not found" },
        { status: 404 }
      );
    }

    // Handle range requests for audio streaming
    const range = request.headers.get("range");

    if (range) {
      // For range requests, we need to fetch with range header
      const response = await fetch(blob.url, {
        headers: { Range: range },
      });

      const buffer = await response.arrayBuffer();
      const contentRange = response.headers.get("content-range");
      const contentLength = response.headers.get("content-length");

      return new NextResponse(new Uint8Array(buffer), {
        status: 206,
        headers: {
          "Content-Range": contentRange || "",
          "Accept-Ranges": "bytes",
          "Content-Length": contentLength || buffer.byteLength.toString(),
          "Content-Type": "audio/mpeg",
        },
      });
    }

    // Serve the full file if no range is requested
    const response = await fetch(blob.url);
    const buffer = await response.arrayBuffer();

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": buffer.byteLength.toString(),
        "Accept-Ranges": "bytes",
      },
    });
  } catch (error) {
    console.error("Preview error:", error);
    return NextResponse.json(
      { error: "Error serving preview" },
      { status: 500 }
    );
  }
}
