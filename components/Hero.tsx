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
          <span className="role">Ingeniero de Software con experiencia en sistemas electrónicos</span>
        </h1>
        <p className="hero-lead">
          Construyo soluciones que entienden tanto el hardware que las ejecuta, como el software que las orquesta. Transformo limitaciones físicas y restricciones de presupuesto en arquitecturas iterativas, funcionales y escalables.
        </p>
        <div className="cta-row">
          <a
            className="btn btn-primary"
            href={`${basePath}/#projects`}
            onClick={(e) => handleScrollTo(e, "projects")}
          >
            <i className="fas fa-folder-open" />
            Ver Proyectos y Arquitectura
          </a>
          <a
            className="btn btn-ghost"
            href={`${basePath}/#contact`}
            onClick={(e) => handleScrollTo(e, "contact")}
          >
            Hablemos de Ingeniería
          </a>
        </div>
      </div>
      <div className="scroll-cue">Scroll</div>
    </header>
  );
}
