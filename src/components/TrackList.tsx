"use client";

import TrackPreview from "./TrackPreview";

// Map display names to actual file names in the Songs folder
const tracks = [
  { name: "Ready to do Your Will", fileName: "1. Ready to do Your Will.mp3" },
  { name: "My Yah", fileName: "2. My Yah .mp3" },
  { name: "O Holy One", fileName: "3. O Holy One.mp3" },
  { name: "You Are God", fileName: "4. You Are God.mp3" },
  { name: "I Will Wait", fileName: "5. I Will Wait.mp3" },
  { name: "Today", fileName: "6. Today.mp3" },
  { name: "Sovereign", fileName: "7. Sovereign.mp3" },
  { name: "We Bow", fileName: "8. We Bow .mp3" },
  { name: "All the Day", fileName: "9. All the Day.mp3" },
  { name: "Oh Most High", fileName: "10. Oh Most High.mp3" },
  { name: "We Won't Take It", fileName: "11. We Won't Take It.mp3" },
  { name: "I Will Be Still", fileName: "12. I Will Be Still.mp3" },
  { name: "My Yah (Remix)", fileName: "My Yah (remix) 1.mp3" },
];

export default function TrackList() {
  return (
    <div id="preview" className="mt-20 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4 text-center">Track List</h3>
      <p className="text-gray-400 text-sm text-center mb-8">
        Click play to preview 30 seconds of each track
      </p>
      <div className="grid gap-3">
        {tracks.map((track, index) => (
          <TrackPreview
            key={track.fileName}
            trackNumber={index + 1}
            trackName={track.name}
            fileName={track.fileName}
          />
        ))}
      </div>
    </div>
  );
}
