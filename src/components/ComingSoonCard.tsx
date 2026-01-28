import Image from "next/image";

interface ComingSoonCardProps {
  title: string;
  artist: string;
  imageUrl: string;
  releaseDate?: string;
}

export default function ComingSoonCard({ title, artist, imageUrl, releaseDate }: ComingSoonCardProps) {
  return (
    <div className="group relative bg-primary/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 w-full">
      {/* Coming Soon Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-semibold backdrop-blur-sm">
          Coming Soon
        </span>
      </div>

      {/* Album Cover */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${title} album cover`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Album Info */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
        <p className="text-gray-400 text-lg mb-4">{artist}</p>

        {releaseDate && (
          <div className="flex items-center gap-2 text-gray-500 mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">{releaseDate}</span>
          </div>
        )}

        {/* Stay Tuned Message */}
        <div className="py-3 border-t border-white/10">
          <p className="text-gray-400 text-sm text-center">
            Stay tuned for the release
          </p>
        </div>
      </div>
    </div>
  );
}
