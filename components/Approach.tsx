import React from "react";

// Directrices de Agente 4 (Diseñador Visual) + Agente 6 (UX/UI):
// Sistema de identidad Nivel 2: Iconografía personalizada
// Fondo icon container: #2a2438 (púrpura muy oscuro)
// Color acento: #A78BFA (púrpura lila suave)
// Color acento secundario: #7C3AED (púrpura intenso)
// Transiciones: 150-300ms ease-out (sin bounces)

// Icono 1: Red de nodos caóticos que convergen en flujo ordenado — Pensamiento Estructurado
function ComplexityIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Nodos caóticos (izquierda) */}
      <circle cx="5" cy="8" r="2" fill="#7C3AED" opacity="0.6" />
      <circle cx="10" cy="18" r="1.5" fill="#A78BFA" opacity="0.5" />
      <circle cx="4" cy="28" r="2" fill="#7C3AED" opacity="0.6" />
      <circle cx="12" cy="34" r="1.5" fill="#A78BFA" opacity="0.4" />
      {/* Líneas caóticas */}
      <line x1="5" y1="8" x2="10" y2="18" stroke="#A78BFA" strokeWidth="0.8" opacity="0.4" />
      <line x1="10" y1="18" x2="4" y2="28" stroke="#A78BFA" strokeWidth="0.8" opacity="0.4" />
      <line x1="4" y1="28" x2="12" y2="34" stroke="#A78BFA" strokeWidth="0.8" opacity="0.4" />
      <line x1="5" y1="8" x2="12" y2="34" stroke="#7C3AED" strokeWidth="0.6" opacity="0.3" />
      <line x1="10" y1="18" x2="12" y2="34" stroke="#7C3AED" strokeWidth="0.6" opacity="0.3" />
      {/* Embudo / convergencia (centro) */}
      <path d="M16 6 L24 20 L16 34" stroke="#A78BFA" strokeWidth="1" fill="none" opacity="0.5" strokeLinejoin="round" />
      <path d="M16 6 L20 20" stroke="url(#grad1)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M16 34 L20 20" stroke="url(#grad1)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Nodo central de convergencia */}
      <circle cx="20" cy="20" r="3" fill="url(#grad1)" />
      {/* Flujo ordenado (derecha) */}
      <line x1="23" y1="20" x2="36" y2="20" stroke="url(#grad1)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="23" y1="15" x2="36" y2="15" stroke="#A78BFA" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="23" y1="25" x2="36" y2="25" stroke="#A78BFA" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      {/* Flecha de salida */}
      <polyline points="33,16.5 36,20 33,23.5" stroke="#A78BFA" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Icono 2: Capas horizontales de sistema conectadas por eje vertical — Arquitectura en capas
function ArchitectureIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Capa 1 — Presentación */}
      <rect x="4" y="5" width="32" height="7" rx="2" fill="#7C3AED" opacity="0.25" stroke="#A78BFA" strokeWidth="0.8" />
      <line x1="8" y1="8.5" x2="16" y2="8.5" stroke="#A78BFA" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <line x1="18" y1="8.5" x2="22" y2="8.5" stroke="#A78BFA" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      {/* Capa 2 — Lógica */}
      <rect x="4" y="16.5" width="32" height="7" rx="2" fill="#7C3AED" opacity="0.35" stroke="#A78BFA" strokeWidth="0.8" />
      <line x1="8" y1="20" x2="32" y2="20" stroke="#A78BFA" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <circle cx="14" cy="20" r="1.5" fill="#A78BFA" opacity="0.9" />
      <circle cx="22" cy="20" r="1.5" fill="#7C3AED" opacity="0.9" />
      <circle cx="30" cy="20" r="1.5" fill="#A78BFA" opacity="0.6" />
      {/* Capa 3 — Datos */}
      <rect x="4" y="28" width="32" height="7" rx="2" fill="#7C3AED" opacity="0.2" stroke="#A78BFA" strokeWidth="0.8" />
      <rect x="8" y="30" width="8" height="3" rx="1" fill="#A78BFA" opacity="0.4" />
      <rect x="18" y="30" width="5" height="3" rx="1" fill="#7C3AED" opacity="0.5" />
      <rect x="25" y="30" width="7" height="3" rx="1" fill="#A78BFA" opacity="0.3" />
      {/* Ejes de conexión vertical */}
      <line x1="20" y1="12" x2="20" y2="16.5" stroke="#A78BFA" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="20" y1="23.5" x2="20" y2="28" stroke="#A78BFA" strokeWidth="1.2" strokeLinecap="round" />
      {/* Puntos de conexión */}
      <circle cx="20" cy="14.5" r="1.2" fill="#A78BFA" />
      <circle cx="20" cy="25.5" r="1.2" fill="#A78BFA" />
    </svg>
  );
}

