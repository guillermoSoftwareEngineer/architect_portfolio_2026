export default function Approach() {
  return (
    <section className="solid" id="approach">
      <div className="wrap">
        <span className="sec-tag">
          <b>//</b> Enfoque &amp; Diferenciadores
        </span>
        <h2 className="sec-title">
          <span className="tt-w">Criterios de</span>{" "}
          <span className="tt-b">Ingeniería Real</span>
        </h2>
        <p className="sec-lead">
          Pragmatismo, entendimiento profundo del stack e iteración orientada a valor.
        </p>
        <div className="approach-grid">

          {/* Bloque 1: Visión de Stack Completo */}
          <article className="a-card">
            <i className="fas fa-layer-group a-icon" />
            <h3>Visión de Stack Completo</h3>
            <p>
              No solo codifico el backend; entiendo lo que sucede en el Edge. Documento flujos completos que resisten el escrutinio técnico porque sé cómo se comporta la señal desde el sensor hasta la base de datos.
            </p>
          </article>

          {/* Bloque 2: Pragmatismo y Eficiencia Sistémica */}
          <article className="a-card">
            <i className="fas fa-scale-balanced a-icon" />
            <h3>Pragmatismo y Eficiencia Sistémica</h3>
            <p>
              Trato la infraestructura con criterios de ingeniería real: si un componente no aporta valor, consume recursos innecesarios o añade fricción, se refactoriza o se elimina. Prefiero un MVP serverless de costo cero que funcione hoy, sobre una sobreingeniería costosa que no se usa.
            </p>
          </article>

          {/* Bloque 3: Evolución hacia los Datos */}
          <article className="a-card">
            <i className="fas fa-chart-line a-icon" />
            <h3>Evolución hacia los Datos</h3>
            <p>
              Un sistema que solo almacena datos es un sistema a medias. Mi objetivo es dotar a mis arquitecturas de capacidades analíticas, transformando telemetría cruda en insights accionables para el negocio.
            </p>
          </article>

        </div>
      </div>
    </section>
  );
}
