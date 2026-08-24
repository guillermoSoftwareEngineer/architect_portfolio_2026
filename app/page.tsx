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

    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        // Animaciones de scroll para las tarjetas
        gsap.utils.toArray('.j-card, .a-card, .p-card, .about-block').forEach((el: any) => {
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

        // Animación de entrada para el Hero
        gsap.from('.hero-inner > *', {
          opacity: 0,
          y: 18,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          delay: 0.15
        });
      }
    });

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <ThreeBackground />

      <Navbar />

      <main id="top">
        <Hero />

        {/* FASE 1 — RASPBERRY PI en escena */}
        <section className="journey">
          <article className="j-card">
            <div className="j-num">FASE 01 — ORIGEN</div>
            <h2>
              <span className="tt-w">Técnico</span> <span className="tt-b">Electrónico</span>
            </h2>
            <p>
              A lo largo de mi carrera noté una constante: demasiados profesionales se centran en hacer que el código "compile", pero ignoran los cuellos de botella operativos que ese código genera a largo plazo.
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
        </section>

        {/* FASE 2 — ARDUINO en escena */}
        <section className="journey">
          <article className="j-card right">
            <div className="j-num">FASE 02 — TRANSFORMACIÓN</div>
            <h2>
              <span className="tt-w">Arquitecto</span> <span className="tt-b">Metodológico</span>
            </h2>
            <p>
              El mercado no necesita otro "apasionado desarrollador" configurando el framework de moda. Exige arquitectos metodológicos.
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
        </section>

        {/* FASE 3 — ESP32 en escena */}
        <section className="journey">
          <article className="j-card">
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
