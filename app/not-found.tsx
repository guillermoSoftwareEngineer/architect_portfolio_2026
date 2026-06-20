export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#080808] text-gray-100 flex flex-col items-center justify-center p-6 text-center">
      {/* Noise texture overlay */}
      <div 
        className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}
      />

      <div className="relative z-10 max-w-md">
        <h1 className="text-8xl font-bold text-blue-500 font-mono mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Página No Encontrada</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          La ruta que intentas auditar no existe en el sistema o ha sido reubicada para optimizar recursos.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
        >
          Regresar al Portafolio
        </a>
      </div>
    </main>
  );
}
