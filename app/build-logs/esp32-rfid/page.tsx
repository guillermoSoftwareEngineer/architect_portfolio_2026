import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const basePath = process.env.__NEXT_ROUTER_BASEPATH || "";

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

const MetricCard = ({ title, before, after }: { title: string; before: string; after: string }) => (
  <div style={{
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "border-color .3s"
  }}>
    <h4 style={{
      color: "var(--dim)",
      fontSize: "var(--t-tag)",
      fontFamily: "var(--font-mono)",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      marginBottom: "1.25rem"
    }}>
      {title}
    </h4>
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div>
        <p style={{ fontSize: "0.6875rem", color: "var(--dim)", fontFamily: "var(--font-mono)", textTransform: "uppercase", margin: "0 0 2px" }}>Sin Sistema</p>
        <p style={{ color: "var(--dim)", textDecoration: "line-through", fontSize: "var(--t-small)", margin: 0 }}>{before}</p>
      </div>
      <div style={{ height: "1px", width: "100%", background: "var(--border)" }} />
      <div>
        <p style={{ fontSize: "0.6875rem", color: "var(--accent-soft)", fontFamily: "var(--font-mono)", textTransform: "uppercase", margin: "0 0 2px" }}>Con Sistema</p>
        <p style={{ color: "var(--text)", fontWeight: 600, fontSize: "1.125rem", margin: 0 }}>{after}</p>
      </div>
    </div>
  </div>
);

