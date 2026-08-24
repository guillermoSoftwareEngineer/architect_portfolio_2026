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
            <i className="fas fa-user-astronaut" />
            Quién Soy: Mi Origen Profesional
          </h3>
          <p>
            A lo largo de mi carrera, siempre noté una constante en los equipos de ingeniería y automatización: demasiados profesionales se centran exclusivamente en hacer que el código "compile", pero ignoran por completo los cuellos de botella operativos que ese mismo código genera a largo plazo.
          </p>
          <p>
            Yo no aprendí a ensamblar software siguiendo tutoriales; me forjé desmontando sistemas, entendiendo la latencia de las señales IoT, analizando la caída libre de un servidor web bajo estrés, y aprendiendo a ver todo entorno tecnológico como un ecosistema vivo de datos.
          </p>
          <p>
            <strong>
              Soy un Ingeniero de Sistemas Aplicados que concibe el ecosistema completo antes de siquiera escribir la primera línea del backend.
            </strong>
          </p>
        </article>

        <article className="about-block">
          <h3>
            <i className="fas fa-lightbulb" />
            Qué Hago Diferente: La Transformación
          </h3>
          <p>
            Descubrí rápidamente que el mercado no necesita otro "apasionado desarrollador" que pueda configurar un framework de moda. El mercado exige arquitectos metodológicos.
          </p>
          <p>
            <strong>
              Mi diferenciador radical es la traducción de complejidad al lenguaje del negocio y la hiper-optimización de flujos asíncronos.
            </strong>{" "}
            Mientras otros te cobran un mantenimiento infinito por granjas de servidores que nunca utilizaste al 100%, yo estructuro ecosistemas Serverless y micro-servicios distribuidos que facturan solo la milésima de segundo en la que ejecutan una transacción, dejándote a ti disfrutar la automatización real, libre de costos hundidos.
          </p>
        </article>

        <article className="about-block">
          <h3>
            <i className="fas fa-cogs" />
            Cómo Trabajo: El Proceso
          </h3>
          <p>
            Me obsesiona la eliminación de la fricción. Cuando abordo tu proyecto tecnológico, realizo un despiece absoluto de la lógica de tu negocio.
          </p>
          <p>
            Implemento bases de datos relacionales estables con esquemas Prisma, levanto el enrutamiento de Next.js, orquesto la inyección de IoT directo al Edge, y documento flujos completos que resisten el escrutinio técnico del equipo más pesado.
          </p>
          <p>
            <strong>
              Trato tu infraestructura como si fuese el flujo de aire aerodinámico de un vehículo: si no agiliza el movimiento final, se rediseña o se elimina.
            </strong>
          </p>
        </article>
      </div>
    </section>
  );
}
