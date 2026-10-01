"use client";

import { useState, useRef, useEffect } from "react";

export default function Projects() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [boostActive, setBoostActive] = useState(false);
  const basePath = process.env.__NEXT_ROUTER_BASEPATH || "";

  // Inicializador y reanudador de ganancia de audio (Web Audio API)
  const ensureAudioBoost = () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (!audioCtxRef.current) {
        const ACtx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
        if (!ACtx) return;
        const ctx = new ACtx();
        const src = ctx.createMediaElementSource(video);
        const gain = ctx.createGain();
        gain.gain.value = 4.5; // Amplificación a +13dB para escuchar el audio con total claridad
        src.connect(gain);
        gain.connect(ctx.destination);
        audioCtxRef.current = ctx;
        gainNodeRef.current = gain;
        setBoostActive(true);
      }
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    } catch (err) {
      // Si ya está conectado o el navegador tiene restricciones
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => ensureAudioBoost();
    video.addEventListener("play", handlePlay);
    video.addEventListener("volumechange", handlePlay);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("volumechange", handlePlay);
    };
  }, []);

  return (
    <section className="solid" id="projects">
      <div className="wrap">
        <span className="sec-tag">
          <b>//</b> Portfolio
        </span>
        <h2 className="sec-title">
          <span className="tt-w">Evidencia de</span> <span className="tt-b">Capacidad</span>
        </h2>
        <p className="sec-lead">Casos de estudio y soluciones arquitectónicas reales.</p>
        
        <div className="proj-grid">
          <article className="p-card">
            <div className="p-head">
              <div>
                <span className="p-ver">v1.0 MVP EN PRODUCCIÓN</span>
                <h3>Sistema de Telemetría RFID e Ingesta Serverless</h3>
              </div>
              <div className="tags">
                <span>ESP32 (C++)</span>
                <span>Google Apps Script</span>
                <span>Google Sheets</span>
                <span>Python (ReportLab)</span>
                <span>Wokwi</span>
              </div>
            </div>
            
            <div className="p-body">
              <div className="p-media">
                <div className="media-box">
                  <div className="media-label">
                    <span className="media-dot" />
                    <i className="fas fa-play" style={{ fontSize: "0.55rem", color: "inherit" }} />
                    <span>DEMO EN VIVO</span>
                    {boostActive && (
                      <span style={{ marginLeft: "auto", fontSize: "0.6rem", color: "var(--accent-soft)", display: "inline-flex", alignItems: "center", gap: "3px" }}>
                        <i className="fas fa-volume-high" /> +350%
                      </span>
                    )}
                  </div>
                  <video
                    ref={videoRef}
                    onPlay={ensureAudioBoost}
                    onClick={ensureAudioBoost}
                    crossOrigin="anonymous"
                    controls
                    preload="metadata"
                    poster={`${basePath}/images/system-architecture-es.png`}
                  >
                    <source
                      src={`${basePath}/videos/esp32-rfid-iot-telemetry-demo.mp4`}
                      type="video/mp4"
                    />
                    Tu navegador no soporta video HTML5.
                  </video>
                </div>
                
                <div className="media-box">
                  <div className="media-label">
                    <span className="media-dot blue" />
                    <i className="fas fa-table-cells-large" style={{ fontSize: "0.65rem", color: "inherit" }} />
                    <span>ARQUITECTURA DEL SISTEMA</span>
                    <span className="zoom-hint">— clic para ampliar</span>
                  </div>
                  <img
                    id="archDiagramImg"
                    src={`${basePath}/images/system-architecture-es.png`}
                    alt="Diagrama de arquitectura del sistema ESP32-RFID"
                    loading="lazy"
                    className="zoomable-img"
                    onClick={() => setLightboxOpen(true)}
                  />
                </div>
              </div>
              
              <h4>1 · El Desafío</h4>
              <p>
                Crear un sistema de control de acceso y diagnóstico remoto distribuido. El ESP32 actúa simulando el comportamiento de una máquina industrial o su tarjeta de red, manejando latencias impredecibles y caídas de conexión, sin incurrir en costos fijos de infraestructura VPS.
              </p>
              
              <h4>2 · El Enfoque</h4>
              <p>
                Diseñé una arquitectura orientada a micro-eventos. Los nodos ESP32 actúan asincrónicamente en el Edge (optimizando consumo y validando localmente), mientras una capa serverless actúa como middleware, aplicando validaciones estrictas y guard clauses de seguridad antes de persistir la información.
              </p>
              
              <h4>3 · El Resultado Real</h4>
              <p>
                Un MVP funcional y elástico capaz de orquestar Control de Acceso, Heartbeats y Diagnóstico Remoto a costo operativo cero.
              </p>

              <h4>4 · Roadmap de Escalado (v2.0 en desarrollo)</h4>
              <p>
                He identificado cuellos de botella en la latencia de las herramientas gratuitas. El roadmap técnico para la próxima versión incluye la migración a <strong>MQTT</strong> para comunicación en tiempo real y <strong>PostgreSQL</strong> para un manejo robusto de datos, sentando las bases para integrar análisis y toma de decisiones automatizada.
              </p>
              
              <div className="p-links">
                <a
                  className="p-btn demo"
                  href="https://guillermosoftwareengineer.github.io/esp32-rfid-iot-telemetry/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-play" />
                  Ver Live Demo
                </a>
                <a
                  className="p-btn repo"
                  href="https://github.com/guillermoSoftwareEngineer/esp32-rfid-iot-telemetry"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github" />
                  Repositorio GitHub
                </a>
                <a
                  className="p-btn sheets"
                  href="https://docs.google.com/spreadsheets/d/190eHDp5CDBticzez-2B9_Y_5XoW9VuMMkePLNthKp9c/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-table" />
                  Google Sheets en Vivo
                </a>
                <a
                  className="p-btn logs"
                  href={`${basePath}/build-logs/esp32-rfid`}
                >
                  <i className="fas fa-sitemap" />
                  Build Logs &amp; Arquitectura
                </a>
              </div>
            </div>
          </article>

          <article className="p-card">
            <div className="p-head">
              <div>
                <span className="p-ver pending">PRÓXIMAMENTE</span>
                <h3>Prácticas de Optimización Serverless Backend</h3>
              </div>
              <div className="tags">
                <span>AWS / GCP</span>
                <span>Node.js</span>
              </div>
            </div>
          </article>

          <article className="p-card">
            <div className="p-head">
              <div>
                <span className="p-ver pending">EN DESARROLLO</span>
                <h3>Automatización de Flujos DevOps / CI-CD</h3>
              </div>
              <div className="tags">
                <span>GitHub Actions</span>
                <span>Docker</span>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Lightbox */}
      <div
        className={`lightbox ${lightboxOpen ? "open" : ""}`}
        id="lightbox"
        onClick={() => setLightboxOpen(false)}
      >
        <button
          className="lightbox-close"
          id="lightboxClose"
          aria-label="Cerrar"
          onClick={() => setLightboxOpen(false)}
        >
          <i className="fas fa-xmark" />
        </button>
        <img
          id="lightboxImg"
          src={`${basePath}/images/system-architecture-es.png`}
          alt="Diagrama de arquitectura ampliado"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </section>
  );
}
