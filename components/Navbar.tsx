"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const basePath = process.env.__NEXT_ROUTER_BASEPATH || "";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      const isHome =
        window.location.pathname === basePath ||
        window.location.pathname === `${basePath}/` ||
        window.location.pathname === "/";
      if (isHome) {
        const el = document.getElementById(targetId);
        if (el) {
          e.preventDefault();
          window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <nav id="nav" className={isScrolled ? "scrolled" : ""}>
      {/* Logo — símbolo terminal >_ igual que el ejemplo */}
      <a
        className="logo"
        href={`${basePath}/#top`}
        onClick={(e) => handleLinkClick(e, "top")}
      >
        <span className="logo-mark">
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none" aria-hidden="true">
            <path d="M1 1l4 4.5L1 10" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 10h6" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
        Guillermo Vásquez
      </a>

      <ul className={`nav-links ${isOpen ? "open" : ""}`} id="navLinks">
        <li>
          <a href={`${basePath}/#approach`} onClick={(e) => handleLinkClick(e, "approach")}>
            Enfoque
          </a>
        </li>
        <li>
          <a href={`${basePath}/#projects`} onClick={(e) => handleLinkClick(e, "projects")}>
            Evidencia
          </a>
        </li>
        <li>
          <a href={`${basePath}/#about`} onClick={(e) => handleLinkClick(e, "about")}>
            Sobre Mí
          </a>
        </li>
        <li>
          <a href={`${basePath}/#contact`} onClick={(e) => handleLinkClick(e, "contact")}>
            Contacto
          </a>
        </li>
      </ul>

      <button
        className={`menu-btn ${isOpen ? "open" : ""}`}
        id="menuBtn"
        aria-label="Abrir menú"
        aria-expanded={isOpen ? "true" : "false"}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="burger-icon" aria-hidden="true">
          <span className="bun-top" />
          <span className="patty" />
          <span className="bun-bot" />
        </span>
        <span className="burger-label" id="burgerLabel">
          {isOpen ? "CERRAR" : "MENU"}
        </span>
      </button>
    </nav>
  );
}
