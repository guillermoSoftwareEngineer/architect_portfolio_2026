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
                <div className="j-num">FASE 01 — ORIGEN: VALIDACIÓN Y SISTEMAS CRÍTICOS</div>
                <h2>
                  <span className="tt-w">Validación y</span> <span className="tt-b">Sistemas Críticos</span>
                </h2>
                <p>
                  Mi carrera comenzó en el laboratorio, donde pasé de pasante a roles de alta responsabilidad, saltando etapas gracias a mi capacidad para diagnosticar y resolver problemas complejos en la intersección del hardware y el software.
                </p>
                <p>
                  Allí aprendí una verdad fundamental: el software no flota en la nube; depende de la energía, la latencia de la red y la robustez del dispositivo.{" "}
                  <strong>
                    Aprendí a validar sistemas desde el circuito hasta la señal, entendiendo que un código &quot;perfecto&quot; falla si ignora el entorno operativo.
                  </strong>
                </p>
                <ul>
                  <li>Arduino</li>
                  <li>ESP32</li>
                  <li>Raspberry Pi</li>
                  <li>Instrumentación</li>
                  <li>Pruebas de Sistemas</li>
                </ul>
              </article>

              {/* FASE 2 — MÓDULO OLED a la derecha / Tarjeta a la izquierda */}
              <article className="j-card j-stage-card left">
                <div className="j-num">FASE 02 — TRANSFORMACIÓN: ARQUITECTURA ITERATIVA</div>
                <h2>
                  <span className="tt-w">Arquitectura</span> <span className="tt-b">Iterativa y Pragmática</span>
                </h2>
                <p>
                  Me gradué como Ingeniero de Software para cerrar la brecha entre el dispositivo y la nube. Descubrí que la mejor arquitectura no se dibuja perfectamente antes de empezar, sino que evoluciona de forma iterativa junto con el código y las pruebas reales.
                </p>
                <p>
                  <strong>Mi enfoque no es buscar la herramienta de moda,</strong> sino orquestar soluciones pragmáticas (como ecosistemas serverless de bajo costo) que resuelvan el problema hoy, con un plan claro y documentado para escalar mañana.
                </p>
                <ul>
                  <li>TypeScript</li>
                  <li>Next.js</li>
                  <li>Node.js</li>
                  <li>Prisma</li>
                  <li>Arq. Distribuidas</li>
                </ul>
              </article>

              {/* FASE 3 — ESP32 a la izquierda / Tarjeta a la derecha */}
              <article className="j-card j-stage-card right">
                <div className="j-num">FASE 03 — MISIÓN: DECISIÓN BASADA EN DATOS</div>
                <h2>
                  <span className="tt-w">Hacia la Decisión</span> <span className="tt-b">Basada en Datos</span>
                </h2>
                <p>
                  Me obsesiona la eliminación de la fricción. Cuando abordo un proyecto, realizo un despiece de la lógica de negocio para implementar soluciones sólidas: bases de datos relacionales con Prisma, enrutamiento eficiente en Next.js e inyección de IoT directo al Edge.
                </p>
                <p>
                  <strong>
                    Actualmente, mi foco está en evolucionar estos sistemas para que no solo recolecten datos, sino que permitan tomar decisiones basadas en ellos,
                  </strong>{" "}
                  integrando principios de Ciencia de Datos en la capa de aplicación.
                </p>
                <ul>
                  <li>IoT &amp; Edge</li>
                  <li>Ciencia de Datos</li>
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

