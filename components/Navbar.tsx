"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 py-4 px-6 md:px-12 backdrop-blur-md bg-black/50 border-b border-white/5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
          <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
            <Image 
              src="/images/logo.png" 
              alt="Logo" 
              width={40}
              height={40}
              className="object-contain w-full h-full"
            />
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:inline-block">
            Guillermo Vásquez<span className="text-blue-500">.</span>
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
          <Link href="/#hero" className="py-2 px-3 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Inicio</Link>
          <Link href="/#approach" className="py-2 px-3 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Enfoque</Link>
          <Link href="/#projects" className="py-2 px-3 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Evidencia</Link>
          <Link href="/#about" className="py-2 px-3 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Sobre Mí</Link>
          <Link href="/#contact" className="ml-2 px-6 py-2 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all focus:outline-none focus:ring-2 focus:ring-white">
            Contacto
          </Link>
        </nav>

        {/* Mobile menu trigger */}
        <button 
          className="md:hidden p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav — sin framer-motion, CSS puro */}
      <div 
        className={`absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl md:hidden transition-all duration-200 origin-top ${
          isOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
        }`}
        style={{ transformOrigin: 'top' }}
      >
        <Link onClick={() => setIsOpen(false)} href="/#hero" className="py-3 px-4 text-gray-300 hover:text-white border-b border-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500">Inicio</Link>
        <Link onClick={() => setIsOpen(false)} href="/#approach" className="py-3 px-4 text-gray-300 hover:text-white border-b border-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500">Enfoque</Link>
        <Link onClick={() => setIsOpen(false)} href="/#projects" className="py-3 px-4 text-gray-300 hover:text-white border-b border-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500">Evidencia</Link>
        <Link onClick={() => setIsOpen(false)} href="/#about" className="py-3 px-4 text-gray-300 hover:text-white border-b border-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500">Sobre Mí</Link>
        <Link onClick={() => setIsOpen(false)} href="/#contact" className="mt-4 px-6 py-3 bg-white text-black font-semibold text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          Contacto
        </Link>
      </div>
    </header>
  );
}
