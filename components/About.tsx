export default function About() {
  return (
    <section id="about" className="py-24 px-6 border-t border-white/5 bg-gradient-to-t from-transparent to-white/[0.02]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Sobre Mí</h2>

        <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
          {/* Decorative background accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="space-y-10 relative z-10 text-[1.05rem] md:text-lg leading-relaxed text-gray-300">

            <div className="scroll-mt-8">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-blue-500 block" />
                Quién Soy: Mi Origen Profesional
              </h4>
              <p>
                A lo largo de mi carrera, siempre noté una constante en los equipos de ingeniería y automatización: demasiados profesionales se centran exclusivamente en hacer que el código "compile", pero ignoran por completo los cuellos de botella operativos que ese mismo código genera a largo plazo. Yo no aprendí a ensamblar software siguiendo tutoriales; me forjé desmontando sistemas, entendiendo la latencia de las señales IoT, analizando la caída libre de un servidor web bajo estrés, y aprendiendo a ver todo entorno tecnológico como un ecosistema vivo de datos. Soy un <strong>Ingeniero de Sistemas Aplicados</strong> que concibe el ecosistema completo antes de siquiera escribir la primera línea del backend.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-blue-500 block" />
                Qué Hago Diferente: La Transformación
              </h4>
              <p>
                Descubrí rápidamente que el mercado no necesita otro "apasionado desarrollador" que pueda configurar un framework de moda. El mercado exige arquitectos metodológicos. <strong>Mi diferenciador radical es la traducción de complejidad al lenguaje del negocio y la hiper-optimización de flujos asíncronos</strong>. Mientras otros te cobran un mantenimiento infinito por granjas de servidores que nunca utilizaste al 100%, yo estructuro ecosistemas <em>Serverless</em> y micro-servicios distribuidos que facturan solo la milésima de segundo en la que ejecutan una transacción, dejándote a ti disfrutar la automatización real, libre de costos hundidos.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-blue-500 block" />
                Cómo Trabajo: El Proceso
              </h4>
              <p>
                Me obsesiona la eliminación de la fricción. Cuando abordo tu proyecto tecnológico, realizo un despiece absoluto de la lógica de tu negocio. Implemento bases de datos relacionales estables con esquemas Prisma, levanto el enrutamiento de Next.js, orquesto la inyección de IoT directo al Edge, y documento flujos completos que resisten el escrutinio técnico del equipo más pesado. Trato tu infraestructura como si fuese el flujo de aire aerodinámico de un vehículo: si no agiliza el movimiento final, se rediseña o se elimina.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-green-500 block" />
                Qué Busco: Siguientes Pasos
              </h4>
              <p className="mb-6">
                Actualmente me encuentro abierto a asociarme proactivamente con startups ágiles, corporaciones de alto rendimiento en modernización y equipos estratégicos donde el diseño de una arquitectura impecable marque la diferencia real en la cuota del mercado o en los márgenes de gastos AWS. Busco crear los motores oscuros que empujan la máquina del valor tecnológico.
              </p>

              <div className="mt-8 flex gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 bg-blue-600 text-white hover:bg-blue-700 w-fit px-8 py-3 shadow-lg shadow-blue-500/20"
                >
                  Diseñemos tu Arquitectura
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
