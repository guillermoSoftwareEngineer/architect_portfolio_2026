export default function About() {
  return (
    <section className="solid" id="about">
      <div className="wrap" style={{ maxWidth: "880px" }}>
        <span className="sec-tag">
          <b>//</b> Sobre mí
        </span>
        <h2 className="sec-title">
          <span className="tt-w">Mi Filosofía</span> <span className="tt-b">de Ingeniería</span>
        </h2>
        
        <article className="about-block">
          <h3>
            <i className="fas fa-microchip" />
            Quién Soy: Validación y Sistemas Críticos
          </h3>
          <p>
            Mi carrera comenzó en el laboratorio, donde pasé de pasante a roles de alta responsabilidad, saltando etapas gracias a mi capacidad para diagnosticar y resolver problemas complejos en la intersección del hardware y el software.
          </p>
          <p>
            Allí aprendí una verdad fundamental: el software no flota en la nube; depende de la energía, la latencia de la red y la robustez del dispositivo.
          </p>
          <p>
            <strong>
              Aprendí a validar sistemas desde el circuito hasta la señal, entendiendo que un código &quot;perfecto&quot; falla si ignora el entorno operativo.
            </strong>
          </p>
        </article>

        <article className="about-block">
          <h3>
            <i className="fas fa-sitemap" />
            Qué Hago Diferente: Arquitectura Iterativa y Pragmática
          </h3>
          <p>
            Me gradué como Ingeniero de Software para cerrar la brecha entre el dispositivo y la nube. Descubrí que la mejor arquitectura no se dibuja perfectamente antes de empezar, sino que evoluciona de forma iterativa junto con el código y las pruebas reales.
          </p>
          <p>
            <strong>
              Mi enfoque no es buscar la herramienta de moda, sino orquestar soluciones pragmáticas
            </strong>{" "}
            (como ecosistemas serverless de bajo costo) que resuelvan el problema hoy, con un plan claro y documentado para escalar mañana sin deuda técnica invisible.
          </p>
        </article>

        <article className="about-block">
          <h3>
            <i className="fas fa-chart-pie" />
            Cómo Trabajo: Hacia la Decisión Basada en Datos
          </h3>
          <p>
            Me obsesiona la eliminación de la fricción. Cuando abordo un proyecto tecnológico, realizo un despiece riguroso de la lógica de negocio.
          </p>
          <p>
            Implemento bases de datos relacionales con Prisma, levanto enrutamiento eficiente en Next.js, orquesto la inyección de IoT directo al Edge, y documento flujos completos que resisten el escrutinio técnico más exigente.
          </p>
          <p>
            <strong>
              Actualmente, mi foco está en evolucionar estos sistemas para que no solo recolecten telemetría, sino que permitan tomar decisiones basadas en datos e integrando principios analíticos en la capa de aplicación.
            </strong>
          </p>
        </article>
      </div>
    </section>
  );
}
