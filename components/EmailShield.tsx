"use client";

import { useState } from "react";

export default function EmailShield() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("guillermovasbendev@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
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
    <div className="flex flex-col items-center gap-2 max-w-xs mx-auto mt-6">
      <button
        onClick={handleCopy}
        title={copied ? "¡Copiado!" : "Clic para copiar email"}
        aria-label="Email de contacto — clic para copiar al portapapeles"
        className="group cursor-pointer border-0 bg-transparent p-0 w-full"
      >
        <div className="relative flex items-center justify-center gap-0 font-mono text-sm tracking-tight select-none pointer-events-none bg-white/5 border border-dashed border-white/15 group-hover:border-blue-500/40 rounded-lg px-4 py-3 transition-all duration-200 group-hover:bg-blue-500/5">
          <span className="text-[#E9EEF7]">guillermovasbendev</span>
          <span className="text-blue-500 mx-0.5 font-bold">@</span>
          <span className="text-[#E9EEF7]">gmail</span>
          <span className="text-[#96A6BC]">.</span>
          <span className="text-[#E9EEF7]">com</span>
          <div className="absolute inset-0 rounded-lg" aria-hidden="true" />
        </div>
        <span className="block text-[10px] text-gray-500 mt-1.5 group-hover:text-blue-400/80 transition-colors">
          {copied ? "" : "↑ clic para copiar"}
        </span>
      </button>

      {copied && (
        <span className="text-xs text-blue-400 font-medium animate-pulse mt-1">
          ¡Email copiado al portapapeles! ✓
        </span>
      )}
    </div>
  );
}
