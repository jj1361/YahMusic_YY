"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
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
        <div className="hidden md:flex items-center gap-6">
          <a href="#album" className="text-gray-400 hover:text-white transition-colors">Album</a>
          <a href="#preview" className="text-gray-400 hover:text-white transition-colors">Preview</a>
          <a href="#coming-soon" className="text-gray-400 hover:text-white transition-colors">Coming Soon</a>
          {/* <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a> */}
        </div>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white my-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64' : 'max-h-0'}`}>
        <div className="px-6 py-4 border-t border-white/10 bg-background/95 backdrop-blur-md">
          <a
            href="#album"
            onClick={closeMenu}
            className="block py-3 text-gray-400 hover:text-white transition-colors"
          >
            Album
          </a>
          <a
            href="#preview"
            onClick={closeMenu}
            className="block py-3 text-gray-400 hover:text-white transition-colors"
          >
            Preview
          </a>
          <a
            href="#coming-soon"
            onClick={closeMenu}
            className="block py-3 text-gray-400 hover:text-white transition-colors"
          >
            Coming Soon
          </a>
          {/* <a
            href="#about"
            onClick={closeMenu}
            className="block py-3 text-gray-400 hover:text-white transition-colors"
          >
            About
          </a> */}
        </div>
      </div>
    </nav>
  );
}
