"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface SessionInfo {
  albumTitle: string;
  tracks: string[];
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const [downloadingTrack, setDownloadingTrack] = useState<string | null>(null);
  const [downloadingZip, setDownloadingZip] = useState(false);

  useEffect(() => {
    async function fetchSessionInfo() {
      if (!sessionId) return;

      try {
        const response = await fetch(`/api/tracks?session_id=${sessionId}`);
        if (response.ok) {
          const data = await response.json();
          setSessionInfo(data);
        }
      } catch (error) {
        console.error("Error fetching session info:", error);
      }
    }

    fetchSessionInfo();
  }, [sessionId]);

  const handleDownload = (track: string) => {
    if (!sessionId) return;
    setDownloadingTrack(track);

    // Create a temporary link to trigger download
    const link = document.createElement("a");
    link.href = `/api/download?session_id=${sessionId}&track=${encodeURIComponent(track)}`;
    link.download = track;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloadingTrack(null), 2000);
  };

  const handleDownloadZip = () => {
    if (!sessionId) return;
    setDownloadingZip(true);

    // Create a temporary link to trigger download
    const link = document.createElement("a");
    link.href = `/api/download-zip?session_id=${sessionId}`;
    link.download = `${sessionInfo?.albumTitle || "Album"} - YermiYahu.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloadingZip(false), 3000);
  };

  // Format track name for display (remove number prefix and extension)
  const formatTrackName = (filename: string) => {
    return filename
      .replace(/^\d+\.\s*/, "") // Remove leading number and dot
      .replace(/\.(mp3|flac|wav|m4a)$/i, ""); // Remove extension
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background py-12">
      <div className="max-w-lg mx-auto px-6 text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-accent/20 flex items-center justify-center">
          <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">Thank You!</h1>
        <p className="text-gray-400 text-lg mb-8">
          Your order has been confirmed. You will receive an email confirmation shortly
          with your order details and tracking information.
        </p>

        <div className="bg-white/5 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-2">
            {sessionInfo?.albumTitle || "WE BOW"}
          </h2>
          <p className="text-gray-400 mb-6">by YermiYahu</p>

          {sessionId && sessionInfo?.tracks && sessionInfo.tracks.length > 0 && (
            <>
              {/* Download Full Album as ZIP */}
              <button
                onClick={handleDownloadZip}
                disabled={downloadingZip}
                className="w-full py-3 px-6 bg-accent hover:bg-accent/90 text-black font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mb-4"
              >
                {downloadingZip ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Preparing Download...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Full Album (ZIP)
                  </>
                )}
              </button>

              {/* Track List */}
              <div className="border-t border-white/10 pt-4">
                <h3 className="text-sm font-semibold text-gray-400 mb-3 text-left">
                  Or download individual tracks:
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {sessionInfo.tracks.map((track, index) => (
                    <button
                      key={track}
                      onClick={() => handleDownload(track)}
                      disabled={downloadingTrack === track}
                      className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left group"
                    >
                      <span className="text-accent font-mono text-sm w-6">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-white text-sm flex-1 truncate">
                        {formatTrackName(track)}
                      </span>
                      {downloadingTrack === track ? (
                        <svg className="animate-spin h-4 w-4 text-accent" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-gray-500 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <p className="text-gray-500 text-sm mb-6">
          Your download links are available above. Thank you for your purchase!
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </main>
  );
}
