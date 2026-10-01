"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const LENS_SIZE = 220;   // diámetro en px
const LENS_ZOOM = 2.8;   // factor de ampliación real

interface MermaidChartProps {
  chart: string;
  caption?: string;
}

interface LensState {
  viewX: number;    // posición en viewport (para position:fixed)
  viewY: number;
  contentX: number; // posición dentro del contenido SVG (para offset interno)
  contentY: number;
}

export default function MermaidChart({ chart, caption }: MermaidChartProps) {
  const wrapperRef    = useRef<HTMLDivElement>(null); // contenedor del diagrama en modal
  const svgInnerRef   = useRef<HTMLDivElement>(null); // div que contiene el SVG visible

  const [svgContent, setSvgContent] = useState<string>("");
  const [error, setError]           = useState<string>("");
  const [loading, setLoading]       = useState(true);
  const [isOpen, setIsOpen]         = useState(false);
  const [hovered, setHovered]       = useState(false);
  const [showLens, setShowLens]     = useState(false);
  const [svgNaturalW, setSvgNaturalW] = useState(900); // ancho real del SVG renderizado
  const [lens, setLens] = useState<LensState>({ viewX: 0, viewY: 0, contentX: 0, contentY: 0 });

  /* ── Render Mermaid ── */
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          fontFamily: "var(--font-mono, monospace)",
          themeVariables: {
            darkMode: true,
            background: "#0F172A",
            primaryColor: "#312E81",
            primaryTextColor: "#F8FAFC",
            primaryBorderColor: "#6366F1",
            lineColor: "#64748B",
            secondaryColor: "#064E3B",
            tertiaryColor: "#1E293B",
          },
        });
        const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled) setSvgContent(svg);
      } catch (err) {
        console.error("Mermaid error:", err);
        if (!cancelled) setError("No se pudo renderizar el diagrama.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [chart]);

  /* ── Medir ancho real del SVG cuando el modal abre ── */
  useEffect(() => {
    if (!isOpen || !svgContent) return;
    const measure = () => {
      if (svgInnerRef.current) {
        const w = svgInnerRef.current.scrollWidth;
        if (w > 0) setSvgNaturalW(w);
      }
    };
    // Esperar un tick para que el DOM se pinte
    const t = setTimeout(measure, 80);
    return () => clearTimeout(t);
  }, [isOpen, svgContent]);

  /* ── ESC cierra ── */
  const closeModal = useCallback(() => {
    setIsOpen(false);
    setShowLens(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeModal]);

  /* ── Tracking del mouse ── */
  const PADDING_X = 28; // debe coincidir con el padding del wrapperRef
  const PADDING_Y = 32;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scrollL = e.currentTarget.scrollLeft;
    const scrollT = e.currentTarget.scrollTop;

    // Coordenada dentro del contenido SVG (independiente del scroll)
    const contentX = (e.clientX - rect.left) + scrollL - PADDING_X;
    const contentY = (e.clientY - rect.top)  + scrollT - PADDING_Y;

    setLens({ viewX: e.clientX, viewY: e.clientY, contentX, contentY });
    if (!showLens) setShowLens(true);
  };

  return (
    <>
      {/* ── PREVIEW CARD ── */}
      <div style={{ margin: "24px 0" }}>
        <div
          onClick={() => svgContent && setIsOpen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: "#0F172A",
            padding: "24px 20px",
            borderRadius: "12px",
            border: `1px solid ${hovered && svgContent ? "#6366F1" : "#1E293B"}`,
            overflowX: "auto",
            display: "flex",
            justifyContent: "center",
            minHeight: "120px",
            alignItems: "center",
            cursor: svgContent ? "zoom-in" : "default",
            position: "relative",
            transition: "border-color 0.2s ease",
          }}
        >
          {svgContent && (
            <div style={{
              position: "absolute", top: 10, right: 12,
              display: "flex", alignItems: "center", gap: 5,
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.4)",
              borderRadius: 100,
              padding: "3px 10px 3px 7px",
              fontSize: "0.7rem", color: "#a5b4fc",
              fontFamily: "monospace", letterSpacing: "0.05em",
              pointerEvents: "none",
              opacity: hovered ? 1 : 0.5,
              transition: "opacity 0.2s",
            }}>
              <LupaIcon size={12} />
              Clic para ampliar con lupa
            </div>
          )}
          {loading && <span style={{ color: "#64748B", fontFamily: "monospace", fontSize: "0.85rem" }}>Renderizando…</span>}
          {!loading && error && <span style={{ color: "#ef4444", fontFamily: "monospace", fontSize: "0.85rem" }}>{error}</span>}
          {!loading && !error && (
            <div style={{ width: "100%", pointerEvents: "none" }} dangerouslySetInnerHTML={{ __html: svgContent }} />
          )}
        </div>
        {caption && (
          <p style={{ fontSize: "0.82rem", color: "var(--dim)", textAlign: "center", fontStyle: "italic", margin: "8px 0 0" }}>
            {caption}
          </p>
        )}
      </div>

      {/* ── LIGHTBOX MODAL ── */}
      {isOpen && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(2,6,23,0.93)",
            backdropFilter: "blur(10px)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            animation: "mfade 0.18s ease",
          }}
        >
          {/* Top bar — solo botón cerrar, sin texto que solape el Navbar */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: "absolute", top: 0, right: 0,
              padding: "0.5rem 1rem",
            }}
          >
            <button onClick={closeModal} style={closeBtnStyle}>✕</button>
          </div>

          {/* Diagrama — scrollable, mide el SVG real */}
          <div
            ref={wrapperRef}
            onClick={e => e.stopPropagation()}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setShowLens(false)}
            style={{
              position: "relative",
              marginTop: "36px",
              width: "calc(100vw - 4rem)",
              maxWidth: "1100px",
              maxHeight: "calc(100vh - 110px)",
              overflowX: "auto",
              overflowY: "auto",
              background: "#0a1120",
              borderRadius: "14px",
              // Padding must match PADDING_X / PADDING_Y
              padding: `${PADDING_Y}px ${PADDING_X}px`,
              border: "1px solid #1E293B",
            }}
          >
            {/* SVG a tamaño completo — medimos su ancho real */}
            <div
              ref={svgInnerRef}
              style={{ width: "100%", minWidth: 600 }}
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />

            {/* Hint overlay — desaparece cuando el usuario mueve el mouse */}
            {!showLens && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                  animation: "mfade 0.3s ease",
                }}
              >
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.6rem",
                  background: "rgba(10,17,32,0.78)",
                  border: "1px solid rgba(99,102,241,0.35)",
                  borderRadius: "16px",
                  padding: "1.1rem 1.6rem",
                  backdropFilter: "blur(6px)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
                }}>
                  {/* Ícono animado */}
                  <div style={{ position: "relative", width: 40, height: 40 }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                      stroke="#6366F1" strokeWidth="1.8"
                      style={{ animation: "lupa-pulse 1.8s ease-in-out infinite" }}>
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8"  x2="11"    y2="14" />
                      <line x1="8"  y1="11" x2="14"    y2="11" />
                    </svg>
                  </div>
                  <p style={{
                    margin: 0,
                    color: "#c7d2fe",
                    fontFamily: "monospace",
                    fontSize: "0.82rem",
                    letterSpacing: "0.04em",
                    textAlign: "center",
                    lineHeight: 1.5,
                  }}>
                    Mueve el cursor sobre el diagrama
                    <br />
                    <span style={{ color: "#6366F1", fontWeight: 600 }}>para activar la lupa ×{LENS_ZOOM}</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Pie — hint ESC + metadata */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              display: "flex", flexDirection: "column", alignItems: "center", gap: "2px",
              padding: "0.5rem 1rem",
              borderTop: "1px solid rgba(99,102,241,0.15)",
              background: "rgba(15,23,42,0.9)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#94a3b8", fontFamily: "monospace", fontSize: "0.75rem" }}>
              <LupaIcon size={12} />
              Mueve el cursor sobre el diagrama para usar la lupa
              <span style={{ color: "#475569", margin: "0 4px" }}>·</span>
              <kbd style={kbdStyle}>ESC</kbd>
              <span style={{ color: "#475569" }}>cierra</span>
            </div>
            <span style={{ color: "#334155", fontFamily: "monospace", fontSize: "0.68rem" }}>
              Arquitectura ESP32-RFID v1.0 · Lupa ×{LENS_ZOOM}
            </span>
          </div>
        </div>
      )}

      {/* ── LUPA — position:fixed, fuera del overflow:hidden del modal ── */}
      {isOpen && showLens && (
        <div
          style={{
            position: "fixed",
            // Centro la lupa en el cursor real del viewport
            left: lens.viewX - LENS_SIZE / 2,
            top:  lens.viewY - LENS_SIZE / 2,
            width:  LENS_SIZE,
            height: LENS_SIZE,
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid rgba(99,102,241,0.9)",
            boxShadow: [
              "0 0 0 1px rgba(99,102,241,0.3)",
              "0 12px 40px rgba(0,0,0,0.75)",
              "inset 0 2px 8px rgba(0,0,0,0.5)",
            ].join(", "),
            pointerEvents: "none",
            zIndex: 10002,   // por encima del modal (9999)
            background: "#0a1120",
          }}
        >
          {/*
            MATEMÁTICA DE LA LUPA:
            - El cursor está en contentX, contentY dentro del SVG.
            - Queremos que ese punto quede centrado en la lupa → posición LENS_SIZE/2.
            - Con transformOrigin:"0 0" y scale(LENS_ZOOM):
                visual_x = left_inner + contentX * LENS_ZOOM  = LENS_SIZE/2
                → left_inner = LENS_SIZE/2 - contentX * LENS_ZOOM ✓

            CLAVE: forzamos `width: svgNaturalW` para que el SVG interno
            tenga EL MISMO ANCHO que el diagrama visible (no 220px), así
            scale(2.8) amplifica de verdad y no solo "rellena" la lupa.
          */}
          <div
            style={{
              position: "absolute",
              left: LENS_SIZE / 2 - lens.contentX * LENS_ZOOM,
              top:  LENS_SIZE / 2 - lens.contentY * LENS_ZOOM,
              width: svgNaturalW,          // ← ancho real medido del SVG
              transformOrigin: "0 0",
              transform: `scale(${LENS_ZOOM})`,
            }}
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />

          {/* Mira de referencia — solo líneas finas, sin punto sólido */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            {/* línea vertical */}
            <div style={{
              position: "absolute",
              left: "50%", top: "calc(50% - 7px)",
              width: 1, height: 14,
              background: "rgba(99,102,241,0.65)",
              transform: "translateX(-50%)",
            }} />
            {/* línea horizontal */}
            <div style={{
              position: "absolute",
              top: "50%", left: "calc(50% - 7px)",
              height: 1, width: 14,
              background: "rgba(99,102,241,0.65)",
              transform: "translateY(-50%)",
            }} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes mfade { from { opacity:0 } to { opacity:1 } }
        @keyframes lupa-pulse {
          0%, 100% { transform: scale(1);   opacity: 0.85; }
          50%       { transform: scale(1.18); opacity: 1;    }
        }
      `}</style>
    </>
  );
}

function LupaIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8"  x2="11"    y2="14" />
      <line x1="8"  y1="11" x2="14"    y2="11" />
    </svg>
  );
}

const kbdStyle: React.CSSProperties = {
  background: "rgba(99,102,241,0.15)",
  border: "1px solid rgba(99,102,241,0.3)",
  borderRadius: 4, padding: "0 5px",
  fontFamily: "monospace", fontSize: "0.72rem",
};

const closeBtnStyle: React.CSSProperties = {
  background: "rgba(248,113,113,0.1)",
  border: "1px solid rgba(248,113,113,0.3)",
  borderRadius: 6, color: "#f87171",
  cursor: "pointer", fontSize: "0.88rem",
  padding: "3px 10px", lineHeight: 1.5, flexShrink: 0,
};
