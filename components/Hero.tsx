
export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-section min-h-[85vh] flex items-center justify-center pt-20 px-6"
    >
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 mb-8 mt-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono text-emerald-400 tracking-wider">DISPONIBLE PARA NUEVOS DESAFÍOS TÉCNICOS</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          <span className="block text-sm md:text-base font-medium text-gray-500 mb-4 tracking-widest uppercase">Guillermo Vásquez</span>
          Ingeniero de <br className="hidden md:block" />
          <span className="gradient-text">Sistemas Aplicados</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
          Transformo complejidad técnica en arquitecturas optimizadas para decisiones y procesos reales.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a href="#projects" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3.5 rounded-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.25)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:-translate-y-0.5">
            Ver Casos de Estudio
          </a>
          <a href="#about" className="bg-transparent hover:bg-white/5 text-white font-medium px-8 py-3.5 rounded-lg border border-white/10 hover:border-white/20 transition-all">
            Leer sobre mi enfoque
          </a>
        </div>
      </div>
    </section>
  );
}
