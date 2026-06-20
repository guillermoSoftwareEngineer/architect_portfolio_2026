import Image from "next/image";
import Link from "next/link";
import ImageLightbox from "@/components/ImageLightbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TerminalBlock = ({ title, code, highlight = false }: { title: string, code: string, highlight?: boolean }) => (
  <div className="border border-white/10 rounded-xl overflow-hidden bg-black my-8">
    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
      <div className="w-3 h-3 rounded-full bg-red-500"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div className="w-3 h-3 rounded-full bg-green-500"></div>
      <span className="ml-2 text-xs font-mono text-gray-500">{title}</span>
    </div>
    <div className="p-6 overflow-x-auto">
      <pre className={`text-sm font-mono leading-relaxed ${highlight ? "text-blue-300" : "text-gray-300"}`}>
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

const MetricCard = ({ title, before, after }: { title: string, before: string, after: string }) => (
  <div className="glass-panel p-6 border-t-2 border-t-transparent hover:border-t-blue-500 group flex flex-col justify-between" style={{ background: '#121313' }}>
    <h4 className="text-gray-400 text-xs font-semibold mb-6 uppercase tracking-widest">{title}</h4>
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-[10px] text-gray-500 mb-1 font-mono uppercase">Sin Sistema</p>
        <p className="text-gray-400 line-through decoration-red-500/30 text-sm">{before}</p>
      </div>
      <div className="h-px w-full bg-white/5"></div>
      <div>
        <p className="text-[10px] text-blue-400/80 mb-1 font-mono uppercase">Con Sistema</p>
        <p className="text-white font-semibold text-lg">{after}</p>
      </div>
    </div>
  </div>
);

const PullQuote = ({ quote }: { quote: string }) => (
  <div className="my-14 py-8 border-l-2 border-blue-500 pl-8">
    <p className="text-xl md:text-2xl font-bold text-white leading-tight">
      {quote}
    </p>
  </div>
);