// Icono 3: Loop de retroalimentación con vectores de velocidad — Optimización continua
function OptimizationIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Arco circular superior (el loop) */}
      <path
        d="M20 6 A14 14 0 1 1 6 20"
        stroke="url(#grad3)" strokeWidth="1.5" fill="none" strokeLinecap="round"
      />
      {/* Flecha del loop (punta) */}
      <polyline points="4,15 6,20 11,18" stroke="#A78BFA" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Eje horizontal de métricas */}
      <line x1="10" y1="28" x2="32" y2="28" stroke="#A78BFA" strokeWidth="0.8" opacity="0.4" strokeLinecap="round" />
      {/* Barras de rendimiento (crecientes = optimización) */}
      <rect x="12" y="22" width="3" height="6" rx="1" fill="#7C3AED" opacity="0.6" />
      <rect x="17" y="19" width="3" height="9" rx="1" fill="#7C3AED" opacity="0.7" />
      <rect x="22" y="16" width="3" height="12" rx="1" fill="#A78BFA" opacity="0.8" />
      <rect x="27" y="13" width="3" height="15" rx="1" fill="#A78BFA" />
      {/* Punto de estado actual (en el arco) */}
      <circle cx="32" cy="10" r="2.5" fill="#A78BFA" />
      <circle cx="32" cy="10" r="1" fill="white" opacity="0.8" />
      {/* Vector de velocidad */}
      <line x1="32" y1="10" x2="38" y2="5" stroke="#A78BFA" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <polyline points="35,5 38,5 38,8" stroke="#A78BFA" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <defs>
        <linearGradient id="grad3" x1="1" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const capabilities = [
  {
    Icon: ComplexityIcon,
    title: "Análisis de Complejidad",
    desc: "Desgloso problemas caóticos en flujos lógicos comprensibles antes de escribir una sola línea de código."
  },
  {
    Icon: ArchitectureIcon,
    title: "Diseño de Arquitectura",
    desc: "Estructuración de soluciones resilientes y escalables adaptadas a los requisitos técnicos y de negocio."
  },
  {
    Icon: OptimizationIcon,
    title: "Optimización Continua",
    desc: "Ajuste constante de rendimiento, cuellos de botella y procesos para entregar resultados eficientes."
  }
];

export default function Approach() {
  return (
    <section id="approach" className="py-24 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-blue-900/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#E2E8F0]">No solo codifico. <span className="text-[#A78BFA]">Arquitecto sistemas.</span></h2>
          <p className="text-[#94A3B8] text-lg">Un enfoque metódico para resolver problemas empresariales a través de la tecnología.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {capabilities.map(({ Icon, title, desc }, i) => (
            <div key={i} className="glass-panel p-8 group border-t-2 border-t-transparent hover:border-t-[#7C3AED] transition-colors rounded-xl bg-[#1e1e2e]/50 backdrop-blur-sm">
              <div className="mb-6 p-3 inline-flex items-center justify-center rounded-[10px] bg-[#2a2438] group-hover:scale-110 transition-transform duration-200 ease-out w-[56px] h-[56px]">
                <Icon />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#E2E8F0]">{title}</h3>
              <p className="text-[#94A3B8] leading-relaxed text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


