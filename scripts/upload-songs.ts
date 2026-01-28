import { put, list } from "@vercel/blob";
import { readdir, readFile } from "fs/promises";
import path from "path";

const SONGS_DIR = path.join(process.cwd(), "Songs");
const ALBUM_NAME = "WE BOW";

async function uploadSongs() {
  console.log("Starting upload to Vercel Blob...\n");

  // Check for existing blobs
  const { blobs: existingBlobs } = await list({ prefix: `albums/${ALBUM_NAME}/` });
  if (existingBlobs.length > 0) {
    console.log(`Found ${existingBlobs.length} existing files in blob storage.`);
    console.log("Existing files:");
    existingBlobs.forEach((blob) => console.log(`  - ${blob.pathname}`));
    console.log("\nTo re-upload, delete existing blobs first.\n");
  }

  // Read songs directory
  const files = await readdir(SONGS_DIR);
  const audioExtensions = [".mp3", ".flac", ".wav", ".m4a"];
  const audioFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return audioExtensions.includes(ext);
  });

  console.log(`Found ${audioFiles.length} audio files to upload:\n`);

  for (const file of audioFiles) {
    const filePath = path.join(SONGS_DIR, file);
    const fileBuffer = await readFile(filePath);
    const blobPath = `albums/${ALBUM_NAME}/${file}`;

    // Check if already uploaded
    const exists = existingBlobs.some((blob) => blob.pathname === blobPath);
    if (exists) {
      console.log(`⏭️  Skipping (already exists): ${file}`);
      continue;
    }

    console.log(`📤 Uploading: ${file}`);

    const blob = await put(blobPath, fileBuffer, {
      access: "public",
      addRandomSuffix: false,
    });

    console.log(`✅ Uploaded: ${blob.url}\n`);
  }

  console.log("\n🎉 Upload complete!");
  console.log("\nNext steps:");
  console.log("1. Your songs are now stored in Vercel Blob");
  console.log("2. The download/preview APIs will fetch from blob storage");
  console.log("3. Songs are protected - only accessible via your APIs after payment");
}

uploadSongs().catch(console.error);
