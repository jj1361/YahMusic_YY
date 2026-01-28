import Image from "next/image";

export default function Navigation() {
  return (
    <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <Image
            src="/logo.jpeg"
            alt="Taighie Productions"
            width={48}
            height={48}
            className="h-12 w-auto invert brightness-200"
          />
          <span className="text-xl font-bold text-white">TaiGhieProductions</span>
        </div>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-6">
          <a href="#album" className="text-gray-400 hover:text-white transition-colors">Album</a>
          <a href="#preview" className="text-gray-400 hover:text-white transition-colors">Preview</a>
          <a href="#coming-soon" className="text-gray-400 hover:text-white transition-colors">Coming Soon</a>
          {/* <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a> */}
        </div>
      </div>
    </nav>
  );
}
