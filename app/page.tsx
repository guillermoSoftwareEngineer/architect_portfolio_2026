"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ThreeBackground from "../components/ThreeBackground";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Approach from "../components/Approach";
import Projects from "../components/Projects";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.innerWidth > 768;

    const dispatchPhase = (phase: string, progress = 0) => {
      window.dispatchEvent(
        new CustomEvent('3d-phase-update', {
          detail: { phase, progress }
        })
      );
    };

    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        // Animación de entrada para el Hero
        gsap.from('.hero-inner > *', {
          opacity: 0,
          y: 18,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          delay: 0.15
        });

        // ScrollTrigger para el Hero: asegura que la fase 'hero' se active
        ScrollTrigger.create({
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          onEnter: () => dispatchPhase('hero', 0),
          onEnterBack: () => dispatchPhase('hero', 0),
        });

        if (isDesktop) {
          // Escenario Sticky (Opción B) para Desktop:
          // Un solo ScrollTrigger con scrub que anima la transición entre las 3 fases
          const cards = gsap.utils.toArray<HTMLElement>('.j-stage-card');

          // Estado inicial: fase 1 visible, fases 2 y 3 ocultas
          gsap.set(cards[0], { opacity: 1, y: 0, pointerEvents: 'auto', display: 'block' });
          gsap.set(cards[1], { opacity: 0, y: 30, pointerEvents: 'none', display: 'block' });
          gsap.set(cards[2], { opacity: 0, y: 30, pointerEvents: 'none', display: 'block' });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: '#journey-track',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.3,
              onUpdate: (self) => {
                const p = self.progress;
                if (p < 0.33) {
                  dispatchPhase('0', p / 0.33);
                } else if (p < 0.67) {
                  dispatchPhase('1', (p - 0.33) / 0.34);
                } else {
                  dispatchPhase('2', (p - 0.67) / 0.33);
                }
              }
            }
          });

          // Transición Fase 01 -> Fase 02:
          // Tarjeta 01 se desvanece (0.20 - 0.27). Espacio limpio (0.27 - 0.36). Tarjeta 02 entra (0.36 - 0.43).
          tl.to(cards[0], { opacity: 0, y: -24, pointerEvents: 'none', duration: 0.07, ease: 'power2.in' }, 0.20)
            .to(cards[1], { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.07, ease: 'power2.out' }, 0.36);

          // Transición Fase 02 -> Fase 03:
          // Tarjeta 02 se desvanece (0.54 - 0.61). Espacio limpio (0.61 - 0.70). Tarjeta 03 entra (0.70 - 0.77).
          tl.to(cards[1], { opacity: 0, y: -24, pointerEvents: 'none', duration: 0.07, ease: 'power2.in' }, 0.54)
            .to(cards[2], { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.07, ease: 'power2.out' }, 0.70);

          tl.to({}, { duration: 0.23 }); // buffer de lectura final para la fase 03
        }

        // Desactivar / pausar ThreeScene cuando se cruza a las secciones sólidas
        ScrollTrigger.create({
          trigger: '#approach',
          start: 'top 80%',
          onEnter: () => dispatchPhase('none'),
          onLeaveBack: () => {
            if (isDesktop) {
              dispatchPhase('2', 1);
            } else {
              dispatchPhase('hero', 0);
            }
          }
        });

        // Animaciones de scroll para las tarjetas de secciones sólidas
        gsap.utils.toArray('.a-card, .p-card, .about-block').forEach((el: any) => {
          gsap.from(el, {
            opacity: 0,
            y: 24,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 86%',
            }
          });
        });
      }
    });

    // Pequeño retardo para asegurar que los elementos del DOM y fuentes estén listos
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <ThreeBackground />

      <Navbar />

      <main id="top">
        <Hero />

        {/* ESCENARIO NARRATIVO STICKY (Opción B) */}
        <section id="journey-track" className="journey-track">
          <div className="journey-stage">
            <div className="journey-content-col">
              {/* FASE 1 — ARDUINO a la izquierda / Tarjeta a la derecha */}
              <article className="j-card j-stage-card right">
                <div className="j-num">FASE 01 — ORIGEN</div>
                <h2>
                  <span className="tt-w">Técnico</span> <span className="tt-b">Electrónico</span>
                </h2>
                <p>
                  A lo largo de mi carrera noté una constante: demasiados profesionales se centran en hacer que el código &quot;compile&quot;, pero ignoran los cuellos de botella operativos que ese código genera a largo plazo.
                </p>
                <p>
                  Yo no aprendí a ensamblar software siguiendo tutoriales; me forjé desmontando sistemas, entendiendo la latencia de las señales IoT y analizando la caída de un servidor bajo estrés.{" "}
                  <strong>
                    Soy un Ingeniero de Sistemas Aplicados que concibe el ecosistema completo antes de escribir la primera línea del backend.
                  </strong>
                </p>
                <ul>
                  <li>Arduino</li>
                  <li>ESP32</li>
                  <li>Raspberry Pi</li>
                  <li>Electrónica de Potencia</li>
                </ul>
              </article>

              {/* FASE 2 — MÓDULO OLED a la derecha / Tarjeta a la izquierda */}
              <article className="j-card j-stage-card left">
                <div className="j-num">FASE 02 — TRANSFORMACIÓN</div>
                <h2>
                  <span className="tt-w">Arquitecto</span> <span className="tt-b">Metodológico</span>
                </h2>
                <p>
                  El mercado no necesita otro &quot;apasionado desarrollador&quot; configurando el framework de moda. Exige arquitectos metodológicos.
                </p>
                <p>
                  <strong>Mi diferenciador es traducir complejidad al lenguaje del negocio</strong> e hiper-optimizar flujos asíncronos. Mientras otros cobran mantenimiento infinito por servidores subutilizados, yo estructuro ecosistemas serverless que facturan solo la milésima de segundo en que ejecutan una transacción.
                </p>
                <ul>
                  <li>TypeScript</li>
                  <li>Next.js</li>
                  <li>Node.js</li>
                  <li>Prisma</li>
                </ul>
              </article>

              {/* FASE 3 — ESP32 a la izquierda / Tarjeta a la derecha */}
              <article className="j-card j-stage-card right">
                <div className="j-num">FASE 03 — MISIÓN</div>
                <h2>
                  <span className="tt-w">Sistemas</span> <span className="tt-b">Aplicados</span>
                </h2>
                <p>
                  Me obsesiona eliminar la fricción: despiece absoluto de la lógica de negocio, bases de datos con esquemas Prisma, enrutamiento de Next.js e inyección de IoT directo al Edge.
                </p>
                <p>
                  <strong>
                    Trato tu infraestructura como el flujo aerodinámico de un vehículo: si no agiliza el movimiento final, se rediseña o se elimina.
                  </strong>
                </p>
                <ul>
                  <li>IoT</li>
                  <li>Edge Computing</li>
                  <li>Serverless</li>
                  <li>Arq. Distribuida</li>
                </ul>
              </article>
            </div>

            {/* Espacio reservado para la visualización de la placa en desktop */}
            <div className="journey-3d-col" aria-hidden="true" />
          </div>
        </section>

        <Approach />

        <Projects />

        <About />

        <Contact />

        <Footer />
      </main>

      <div className="board-hud" id="boardHud">
        <strong>RASPBERRY PI 5</strong>
        <br />
        SoC · GPIO 40p · Edge Node
      </div>
    </>
  );
}

