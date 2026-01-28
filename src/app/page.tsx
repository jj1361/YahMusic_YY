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
          <div className="flex items-center justify-center gap-6">
            <a href="#" className="text-gray-400 hover:text-accent transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-accent transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
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
