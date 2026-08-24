export default function Approach() {
  return (
    <section className="solid" id="approach">
      <div className="wrap">
        <span className="sec-tag">
          <b>//</b> Mi enfoque
        </span>
        <h2 className="sec-title">
          <span className="tt-w">No solo codifico.</span>{" "}
          <span className="tt-b">Arquitecto sistemas.</span>
        </h2>
        <p className="sec-lead">
          Un enfoque metódico para resolver problemas empresariales a través de la tecnología.
        </p>
        <div className="approach-grid">

          {/* Análisis de Complejidad */}
          <article className="a-card">
            <i className="fas fa-magnifying-glass-chart a-icon" />
            <h3>Análisis de Complejidad</h3>
            <p>
              Desgloso problemas caóticos en flujos lógicos comprensibles antes de escribir una sola línea de código.
            </p>
          </article>

          {/* Diseño de Arquitectura */}
          <article className="a-card">
            <i className="fas fa-sitemap a-icon" />
            <h3>Diseño de Arquitectura</h3>
            <p>
              Estructuración de soluciones resilientes y escalables adaptadas a los requisitos técnicos y de negocio.
            </p>
          </article>

          {/* Optimización Continua */}
          <article className="a-card">
            <i className="fas fa-gauge-high a-icon" />
            <h3>Optimización Continua</h3>
            <p>
              Ajuste constante de rendimiento, cuellos de botella y procesos para entregar resultados eficientes.
            </p>
          </article>

        </div>
      </div>
    </section>
  );
}