export default function ESP32BuildLog() {
  return (
    <main className="min-h-screen bg-[#080808] text-gray-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <div 
        className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}
      />
      
      <Navbar />

      <article className="pt-32 pb-24 px-6 max-w-3xl mx-auto relative z-10">
        
        {/* HEADER */}
        <section id="build-log-header" className="mb-16 text-center md:text-left">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Volver al Portafolio
          </Link>

          <div className="flex flex-wrap gap-3 mb-6 md:justify-start justify-center">
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-mono text-gray-300">Build Log v1.0</span>
            <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] uppercase tracking-widest font-mono text-blue-400">Arquitectura Serverless</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
            <span className="block text-sm md:text-base font-medium text-gray-500 mb-4 tracking-widest uppercase">De la Protoboard a la Nube</span>
            Cómo Arquitecté un Sistema <br className="hidden md:block"/>
            de <span className="gradient-text">Telemetría a Costo Cero</span>
          </h1>

          <PullQuote 
            quote='"No construí un reloj de asistencia. Construí el sistema que permite operar y monitorear 100 relojes eficientemente sin pagar un centavo en servidores."' 
          />
        </section>

        {/* CONTENT */}
        <div className="space-y-0 text-[1.05rem] md:text-lg leading-relaxed text-gray-300">
          
          <section id="prologo" className="py-12 border-t border-white/5">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Prólogo: El rechazo que lo inició todo</h2>
            <p className="mb-6 text-white font-medium">Este proyecto no nació de un tutorial. Nació de un ATS.</p>
            <p className="mb-6">
              Apliqué a una empresa que buscaba un perfil técnico en soporte y operaciones IoT. El sistema automatizado de selección rechazó mi CV antes de que un humano lo viera. No porque no tuviera las capacidades, sino porque no tenía evidencia tangible de ellas.
            </p>
            <p className="mb-6">
              Esa noche tomé una decisión: dejar de pedir permiso para demostrar lo que sé y simplemente construirlo.
            </p>
            <p className="mb-6">
              La pregunta que me hice fue directa: ¿qué necesitaría ver ese equipo técnico para que ningún ATS pudiera ignorarme?
            </p>
            <p>La respuesta fue este sistema.</p>
          </section>

          <section id="problema" className="py-12 border-t border-white/5">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">El Problema Real</h2>
            <p className="mb-6">
              Las empresas que despliegan hardware distribuido, como terminales de control de acceso, enfrentan un problema silencioso pero costoso: el soporte operativo reactivo.
            </p>
            <p className="mb-6">
              Cuando un cliente llama para decir &quot;la máquina no lee la tarjeta&quot;, el equipo técnico normalmente tiene que agendar una visita física. Tiempo perdido. Costo real. Escala imposible.
            </p>
            <p className="mb-6">
              Además, alojar servidores dedicados para recibir miles de pings diarios genera costos fijos de VPS y bases de datos que muchas empresas medianas no justifican en etapas tempranas.
            </p>
            <p className="mb-6">
              El desafío era concreto: ¿cómo lograr telemetría en tiempo real, diagnósticos remotos y registro de accesos, con latencia baja, usando herramientas 100% gratuitas y serverless?
            </p>
            <p>
              La respuesta no estaba en buscar la tecnología más costosa. Estaba en entender que el Google Workspace que ya usan esas empresas puede ser reconfigurado como infraestructura IoT.
            </p>
          </section>

          <section id="solucion" className="py-12 border-t border-white/5">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">La Solución: Arquitectura Híbrida y Serverless</h2>
            
            <div className="border border-white/10 rounded-xl overflow-hidden bg-black mb-8">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs font-mono text-gray-500">architecture_diagram.png</span>
              </div>
              <div className="p-0 bg-black/80">
                <ImageLightbox src="/images/system-architecture-es.png" alt="Arquitectura Híbrida y Serverless" width={800} height={450} />
              </div>
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

            <p className="mb-6 mt-6">
              El ecosistema de Google Workspace actúa como un backend improvisado pero extremadamente potente. Google Apps Script funciona como nuestra API REST, recibiendo eventos vía <code className="text-blue-300 bg-blue-900/20 px-2 py-0.5 rounded text-sm font-mono border border-blue-500/20">doPost</code> y respondiendo consultas vía <code className="text-blue-300 bg-blue-900/20 px-2 py-0.5 rounded text-sm font-mono border border-blue-500/20">doGet</code>, escalando automáticamente de cero a miles de peticiones sin gestionar infraestructura. 
            </p>
            <p className="mb-6">
              Google Sheets sirve como base de datos tabular, accesible, auditable y exportable. Un dashboard estático en GitHub Pages consume esa data mediante fetch al endpoint público, logrando un panel de monitoreo en vivo con heartbeats cada 30 segundos.
            </p>
            <p>
              El firmware del ESP32 está escrito en C++ con una mentalidad de tiempo real: en ningún momento se usa <code className="text-blue-300 bg-blue-900/20 px-2 py-0.5 rounded text-sm font-mono border border-blue-500/20">delay()</code> para gestionar tiempos. Ese detalle, que parece menor, es en realidad la columna vertebral del sistema.
            </p>
          </section>

          <section id="desafios" className="py-12 border-t border-white/5">
            <h2 className="text-2xl md:text-3xl font-bold mb-10">Desafíos de Integración</h2>

            <div className="mb-12">
              <h3 className="text-lg text-white font-semibold mb-3 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-blue-500 block" />
                Bloqueo por pérdida de conexión WiFi
              </h3>
              <p className="mb-6">
                Si el dispositivo perdía internet, el código original se quedaba atascado intentando enviar el payload POST, congelando la lectura de tarjetas durante el tiempo de timeout del cliente HTTP, hasta 15 segundos por intento.
              </p>
              <p className="mb-6">
                La solución fue implementar una arquitectura híbrida con caché local. Las tarjetas autorizadas se mantienen en memoria (y en EEPROM, próximamente). Las Guard Clauses detectan la ausencia de WiFi antes de intentar cualquier operación de red. El hardware sigue validando accesos contra su caché local en modo offline. Cuando la conexión se restaura, los eventos pendientes se envían en orden.
              </p>
              <p>
                La clave conceptual aquí es que un dispositivo IoT no puede depender de la nube para su función principal. La nube es para telemetría y registro, no para la operación core.
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-lg text-white font-semibold mb-3 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-blue-500 block" />
                CORS y redirecciones 302 de Google
              </h3>
              <p className="mb-6">
                Google Apps Script, por seguridad, responde a los POST con una redirección temporal HTTP 302 hacia una URL diferente. El HTTPClient del ESP32, por defecto, no sigue redirecciones y simplemente reporta el 302 como un error, descartando el payload.
              </p>
              <p className="mb-6">
                La solución fue una sola línea de configuración que la mayoría de tutoriales omite:
              </p>
              <TerminalBlock 
                title="src/firmware.cpp"
                code={`http.setFollowRedirects(HTTPC_STRICT_FOLLOW_REDIRECTS);`} 
              />
              <p className="mb-6">
                Esta directiva fuerza al cliente HTTP del ESP32 a seguir la redirección de Google sin perder el JSON en el camino. Sin esto, el sistema funciona en el simulador pero falla silenciosamente con el backend real.
              </p>
              <p>
                El aprendizaje: los problemas de integración entre capas rara vez aparecen en tutoriales. Aparecen cuando usas herramientas reales juntas.
              </p>
            </div>
          </section>

          <section id="decisiones-tecnicas" className="py-12 border-t border-white/5">
            <h2 className="text-2xl md:text-3xl font-bold mb-10">Decisiones Técnicas que Importan</h2>

            <div className="mb-12">
              <h3 className="text-lg text-white font-semibold mb-3 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-blue-500 block" />
                Por qué millis() y no delay()
              </h3>
              <p className="mb-6">
                Esta es probablemente la decisión más importante del firmware y la que más candidatos omiten explicar.
              </p>
              <p className="mb-6">
                <code className="text-blue-300 bg-blue-900/20 px-2 py-0.5 rounded text-sm font-mono border border-blue-500/20">delay(30000)</code> detiene todo el programa durante 30 segundos. La tarjeta RFID no se lee. El LCD no responde. El botón de diagnóstico no funciona. El dispositivo está, en la práctica, muerto durante ese tiempo.
              </p>
              <p className="mb-6">
                La alternativa es un patrón basado en tiempo transcurrido:
              </p>
              <TerminalBlock 
                title="src/firmware.cpp"
                code={`if (millis() - ultimoHeartbeat >= INTERVALO_HEARTBEAT) {
    enviarHeartbeat();
    ultimoHeartbeat = millis();
}`} 
              />
              <p>
                Este patrón permite que el loop principal corra continuamente. El heartbeat se dispara cuando corresponde, pero entre disparo y disparo el sistema sigue leyendo tarjetas, actualizando el LCD y respondiendo al botón de diagnóstico. Es el mismo principio detrás de los sistemas de tiempo real embebido.
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-lg text-white font-semibold mb-3 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-blue-500 block" />
                Guard Clauses bajo condiciones de red inestable
              </h3>
              <p className="mb-6">
                Una Guard Clause es una técnica para salir temprano de una función si no se cumplen las condiciones básicas para ejecutarla. En el contexto IoT, esto es crítico:
              </p>
              <TerminalBlock 
                title="src/firmware.cpp"
                code={`void enviarDatos(String payload) {
    if (WiFi.status() != WL_CONNECTED) return;
    // Solo llega aquí si hay conexión
    // ... lógica de envío HTTP
}`} 
              />
              <p className="mb-6">
                Sin esta guarda, el código intenta enviar datos, falla, espera el timeout del HTTPClient, y durante ese tiempo el sistema está bloqueado. Con la guarda, la función sale en microsegundos y el hardware sigue operando en modo offline.
              </p>
              <p>
                El sistema tiene tres niveles de robustez que trabajan juntos: <code className="text-blue-300 bg-blue-900/20 px-2 py-0.5 rounded text-sm font-mono border border-blue-500/20">manejarSinWiFi()</code> intenta reconectar con lógica controlada, la guard clause evita errores en cadena si la reconexión no ocurre, y el heartbeat periódico garantiza que cualquier falla sea detectada desde el dashboard en menos de 60 segundos. Eso ya es arquitectura de dispositivo real.
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-lg text-white font-semibold mb-3 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-blue-500 block" />
                Aleatoriedad de ID desde el hardware
              </h3>
              <p className="mb-6">
                En programación, ninguna función genera aleatoriedad verdadera, solo pseudoaleatoriedad basada en semillas predecibles. En un sistema donde cada evento debe tener un ID único para no mezclarse en el registro, esto es un problema real.
              </p>
              <p className="mb-6">
                La solución viene de la electrónica: si dejas un pin analógico del ESP32 desconectado, ese pin estará recibiendo interferencia electromagnética del entorno, señal eléctrica genuinamente aleatoria. Leer ese pin con <code className="text-blue-300 bg-blue-900/20 px-2 py-0.5 rounded text-sm font-mono border border-blue-500/20">analogRead()</code> y usarlo como semilla del generador aleatorio garantiza IDs únicos entre reinicios:
              </p>
              <TerminalBlock 
                title="src/firmware.cpp"
                code={`randomSeed(analogRead(0)); // Pin flotante = entropía real del entorno
String generarEventID() {
    return String(random(100000, 999999)) + "-" + String(millis());
}`} 
              />
              <p>
                Este detalle es el tipo de pensamiento de sistemas que diferencia a un ingeniero con formación técnica dual de alguien que solo conoce el software.
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-lg text-white font-semibold mb-3 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-blue-500 block" />
                La limitación honesta de la V1: tarjetas autorizadas
              </h3>
              <p className="mb-6">
                La versión 1 almacena las tarjetas autorizadas en un arreglo estático en el firmware:
              </p>
              <TerminalBlock 
                title="src/firmware.cpp"
                code={`String tarjetasAutorizadas[] = {
    "A1B2C3D4",
    "E5F6G7H8",
    "12345678"
};`} 
              />
              <p className="mb-6">
                Esto funciona para el MVP, pero tiene una implicación importante: agregar o quitar una tarjeta requiere recompilar y re-flashear el firmware. En una flota de 100 dispositivos, eso es operativamente inviable.
              </p>
              <p className="mb-6">
                La arquitectura correcta para resolver esto evoluciona de forma natural. En esta versión la lista vive estática en el código. La siguiente versión la migra a EEPROM local, eliminando la necesidad de recompilar aunque sin sincronización remota todavía. Más adelante, el backend remoto permite gestión central pero con dependencia de conectividad. El salto final es MQTT con tópicos de revocación, donde el servidor puede actualizar tarjetas en toda la flota simultáneamente en milisegundos.
              </p>
              <p>
                Documentar esta limitación y el camino de evolución es más valioso en un portafolio que pretender que todo está resuelto.
              </p>
            </div>
          </section>

          <section id="metricas" className="py-12 border-t border-white/5">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Las Métricas que Hablan el Idioma del Negocio</h2>
            <p className="mb-8">
              Un sistema técnico que no puede justificarse en términos de impacto operativo es difícil de defender ante cualquier stakeholder. Estas cifras no son ficticias, emergen de la arquitectura real del sistema.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MetricCard 
                title="Tiempo de Configuración" 
                before="12 minutos (manual)" 
                after="4 minutos (guiado)" 
              />
              <MetricCard 
                title="Detección de Falla de Red" 
                before="Depende de que el cliente llame" 
                after="< 60 segundos (Auto)" 
              />
              <MetricCard 
                title="Diagnóstico Remoto" 
                before="Visita física necesaria" 
                after="Logs en tiempo real vía dashboard" 
              />
              <MetricCard 
                title="Costo de Infraestructura" 
                before="VPS + DB = $15-40/mes" 
                after="$0 (100% Serverless)" 
              />
            </div>
          </section>

          <section id="roadmap" className="py-12 border-t border-white/5">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Lo que viene en las siguientes versiones</h2>
            <p>
              Este MVP demuestra la viabilidad técnica de una flota distribuida. En las próximas versiones el sistema incorporará manejo robusto de JSON con ArduinoJson, reconexión WiFi con backoff exponencial, máquina de estados explícita, watchdog timer, gestión dinámica de tarjetas sin recompilar firmware, comunicación MQTT para actualizaciones en tiempo real y OTA updates para administración remota de la flota. Cada mejora tiene un propósito concreto: llevar el sistema de demo funcional a dispositivo IoT de producción.
            </p>
          </section>

          <section id="reflexion" className="py-12 border-t border-white/5 pb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Reflexión final</h2>
            <p className="mb-6">
              Este proyecto existe porque un sistema automatizado decidió que no calificaba antes de que un humano revisara mi perfil.
            </p>
            <p className="mb-6">
              Lo que construí no es la respuesta a ese rechazo. Es la evidencia de que el rechazo estaba equivocado.
            </p>
            <p className="mb-10">
              No documenté este proyecto para mostrar tecnología. Lo documenté para demostrar una forma de pensar: que los problemas operativos reales tienen soluciones de arquitectura elegantes, que las limitaciones de la V1 son tan importantes como sus capacidades, y que la diferencia entre un hobby project y un sistema de producción está en las decisiones que se toman cuando algo falla.
            </p>

            <PullQuote 
              quote="El ATS que me rechazó buscaba keywords. Este sistema habla de principios." 
            />

            <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
              <div>
                <p className="text-sm text-white font-mono mb-1">Escrito por: Guillermo Vásquez</p>
                <p className="text-xs text-gray-400 italic">Build Log V2.0 — Sistema Robusto: Próximamente.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="https://github.com/guillermoSoftwareEngineer/esp32-rfid-iot-telemetry" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-md text-sm font-semibold transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  Repositorio GitHub
                </a>
                <a href="https://guillermosoftwareengineer.github.io/esp32-rfid-iot-telemetry/" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-semibold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  Ver Live Demo
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
