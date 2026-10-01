import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MermaidChart from "@/components/MermaidChart";

const TerminalBlock = ({ title, code, highlight = false }: { title: string; code: string; highlight?: boolean }) => (
  <div style={{
    border: "1px solid var(--border)",
    borderRadius: "10px",
    overflow: "hidden",
    background: "#080c14",
    margin: "1.75rem 0",
    fontFamily: "var(--font-mono)",
    fontSize: "var(--t-small)"
  }}>
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "0.6rem 1rem",
      borderBottom: "1px solid var(--border)",
      background: "rgba(15,23,42,.75)"
    }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444" }} />
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }} />
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
      <span style={{ marginLeft: "0.5rem", fontSize: "0.75rem", color: "var(--dim)", letterSpacing: "0.08em" }}>{title}</span>
    </div>
    <div style={{ padding: "1.25rem", overflowX: "auto" }}>
      <pre style={{ margin: 0, color: highlight ? "var(--accent-soft)" : "var(--muted)", lineHeight: 1.6 }}>
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

const CapabilityCard = ({ title, value, description, accentColor }: { title: string; value: string; description: string; accentColor: string }) => (
  <div style={{
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderTop: `3px solid ${accentColor}`,
    borderRadius: "12px",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }}>
    <div>
      <h4 style={{
        color: "var(--dim)",
        fontSize: "var(--t-tag)",
        fontFamily: "var(--font-mono)",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        margin: "0 0 0.5rem"
      }}>
        {title}
      </h4>
      <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", margin: "0 0 0.5rem" }}>
        {value}
      </p>
    </div>
    <p style={{ fontSize: "0.95rem", color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
      {description}
    </p>
  </div>
);

const PullQuote = ({ quote }: { quote: string }) => (
  <div style={{
    margin: "2.5rem 0",
    padding: "1rem 0 1rem 1.5rem",
    borderLeft: "4px solid var(--accent)",
    background: "rgba(59,130,246,0.06)",
    borderRadius: "0 8px 8px 0"
  }}>
    <p style={{
      fontSize: "1.15rem",
      fontFamily: "var(--font-display)",
      fontWeight: 500,
      color: "var(--text)",
      lineHeight: 1.5,
      margin: 0
    }}>
      {quote}
    </p>
  </div>
);

export default function ESP32BuildLog() {
  return (
    <main id="top" style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      <div className="dot-grid" />
      <div className="stage-glow" />
      <div className="vignette" />
      <div className="noise" />
      
      <Navbar />

      <article className="wrap" style={{ maxWidth: "860px", paddingTop: "8rem", paddingBottom: "6rem", position: "relative", zIndex: 10 }}>
        
        {/* HEADER */}
        <section style={{ marginBottom: "3rem" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--accent-soft)",
              textDecoration: "none",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--t-small)",
              marginBottom: "2rem"
            }}
          >
            <i className="fas fa-arrow-left" /> Volver al Portafolio
          </Link>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <span className="badge" style={{ margin: 0 }}>
              <i /> Build Log v1.0
            </span>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--t-tag)",
              color: "var(--accent-soft)",
              border: "1px solid var(--border-hover)",
              borderRadius: "100px",
              padding: "0.3rem 0.8rem",
              background: "rgba(59,130,246,0.1)",
              letterSpacing: "0.08em",
              textTransform: "uppercase"
            }}>
              Arquitectura Serverless &amp; Edge
            </span>
          </div>
          
          <h1 style={{
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: "1.5rem",
            color: "var(--text)"
          }}>
            <span style={{ display: "block", fontSize: "1rem", color: "var(--dim)", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Sistema de Telemetría RFID e Ingesta Serverless
            </span>
            De la Restricción Física a la <span className="tt-b">Arquitectura Resiliente</span>
          </h1>

          <PullQuote 
            quote="Los algoritmos de selección buscan coincidencias de texto. Los sistemas reales requieren principios de ingeniería." 
          />
        </section>

        {/* CONTENT */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
          
          {/* SECCIÓN: EL ORIGEN */}
          <section className="about-block">
            <h2 style={{ fontSize: "var(--t-h2)", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "1.25rem", color: "var(--text)" }}>
              <span className="tt-w">El Origen:</span> <span className="tt-b">Cuando el código no es suficiente</span>
            </h2>
            <p>
              Todo comenzó con un rechazo. Al postular a una posición técnica, mi perfil fue filtrado por un sistema ATS (Applicant Tracking System). El algoritmo no encontró las &quot;palabras clave&quot; exactas que buscaba, ignorando años de experiencia resolviendo problemas reales en la intersección del hardware y el software.
            </p>
            <p>
              En lugar de simplemente &quot;optimizar mi CV para el algoritmo&quot;, decidí construir algo que un filtro automático no pudiera ignorar: un sistema funcional, documentado y resiliente.
            </p>
            <p>
              <strong>
                Los algoritmos de selección buscan coincidencias de texto. Los sistemas reales requieren principios de ingeniería.
              </strong>
            </p>
          </section>

          {/* SECCIÓN: ESTRUCTURA DEL SISTEMA */}
          <section className="about-block">
            <h2 style={{ fontSize: "var(--t-h2)", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "1.25rem", color: "var(--text)" }}>
              <span className="tt-w">Estructura</span> <span className="tt-b">del Sistema</span>
            </h2>
            <p>
              En lugar de un diseño monolítico, organicé los componentes para que fueran independientes y tolerantes a fallos. A continuación, se muestra el flujo de datos desde la lectura del sensor en el Edge hasta la persistencia y visualización en la nube.
            </p>

            <MermaidChart
              caption="Diagrama de flujo de datos renderizado dinámicamente. Representa la arquitectura actual de la v1.0."
              chart={`graph LR
  subgraph Edge ["CAPA EDGE (Dispositivo Físico / Simulación)"]
    A[ESP32 + MFRC522] -->|HTTP POST /exec| B(Lógica Firmware: millis, validación local, reintentos)
  end

  subgraph Backend ["CAPA SERVERLESS (Middleware)"]
    B --> C{Guard Clause & Token Check}
    C -->|Válido| D[Google Apps Script: doPost]
    C -->|Inválido| E[Log de Error / Rechazo 401]
  end

  subgraph Data ["CAPA DE DATOS"]
    D -->|Upsert| F[(Google Sheets: Inventario en Tiempo Real)]
    D -->|Append| G[(Google Sheets: Histórico de Accesos/Eventos)]
  end

  subgraph Consumers ["CAPA DE CONSUMO Y ANÁLISIS"]
    F --> H[Dashboard Web HTML/JS]
    G --> I[Script Python Local ReportLab]
    I -->|Genera| J((Reporte PDF Técnico))
  end

  %% Estilos para coherencia visual con el portafolio
  classDef edge fill:#064E3B,stroke:#10B981,stroke-width:2px,color:#F8FAFC
  classDef backend fill:#312E81,stroke:#6366F1,stroke-width:2px,color:#F8FAFC
  classDef data fill:#1E293B,stroke:#475569,stroke-width:1px,color:#E2E8F0
  classDef consumer fill:#78350F,stroke:#F59E0B,stroke-width:2px,color:#F8FAFC

  class A,B edge;
  class C,D,E backend;
  class F,G data;
  class H,I,J consumer;`}
            />
          </section>

          {/* SECCIÓN: DESAFÍOS DE INTEGRACIÓN */}
          <section className="about-block">
            <h2 style={{ fontSize: "var(--t-h2)", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "1.25rem", color: "var(--text)" }}>
              <span className="tt-w">Desafíos de Integración</span> <span className="tt-b">y Soluciones Pragmáticas</span>
            </h2>

            <div style={{
              background: "rgba(16,185,129,0.08)",
              padding: "1.25rem",
              borderRadius: "8px",
              marginBottom: "2rem",
              borderLeft: "4px solid #10B981"
            }}>
              <p style={{ color: "var(--text)", margin: 0, fontSize: "0.95rem", lineHeight: 1.5 }}>
                <strong>Nota sobre este documento:</strong> Este Build Log es un documento vivo. A medida que el proyecto evoluciona hacia la v2.0 (MQTT + PostgreSQL), esta sección se extenderá para documentar los nuevos retos de migración, optimización de consultas y análisis de datos que surjan en el proceso.
              </p>
            </div>

            <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>
              Construir un sistema que conecta el mundo físico con la nube nunca es lineal. A continuación, detallo los obstáculos técnicos reales que surgieron durante el desarrollo de la v1.0 y las decisiones de ingeniería que tomé para resolverlos sin recurrir a la sobreingeniería:
            </p>

            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "1.15rem", color: "var(--text)", fontWeight: 600, marginBottom: "0.5rem" }}>
                1 · La ilusión de la conectividad constante
              </h3>
              <p style={{ color: "var(--dim)", margin: "0 0 0.5rem" }}>
                <strong>El Problema:</strong> En entornos reales, el WiFi falla. Un sistema que depende 100% de la nube para validar un acceso se vuelve inútil si hay una micro-caída de red.
              </p>
              <p style={{ color: "var(--text)", margin: 0 }}>
                <strong>La Solución:</strong> Implementé una validación local en el ESP32. El dispositivo mantiene un array en memoria de tarjetas autorizadas. Si el WiFi cae, el sistema sigue operando, registrando el evento localmente y reintentando la sincronización en segundo plano usando <code>millis()</code> para no bloquear el loop principal.
              </p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "1.15rem", color: "var(--text)", fontWeight: 600, marginBottom: "0.5rem" }}>
                2 · Latencia y límites en la capa Serverless
              </h3>
              <p style={{ color: "var(--dim)", margin: "0 0 0.5rem" }}>
                <strong>El Problema:</strong> Las herramientas gratuitas como Google Apps Script tienen límites de ejecución y una latencia inicial (cold start) que puede hacer que un POST del ESP32 falle o se agote el tiempo de espera.
              </p>
              <p style={{ color: "var(--text)", margin: "0 0 0.75rem" }}>
                <strong>La Solución:</strong> Forcé al cliente HTTP del ESP32 a seguir redirecciones estrictas (<code>HTTPC_STRICT_FOLLOW_REDIRECTS</code>), ya que Apps Script redirige las peticiones. Además, implementé un sistema de reintentos exponenciales simples en el firmware y un manejo robusto de errores (try/catch) en el backend para garantizar que ningún dato se pierda silenciosamente.
              </p>
              <TerminalBlock 
                title="src/firmware.cpp — Redirecciones y reintentos"
                code={`http.setFollowRedirects(HTTPC_STRICT_FOLLOW_REDIRECTS);
http.setTimeout(8000); // 8 segundos para absorber cold starts`} 
              />
            </div>

            <div>
              <h3 style={{ fontSize: "1.15rem", color: "var(--text)", fontWeight: 600, marginBottom: "0.5rem" }}>
                3 · De los datos crudos a la información útil
              </h3>
              <p style={{ color: "var(--dim)", margin: "0 0 0.5rem" }}>
                <strong>El Problema:</strong> Una hoja de cálculo con cientos de filas de logs es inútil para un diagnóstico rápido o una auditoría técnica.
              </p>
              <p style={{ color: "var(--text)", margin: 0 }}>
                <strong>La Solución:</strong> Desarrollé un script en Python (<code>generate_report.py</code> con ReportLab) que consume el endpoint de datos, procesa los eventos y genera un reporte PDF estructurado con métricas de uptime y estado de red, sin necesidad de exponer credenciales directas.
              </p>
            </div>
          </section>

          {/* SECCIÓN: CAPACIDADES VALIDADAS Y HOJA DE RUTA */}
          <section className="about-block">
            <h2 style={{ fontSize: "var(--t-h2)", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "1rem", color: "var(--text)" }}>
              <span className="tt-w">Capacidades Arquitectónicas Validadas</span> <span className="tt-b">y Hoja de Ruta</span>
            </h2>
            <p style={{ color: "var(--muted)", marginBottom: "2rem", lineHeight: 1.6 }}>
              Los entornos operativos reales no perdonan la sobreingeniería; requieren soluciones pragmáticas, tolerantes a fallos y fáciles de mantener. Este MVP cumple su objetivo actual, y los datos recopilados apuntan claramente hacia los objetivos de la siguiente iteración.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.25rem" }}>
              <CapabilityCard 
                title="Eficiencia Operativa" 
                value="$0.00 / mes" 
                description="Infraestructura 100% serverless y gratuita en su capa actual, eliminando costos hundidos." 
                accentColor="#10B981"
              />
              <CapabilityCard 
                title="Resiliencia de Red" 
                value="Validación Local" 
                description="El sistema opera, registra y encola eventos incluso sin conexión a internet activa." 
                accentColor="#6366F1"
              />
              <CapabilityCard 
                title="Hoja de Ruta (v2.0)" 
                value="MQTT + PostgreSQL" 
                description="Migración del protocolo HTTP a MQTT para reducir latencia y preparar el análisis de datos." 
                accentColor="#F59E0B"
              />
            </div>

            <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--t-small)", color: "var(--text)", margin: "0 0 4px" }}>
                  Autor: Guillermo Vásquez
                </p>
                <p style={{ fontSize: "var(--t-tag)", color: "var(--dim)", margin: 0 }}>
                  Ingeniero de Software
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <a
                  className="p-btn repo"
                  href="https://github.com/guillermoSoftwareEngineer/esp32-rfid-iot-telemetry"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github" />
                  GitHub
                </a>
                <a
                  className="p-btn demo"
                  href="https://guillermosoftwareengineer.github.io/esp32-rfid-iot-telemetry/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-play" />
                  Live Demo
                </a>
              </div>
            </div>
          </section>

        </div>
      </article>
      
      <Footer />
    </main>
  );
}

