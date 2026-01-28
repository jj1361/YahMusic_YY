import Image from "next/image";
import AlbumCard from "@/components/AlbumCard";
import ComingSoonCard from "@/components/ComingSoonCard";
import Navigation from "@/components/Navigation";
import TrackList from "@/components/TrackList";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/album-cover.jpg"
            alt="YermiYahu"
            fill
            className="object-cover object-top"
            priority
          />
          {/* Gradient Overlay - fade to background at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>

        {/* Centered New Album Release Badge */}
        <div className="relative z-10 flex-1 flex items-end justify-center pb-12">
          <a href="#album" className="text-center animate-pulse hover:animate-none hover:scale-105 transition-transform cursor-pointer">
            <span className="inline-block px-6 py-3 bg-accent/90 text-black font-bold text-lg md:text-xl rounded-full shadow-lg shadow-accent/30 hover:bg-accent hover:shadow-xl hover:shadow-accent/40">
              New Album Release
            </span>
          </a>
        </div>

        {/* Hero Content - Profile style at bottom */}
        <div className="relative z-10 w-full px-6 pb-8">
          <div className="max-w-7xl mx-auto">
            {/* Profile Layout */}
            <div className="flex items-end gap-4">
              {/* Circular Logo */}
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-background bg-background flex-shrink-0">
                <Image
                  src="/logo.jpeg"
                  alt="Taighie Productions"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover invert brightness-200"
                />
              </div>

              {/* Artist Info */}
              <div className="mb-1">
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wide">
                  YermiYahu
                </h1>
                <p className="text-gray-400 text-sm md:text-base">
                  @taighieproductions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Album Purchase Section */}
      <section id="album" className="py-24 bg-gradient-to-b from-background to-primary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get the Album
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Digital download available now.
            </p>
          </div>

          <div className="flex justify-center max-w-md mx-auto">
            <AlbumCard
              title="WE BOW"
              artist="YermiYahu"
              price={30.00}
              imageUrl="/album-cover.jpg"
            />
          </div>

          {/* Track List with Previews */}
          <TrackList />
        </div>
      </section>

      {/* Coming Soon Section */}
      <section id="coming-soon" className="py-24 bg-gradient-to-b from-primary/30 to-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-semibold mb-6">
              UPCOMING RELEASES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              New worship experiences on the horizon. Stay tuned for these upcoming albums.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <ComingSoonCard
              title="Redeemed"
              artist="YermiYahu"
              imageUrl="/redeemed-cover.jpg"
            />
            <ComingSoonCard
              title="Exalted"
              artist="YermiYahu"
              imageUrl="/exalted-cover.jpg"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-primary/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Image
            src="/logo.jpeg"
            alt="Taighie Productions"
            width={300}
            height={300}
            className="mx-auto mb-8 invert brightness-200"
          />
          <h2 className="text-4xl font-bold text-white mb-6"></h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
          <p>&copy; 2025 YermiYahu. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
