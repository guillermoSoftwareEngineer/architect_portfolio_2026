"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface ImageLightboxProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

// Componente del overlay — se renderiza via Portal directo a document.body
function LightboxOverlay({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(8, 8, 8, 0.96)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        padding: "48px 24px 24px",
        animation: "lightbox-fade-in 0.2s ease-out",
      }}
      onClick={onClose}
    >
      {/* Botón de cerrar */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Cerrar imagen"
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          padding: "10px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "white",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s",
          lineHeight: 0,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239, 68, 68, 0.8)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Imagen */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "95vw",
          maxHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "lightbox-scale-in 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src.startsWith("http") ? src : (process.env.__NEXT_ROUTER_BASEPATH || "") + src}
          alt={alt}
          style={{
            maxWidth: "95vw",
            maxHeight: "90vh",
            objectFit: "contain",
            borderRadius: "8px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.7)",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "block",
          }}
        />
      </div>

      {/* Hint de teclado */}
      <p style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.3)", fontSize: "12px", fontFamily: "monospace", whiteSpace: "nowrap" }}>
        ESC o clic fuera para cerrar
      </p>

      <style>{`
        @keyframes lightbox-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lightbox-scale-in {
          from { opacity: 0; transform: scale(0.93); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>,
    document.body
  );
}

export default function ImageLightbox({ src, alt, width, height, className }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Necesario para evitar hydration mismatch con createPortal
  useEffect(() => { setMounted(true); }, []);

  const open = useCallback(() => {
    setIsOpen(true);
    // Compensamos el scrollbar para evitar layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    document.documentElement.style.overflow = "";
    document.documentElement.style.paddingRight = "";
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  return (
    <>
      {/* Imagen base clickeable */}
      <div
        className={`cursor-zoom-in relative overflow-hidden group ${className ?? ""}`}
        onClick={open}
        role="button"
        tabIndex={0}
        aria-label={`Expandir imagen: ${alt}`}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") open(); }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-200"
        />
        {/* Overlay de lupa */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <div className="bg-black/70 p-3 rounded-full backdrop-blur-sm ring-1 ring-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </div>
        </div>
      </div>

      {/* Portal — renderizado fuera del árbol, sin layout shift */}
      {mounted && isOpen && (
        <LightboxOverlay src={src} alt={alt} onClose={close} />
      )}
    </>
  );
}
