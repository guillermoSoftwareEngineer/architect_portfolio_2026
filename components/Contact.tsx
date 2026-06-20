import EmailShield from "@/components/EmailShield";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Iniciemos una conversación</h2>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
          Abierto a roles de ingeniería, arquitectura de software y desarrollo de soluciones backend / IoT donde el pensamiento analítico sea clave.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
          <a 
            href="https://www.linkedin.com/in/guillermovasbendev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="glass-panel w-full md:w-64 p-8 flex flex-col items-center justify-center group hover:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-4 text-[#0a66c2] group-hover:scale-110 transition-transform">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            <h4 className="text-xl font-semibold mb-1">LinkedIn</h4>
            <span className="text-sm text-gray-500">Conectar en la red</span>
          </a>

          <a 
            href="https://github.com/guillermoSoftwareEngineer" 
            target="_blank" 
            rel="noopener noreferrer"
            className="glass-panel w-full md:w-64 p-8 flex flex-col items-center justify-center group hover:border-gray-300/50 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-gray-300 group-hover:scale-110 transition-transform">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <h4 className="text-xl font-semibold mb-1">GitHub</h4>
            <span className="text-sm text-gray-500">Auditar el código</span>
          </a>

          {/* Card Correo — EmailShield protege contra scrapers */}
          <div 
            className="glass-panel w-full md:w-64 p-8 flex flex-col items-center justify-center hover:border-emerald-500/30 focus-within:ring-2 focus-within:ring-emerald-500 transition-all"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-4 text-emerald-500">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <h4 className="text-xl font-semibold mb-1">Correo</h4>
            <p className="text-sm text-gray-500 mb-3">Respuesta en menos de 24h</p>
            <EmailShield />
          </div>
        </div>
      </div>
    </section>
  );
}
