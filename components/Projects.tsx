import Image from "next/image";
import ImageLightbox from "./ImageLightbox";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Evidencia de Capacidad</h2>
          <p className="text-gray-400 text-lg">Casos de estudio y soluciones arquitectónicas reales.</p>
        </div>

        <div className="glass-panel p-8 md:p-12 mb-12">
          <div className="border-b border-white/10 pb-8 mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center flex-wrap gap-3">
              Sistema de Telemetría RFID e Ingesta Serverless
              <span className="bg-blue-500/20 text-blue-400 text-sm py-1 px-3 rounded-full font-mono border border-blue-500/30">v1.0 MVP</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono font-medium">ESP32</span>
              <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono font-medium">C++ (Edge)</span>
              <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono font-medium">Google Apps Script</span>
              <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono font-medium">Arquitectura Distribuida</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mb-12">
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <span className="bg-blue-500/20 p-1.5 rounded-md">1</span> Contexto
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                Necesidad de capturar accesos físicos e indicadores de conectividad desde hardware distribuido sin depender de instancias VPS (Virtual Private Server) dedicadas costosas, manejando latencias de red impredecibles.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <span className="bg-blue-500/20 p-1.5 rounded-md">2</span> Enfoque
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                Diseñé un flujo orientado a micro-eventos. Los nodos (simulados en Wokwi) actúan asincrónicamente mediante <code>millis()</code>. La inyección de datos usa la capa serverless de Google como middleware con &quot;Guard Clauses&quot; estrictas antes de persistir dinámicamente.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <span className="bg-blue-500/20 p-1.5 rounded-md">3</span> Resultado
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                Un MVP funcional y elástico capaz de orquestar <strong>Control de Acceso</strong>, <strong>Heartbeats</strong>, y <strong>Diagnóstico Remoto</strong> a costo cero operativo. Se mapeó un Roadmap técnico claro para escalar a MQTT y PostgreSQL en producción.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-10">
            <a href="https://guillermosoftwareengineer.github.io/esp32-rfid-iot-telemetry/" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-semibold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              Ver Live Demo
            </a>
            <a href="https://github.com/guillermoSoftwareEngineer/esp32-rfid-iot-telemetry" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-md text-sm font-semibold transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              Repositorio GitHub
            </a>
            <a href="https://docs.google.com/spreadsheets/d/190eHDp5CDBticzez-2B9_Y_5XoW9VuMMkePLNthKp9c/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 rounded-md text-sm font-semibold transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
              Google Sheets en Vivo
            </a>
            <a href="/build-logs/esp32-rfid" className="px-5 py-2.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-400 rounded-md text-sm font-semibold transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              Build Logs & Arquitectura
            </a>
          </div>

          {/* Visuals section */}
          <div className="grid md:grid-cols-2 gap-6 bg-black/40 p-4 md:p-8 rounded-2xl border border-white/5">
            <div className="border border-white/10 rounded-xl overflow-hidden bg-black flex flex-col h-full">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5 shrink-0">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs font-mono text-gray-500">esp32-rfid-iot-telemetry-demo.mp4</span>
              </div>
              <div className="flex-grow flex items-center justify-center p-0 bg-black/80 relative group">
                <video 
                  src="/videos/esp32-rfid-iot-telemetry-demo.mp4" 
                  controls 
                  className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
            
            <div className="border border-white/10 rounded-xl overflow-hidden bg-black flex flex-col h-full">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5 shrink-0">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs font-mono text-gray-500">architecture_diagram.png</span>
              </div>
              <div className="flex-grow flex items-center justify-center p-0 bg-black/80">
                <ImageLightbox src="/images/system-architecture-es.png" alt="Diagrama de arquitectura del sistema distribuido: ESP32, Google Apps Script Serverless y Google Sheets como base de datos" width={800} height={450} />
              </div>
            </div>
          </div>
        </div>

        {/* --- PLACEHOLDER PROYECTO 02 --- */}
        <div className="glass-panel p-8 md:p-12 mb-12 border-dashed border-gray-600/50 hover:border-gray-500/80 transition-colors opacity-70">
          <div className="border-b border-white/10 pb-8 mb-8 flex justify-between items-start">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-400">Prácticas de Optimización Serverless Backend</h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 rounded-full bg-gray-500/10 text-gray-400 border border-gray-500/20 text-xs font-mono font-medium">AWS / GCP</span>
                <span className="px-4 py-1.5 rounded-full bg-gray-500/10 text-gray-400 border border-gray-500/20 text-xs font-mono font-medium">Node.js</span>
              </div>
            </div>
            <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-orange-500/50">PRÓXIMAMENTE</span>
          </div>

          <div className="grid md:grid-cols-3 gap-10 opacity-50 filter blur-[2px] select-none">
            <div>
              <h4 className="text-lg font-semibold text-gray-400 mb-3 flex items-center gap-2">
                <span className="bg-gray-500/20 p-1.5 rounded-md">1</span> Contexto
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                [Espacio reservado para describir el dolor de negocio y la situación problemática abordada en este segundo caso de estudio].
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-400 mb-3 flex items-center gap-2">
                <span className="bg-gray-500/20 p-1.5 rounded-md">2</span> Enfoque
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                [Espacio reservado para describir tu metodología, arquitectura o enfoque técnico no convencional para solucionarlo].
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-400 mb-3 flex items-center gap-2">
                <span className="bg-gray-500/20 p-1.5 rounded-md">3</span> Resultado ...
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                [Descripción cruda del ROI/Reducción de latencia/Valor aportado].
              </p>
            </div>
          </div>
        </div>

        {/* --- PLACEHOLDER PROYECTO 03 --- */}
        <div className="glass-panel p-8 md:p-12 border-dashed border-gray-600/50 hover:border-gray-500/80 transition-colors opacity-70">
          <div className="border-b border-white/10 pb-8 mb-8 flex justify-between items-start">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-400">Automatización de Flujos DevOps / CI-CD</h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 rounded-full bg-gray-500/10 text-gray-400 border border-gray-500/20 text-xs font-mono font-medium">GitHub Actions</span>
                <span className="px-4 py-1.5 rounded-full bg-gray-500/10 text-gray-400 border border-gray-500/20 text-xs font-mono font-medium">Docker</span>
              </div>
            </div>
            <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-orange-500/50">EN DESARROLLO</span>
          </div>

          <div className="grid md:grid-cols-3 gap-10 opacity-50 filter blur-[2px] select-none">
            <div>
              <h4 className="text-lg font-semibold text-gray-400 mb-3 flex items-center gap-2">
                <span className="bg-gray-500/20 p-1.5 rounded-md">1</span> Contexto ...
              </h4>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-400 mb-3 flex items-center gap-2">
                <span className="bg-gray-500/20 p-1.5 rounded-md">2</span> Enfoque ...
              </h4>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-400 mb-3 flex items-center gap-2">
                <span className="bg-gray-500/20 p-1.5 rounded-md">3</span> Resultado ...
              </h4>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