const PullQuote = ({ quote }: { quote: string }) => (
  <div style={{
    margin: "2.5rem 0",
    padding: "1rem 0 1rem 1.5rem",
    borderLeft: "3px solid var(--accent)",
    background: "rgba(59,130,246,0.04)"
  }}>
    <p style={{
      fontSize: "1.2rem",
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      color: "var(--text)",
      lineHeight: 1.4,
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
              Arquitectura Serverless
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
              De la Protoboard a la Nube
            </span>
            Cómo Arquitecté un Sistema de <span className="tt-b">Telemetría a Costo Cero</span>
          </h1>

          <PullQuote 
            quote='"No construí un reloj de asistencia. Construí el sistema que permite operar y monitorear 100 relojes eficientemente sin pagar un centavo en servidores."' 
          />
        </section>

        {/* CONTENT */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          
          <section className="about-block">
            <h2 style={{ fontSize: "var(--t-h2)", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "1.25rem", color: "var(--text)" }}>
              <span className="tt-w">Prólogo:</span> <span className="tt-b">El rechazo que lo inició todo</span>
            </h2>
            <p>Este proyecto no nació de un tutorial. Nació de un ATS.</p>
            <p>
              Apliqué a una empresa que buscaba un perfil técnico en soporte y operaciones IoT. El sistema automatizado de selección rechazó mi CV antes de que un humano lo viera. No porque no tuviera las capacidades, sino porque no tenía evidencia tangible de ellas.
            </p>
            <p>
              Esa noche tomé una decisión: dejar de pedir permiso para demostrar lo que sé y simplemente construirlo.
            </p>
            <p>
              La pregunta que me hice fue directa: ¿qué necesitaría ver ese equipo técnico para que ningún ATS pudiera ignorarme?
            </p>
            <p><strong>La respuesta fue este sistema.</strong></p>
          </section>

          <section className="about-block">
            <h2 style={{ fontSize: "var(--t-h2)", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "1.25rem", color: "var(--text)" }}>
              <span className="tt-w">El Problema</span> <span className="tt-b">Real</span>
            </h2>
            <p>
              Las empresas que despliegan hardware distribuido, como terminales de control de acceso, enfrentan un problema silencioso pero costoso: el soporte operativo reactivo.
            </p>
            <p>
              Cuando un cliente llama para decir <em>"la máquina no lee la tarjeta"</em>, el equipo técnico normalmente tiene que agendar una visita física. Tiempo perdido. Costo real. Escala imposible.
            </p>
            <p>
              Además, alojar servidores dedicados para recibir miles de pings diarios genera costos fijos de VPS y bases de datos que muchas empresas medianas no justifican en etapas tempranas.
            </p>
            <p>
              El desafío era concreto: ¿cómo lograr telemetría en tiempo real, diagnósticos remotos y registro de accesos, con latencia baja, usando herramientas 100% gratuitas y serverless?
            </p>
            <p>
              <strong>La respuesta: el Google Workspace que ya usan esas empresas puede ser reconfigurado como infraestructura IoT.</strong>
            </p>
          </section>

          <section className="about-block">
            <h2 style={{ fontSize: "var(--t-h2)", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "1.25rem", color: "var(--text)" }}>
              <span className="tt-w">La Solución:</span> <span className="tt-b">Arquitectura Híbrida y Serverless</span>
            </h2>
            
            <div style={{
              border: "1px solid var(--border)",
              borderRadius: "10px",
              overflow: "hidden",
              background: "#000",
              margin: "1.5rem 0"
            }}>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                color: "var(--dim)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.6rem 0.8rem",
                borderBottom: "1px solid var(--border)",
                background: "rgba(15,23,42,.6)"
              }}>
                <i className="fas fa-sitemap" /> system-architecture-es.png
              </div>
              <img
                src={`${basePath}/images/system-architecture-es.png`}
                alt="Arquitectura Híbrida y Serverless"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>

            <TerminalBlock 
              title="Diagrama de Flujo Lógico"
              highlight={true}
              code={`[ESP32 en Wokwi]  →  HTTP POST  →  [Google Apps Script]  →  [Google Sheets]
      |                                                            |
  RFID RC522                                         [Dashboard — GitHub Pages]
  LCD 16x2 I2C                                       Heartbeat cada 30s — Live
  LEDs + Buzzer
  WiFi`} 
            />

            <p>
              El ecosistema de Google Workspace actúa como un backend elástico y potente. Google Apps Script funciona como nuestra API REST, recibiendo eventos vía <code>doPost</code> y respondiendo consultas vía <code>doGet</code>, escalando automáticamente de cero a miles de peticiones sin gestionar infraestructura.
            </p>
            <p>
              Google Sheets sirve como base de datos tabular, accesible, auditable y exportable. Un dashboard estático en GitHub Pages consume esa data mediante fetch al endpoint público, logrando un panel de monitoreo en vivo con heartbeats cada 30 segundos.
            </p>
            <p>
              <strong>El firmware del ESP32 está escrito en C++ con una mentalidad de tiempo real: en ningún momento se usa <code>delay()</code> para gestionar tiempos.</strong>
            </p>
          </section>

          <section className="about-block">
            <h2 style={{ fontSize: "var(--t-h2)", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "1.5rem", color: "var(--text)" }}>
              <span className="tt-w">Desafíos de</span> <span className="tt-b">Integración</span>
            </h2>

            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "1.1rem", color: "var(--text)", fontWeight: 600, marginBottom: "0.75rem" }}>
                1 · Bloqueo por pérdida de conexión WiFi
              </h3>
              <p>
                Si el dispositivo perdía internet, el código original se quedaba atascado intentando enviar el payload POST, congelando la lectura de tarjetas durante el timeout del cliente HTTP (hasta 15 segundos).
              </p>
              <p>
                <strong>Solución:</strong> Implementé una arquitectura híbrida con caché local. Las Guard Clauses detectan la ausencia de WiFi antes de intentar cualquier operación de red. El hardware sigue validando accesos contra su caché local en modo offline.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: "1.1rem", color: "var(--text)", fontWeight: 600, marginBottom: "0.75rem" }}>
                2 · CORS y redirecciones 302 de Google
              </h3>
              <p>
                Google Apps Script responde a los POST con una redirección temporal HTTP 302 hacia una URL diferente. Por defecto, HTTPClient de ESP32 no sigue redirecciones y reporta error.
              </p>
              <TerminalBlock 
                title="src/firmware.cpp"
                code={`http.setFollowRedirects(HTTPC_STRICT_FOLLOW_REDIRECTS);`} 
              />
              <p>
                Esta directiva fuerza al cliente HTTP del ESP32 a seguir la redirección sin perder el payload JSON en el camino.
              </p>
            </div>
          </section>

          <section className="about-block">
            <h2 style={{ fontSize: "var(--t-h2)", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "1.5rem", color: "var(--text)" }}>
              <span className="tt-w">Decisiones Técnicas</span> <span className="tt-b">que Importan</span>
            </h2>

            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "1.1rem", color: "var(--text)", fontWeight: 600, marginBottom: "0.75rem" }}>
                Por qué millis() y no delay()
              </h3>
              <TerminalBlock 
                title="src/firmware.cpp"
                code={`if (millis() - ultimoHeartbeat >= INTERVALO_HEARTBEAT) {
    enviarHeartbeat();
    ultimoHeartbeat = millis();
}`} 
              />
              <p>
                <code>delay()</code> bloquea por completo la CPU. Con <code>millis()</code>, el loop principal corre continuamente validando RFID, actualizando la pantalla y atendiendo diagnósticos sin congelamientos.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: "1.1rem", color: "var(--text)", fontWeight: 600, marginBottom: "0.75rem" }}>
                Entropía física para aleatoriedad de IDs
              </h3>
              <TerminalBlock 
                title="src/firmware.cpp"
                code={`randomSeed(analogRead(0)); // Pin flotante = entropía electromagnética del entorno
String generarEventID() {
    return String(random(100000, 999999)) + "-" + String(millis());
}`} 
              />
              <p>
                Leer el ruido electromagnético ambiental de un pin flotante garantiza semillas verdaderamente aleatorias e IDs únicos entre reinicios.
              </p>
            </div>
          </section>

          <section className="solid" style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
            <h2 style={{ fontSize: "var(--t-h2)", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "1rem", color: "var(--text)" }}>
              <span className="tt-w">Métricas de</span> <span className="tt-b">Impacto en el Negocio</span>
            </h2>
            <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>
              Cifras reales derivadas de la arquitectura serverless implementada:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
              <MetricCard 
                title="Tiempo de Configuración" 
                before="12 minutos (manual)" 
                after="4 minutos (guiado)" 
              />
              <MetricCard 
                title="Detección de Falla de Red" 
                before="Depende de llamada del cliente" 
                after="< 60 seg (Automático)" 
              />
              <MetricCard 
                title="Diagnóstico Remoto" 
                before="Visita física obligatoria" 
                after="Dashboard y logs en vivo" 
              />
              <MetricCard 
                title="Costo de Infraestructura" 
                before="VPS + DB = $15-40/mes" 
                after="$0 (100% Serverless)" 
              />
            </div>
          </section>

          <section className="about-block" style={{ marginTop: "1rem" }}>
            <h2 style={{ fontSize: "var(--t-h2)", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "1.25rem", color: "var(--text)" }}>
              <span className="tt-w">Reflexión</span> <span className="tt-b">Final</span>
            </h2>
            <p>
              No documenté este proyecto para mostrar tecnología por moda. Lo documenté para demostrar una forma de pensar: que los problemas operativos reales tienen soluciones de arquitectura elegantes, que las limitaciones de la V1 son tan importantes como sus capacidades, y que la diferencia entre un proyecto casual y un sistema de producción está en las decisiones que se toman cuando algo falla.
            </p>

            <PullQuote 
              quote="El ATS que me rechazó buscaba keywords. Este sistema habla de principios." 
            />

            <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--t-small)", color: "var(--text)", margin: "0 0 4px" }}>
                  Escrito por: Guillermo Vásquez
                </p>
                <p style={{ fontSize: "var(--t-tag)", color: "var(--dim)", margin: 0 }}>
                  Ingeniero de Sistemas Aplicados
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
