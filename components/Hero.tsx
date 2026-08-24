"use client";

export default function Hero() {
  const basePath = process.env.__NEXT_ROUTER_BASEPATH || "";

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      window.scrollTo({
        top: el.offsetTop - 60,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="hero" id="hero">
      <div className="hero-inner">
        <span className="badge">
          <i />
          Disponible para nuevos desafíos técnicos
        </span>
        <h1>
          Guillermo Vásquez
          <span className="role">Ingeniero de Sistemas Aplicados</span>
        </h1>
        <p className="hero-lead">
          Transformo complejidad técnica en arquitecturas optimizadas para decisiones y procesos reales.
        </p>
        <div className="cta-row">
          <a
            className="btn btn-primary"
            href={`${basePath}/#projects`}
            onClick={(e) => handleScrollTo(e, "projects")}
          >
            <i className="fas fa-folder-open" />
            Ver Casos de Estudio
          </a>
          <a
            className="btn btn-ghost"
            href={`${basePath}/#about`}
            onClick={(e) => handleScrollTo(e, "about")}
          >
            Leer sobre mi enfoque
          </a>
        </div>
      </div>
      <div className="scroll-cue">Scroll</div>
    </header>
  );
}
