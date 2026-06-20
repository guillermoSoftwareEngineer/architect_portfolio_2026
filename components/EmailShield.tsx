"use client";

import { useState } from "react";

export default function EmailShield() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // El email SOLO existe aquí — nunca en el HTML visible ni en atributos
    try {
      await navigator.clipboard.writeText("guillermovasbendev@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback para navegadores sin permiso de clipboard
      const el = document.createElement("textarea");
      el.value = "guillermovasbendev@gmail.com";
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={handleCopy}
        title={copied ? "¡Copiado!" : "Clic para copiar email"}
        aria-label="Email de contacto — clic para copiar al portapapeles"
        className="group cursor-pointer border-0 bg-transparent p-0 w-full"
      >
        {/* Email renderizado como bloque visual — no como texto seleccionable */}
        <div className="relative flex items-center justify-center gap-0 font-mono text-sm tracking-tight select-none pointer-events-none bg-white/5 border border-dashed border-white/15 group-hover:border-emerald-500/40 rounded-lg px-4 py-3 transition-all duration-200 group-hover:bg-emerald-500/5">
          <span className="text-[#E2E8F0]">guillermovasbendev</span>
          <span className="text-[#6366F1] mx-0.5 font-bold">@</span>
          <span className="text-[#E2E8F0]">gmail</span>
          <span className="text-[#94A3B8]">.</span>
          <span className="text-[#E2E8F0]">com</span>
          {/* Overlay decorativo que bloquea selección directa */}
          <div className="absolute inset-0 rounded-lg" aria-hidden="true" />
        </div>
        <span className="block text-[10px] text-gray-600 mt-1 group-hover:text-emerald-500/70 transition-colors">
          {copied ? "" : "↑ clic para copiar"}
        </span>
      </button>

      {copied && (
        <span className="text-xs text-emerald-400 font-medium animate-pulse">
          ¡Email copiado al portapapeles! ✓
        </span>
      )}
    </div>
  );
}
