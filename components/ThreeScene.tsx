"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type PhaseType = 'hero' | '0' | '1' | '2' | 'none';

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let isMobile = window.innerWidth <= 768;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    // Limitar pixelRatio a 2 en desktop y 1.5 en móvil para óptimo rendimiento
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    if ("outputColorSpace" in renderer) {
      (renderer as any).outputColorSpace = (THREE as any).SRGBColorSpace;
    } else if ("outputEncoding" in renderer) {
      (renderer as any).outputEncoding = (THREE as any).sRGBEncoding;
    }

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.4, isMobile ? 15 : 12);

    /* ---------- Iluminación de estudio ---------- */
    scene.add(new THREE.AmbientLight(0xB8C4D6, 0.4));
    const key = new THREE.DirectionalLight(0xFFFFFF, 1.1);
    key.position.set(6, 9, 7);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x8FA3BF, 0.35);
    fill.position.set(-7, 2, 4);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0x3B82F6, 0.35);
    rim.position.set(-4, 6, -8);
    scene.add(rim);

    /* ---------- Materiales base (colores reales de hardware) ---------- */
    const M = {
      pcbPi:   new THREE.MeshStandardMaterial({ color: 0x0F8A34, roughness: 0.5,  metalness: 0.15, transparent: true }),
      pcbArdu: new THREE.MeshStandardMaterial({ color: 0x0B7279, roughness: 0.55, metalness: 0.15, transparent: true }),
      pcbEsp:  new THREE.MeshStandardMaterial({ color: 0x12355B, roughness: 0.5,  metalness: 0.2,  transparent: true }),
      metal:   new THREE.MeshStandardMaterial({ color: 0xC9CED6, roughness: 0.32, metalness: 0.92, transparent: true }),
      metalDk: new THREE.MeshStandardMaterial({ color: 0x8A919C, roughness: 0.42, metalness: 0.85, transparent: true }),
      black:   new THREE.MeshStandardMaterial({ color: 0x171A1F, roughness: 0.6,  metalness: 0.25, transparent: true }),
      chip:    new THREE.MeshStandardMaterial({ color: 0x23262B, roughness: 0.45, metalness: 0.4,  transparent: true }),
      gold:    new THREE.MeshStandardMaterial({ color: 0xD2A24C, roughness: 0.28, metalness: 1,   transparent: true }),
      blue:    new THREE.MeshStandardMaterial({ color: 0x1D4ED8, roughness: 0.5,  metalness: 0.3,  transparent: true }),
      tan:     new THREE.MeshStandardMaterial({ color: 0xC89B6A, roughness: 0.6,  metalness: 0.1,  transparent: true }),
      ledG:    new THREE.MeshStandardMaterial({ color: 0x10B981, roughness: 0.3,  metalness: 0.2,  emissive: new THREE.Color(0x10B981), emissiveIntensity: 0.7, transparent: true }),
      ledO:    new THREE.MeshStandardMaterial({ color: 0xF97316, roughness: 0.3,  metalness: 0.2,  emissive: new THREE.Color(0xF97316), emissiveIntensity: 0.6, transparent: true }),
      // módulo OLED de datos
      pcbGauge:    new THREE.MeshStandardMaterial({ color: 0x0c56d6, roughness: 0.55, metalness: 0.08,  transparent: true }),
      silkFrame:   new THREE.MeshStandardMaterial({ color: 0xeef1f6, roughness: 0.55, metalness: 0.05, transparent: true }),
      bezelGauge:  new THREE.MeshStandardMaterial({ color: 0x0b0d10, roughness: 0.5,  metalness: 0.3,  transparent: true }),
      screenBg:    new THREE.MeshStandardMaterial({ color: 0x030509, roughness: 0.7, metalness: 0, emissive: new THREE.Color(0x050912), emissiveIntensity: 0.3, transparent: true }),
      barBlue:     new THREE.MeshStandardMaterial({ color: 0x2f6fe0, roughness: 0.35, metalness: 0, emissive: new THREE.Color(0x3b82f6), emissiveIntensity: 0.85, transparent: true }),
      barCyan:     new THREE.MeshStandardMaterial({ color: 0x17b8d6, roughness: 0.35, metalness: 0, emissive: new THREE.Color(0x22d3ee), emissiveIntensity: 0.85, transparent: true }),
      barViolet:   new THREE.MeshStandardMaterial({ color: 0x8b6ef0, roughness: 0.35, metalness: 0, emissive: new THREE.Color(0xa78bfa), emissiveIntensity: 0.8, transparent: true }),
    };

    function roundedPCB(w: number, h: number, r: number, mat: THREE.Material, t = 0.16) {
      const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
      s.moveTo(x, y + r);
      s.lineTo(x, y + h - r); s.absarc(x + r, y + h - r, r, Math.PI, Math.PI / 2, true);
      s.lineTo(x + w - r, y + h); s.absarc(x + w - r, y + h - r, r, Math.PI / 2, 0, true);
      s.lineTo(x + w, y + r); s.absarc(x + w - r, y + r, r, 0, -Math.PI / 2, true);
      s.lineTo(x + r, y); s.absarc(x + r, y + r, r, -Math.PI / 2, -Math.PI, true);
      const g = new THREE.ExtrudeGeometry(s, { depth: t, bevelEnabled: false, curveSegments: 24 });
      const mesh = new THREE.Mesh(g, mat);
      mesh.rotation.x = -Math.PI / 2;
      return mesh;
    }

    function box(w: number, h: number, d: number, mat: THREE.Material, x: number, y: number, z: number, parent: THREE.Group) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(x, y, z); parent.add(m); return m;
    }

    function cyl(r: number, h: number, mat: THREE.Material, x: number, y: number, z: number, parent: THREE.Group, rx = 0, rz = 0) {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 24), mat);
      m.rotation.x = rx; m.rotation.z = rz; m.position.set(x, y, z); parent.add(m); return m;
    }

    const T = 0.16;

    function buildPi() {
      const g = new THREE.Group();
      g.add(roundedPCB(8.56, 5.65, 0.4, M.pcbPi));
      [[-3.85, 2.3], [3.85, 2.3], [-3.85, -2.3], [3.85, -2.3]].forEach(([sx, sy]) => {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.08, 16, 28), M.gold);
        ring.rotation.x = Math.PI / 2; ring.position.set(sx, T + 0.01, -sy); g.add(ring);
      });
      box(5.2, 0.55, 0.55, M.black, 0.6, T + 0.28, -2.45, g);
      for (let i = 0; i < 20; i++) {
        cyl(0.035, 0.4, M.gold, -1.9 + i * 0.264, T + 0.72, -2.32, g);
        cyl(0.035, 0.4, M.gold, -1.9 + i * 0.264, T + 0.72, -2.58, g);
      }
      box(1.6, 1.3, 1.7, M.metal, 2.7, T + 0.62, -2.75, g);
      [-1.9, 0.2].forEach(sx => {
        box(1.55, 1.5, 1.75, M.metal, sx, T + 0.72, -2.75, g);
        box(1.25, 0.18, 0.12, M.blue, sx, T + 0.5, -3.62, g);
        box(1.25, 0.18, 0.12, M.blue, sx, T + 1.05, -3.62, g);
      });
      box(0.75, 0.32, 0.9, M.metalDk, -4.3, T + 0.14, 1.75, g);
      box(0.65, 0.28, 0.75, M.metalDk, -4.3, T + 0.12, 0.55, g);
      box(0.65, 0.28, 0.75, M.metalDk, -4.3, T + 0.12, -0.45, g);
      cyl(0.34, 0.7, M.black, -4.35, T + 0.32, -1.5, g, 0, Math.PI / 2);
      box(1.55, 0.14, 1.55, M.metal, 0.5, T + 0.07, 0.1, g);
      box(1.5, 0.1, 1.5, M.chip, 0.5, T + 0.02, 0.1, g);
      box(1.25, 0.12, 1.05, M.chip, 2.2, T + 0.06, -0.9, g);
      box(0.7, 0.12, 0.7, M.chip, -0.9, T + 0.06, -0.7, g);
      box(1.35, 0.12, 1.15, M.metal, -2.5, T + 0.06, 1.5, g);
      box(1.7, 0.28, 0.3, M.black, -1.2, T + 0.14, 2.1, g);
      box(1.5, 0.22, 0.18, M.tan, -1.2, T + 0.3, 2.1, g);
      box(0.3, 0.28, 1.4, M.black, 3.3, T + 0.14, 0.6, g);
      box(0.5, 0.1, 0.4, M.chip, -0.6, T + 0.05, 1.2, g);
      box(0.4, 0.1, 0.4, M.chip, 1.6, T + 0.05, 1.5, g);
      box(0.5, 0.35, 0.4, M.black, 2.6, T + 0.17, 1.9, g);
      box(1.2, 0.12, 1.1, M.metalDk, 0.4, -0.1, -2.5, g);
      box(0.12, 0.08, 0.12, M.ledG, -3.4, T + 0.04, -1.9, g);
      box(0.12, 0.08, 0.12, M.ledO, -3.1, T + 0.04, -1.9, g);
      return g;
    }

    function buildArduino() {
      const g = new THREE.Group();
      g.add(roundedPCB(6.86, 5.34, 0.35, M.pcbArdu));
      box(1.15, 1.1, 1.65, M.metal, -3.5, T + 0.5, 1.2, g);
      cyl(0.42, 0.95, M.black, -3.45, T + 0.4, -1.3, g, 0, Math.PI / 2);
      box(3.1, 0.3, 0.75, M.black, 0.4, T + 0.15, -1.9, g);
      box(2.6, 0.5, 0.45, M.black, -1.2, T + 0.25, 2.35, g);
      box(1.9, 0.5, 0.45, M.black, 1.6, T + 0.25, 2.35, g);
      box(2.6, 0.5, 0.45, M.black, -1.2, T + 0.25, -2.35, g);
      box(1.9, 0.5, 0.45, M.black, 1.6, T + 0.25, -2.35, g);
      box(0.5, 0.18, 0.28, M.metal, -2.4, T + 0.09, 0.2, g);
      box(0.4, 0.25, 0.4, M.metalDk, -2.6, T + 0.12, 1.9, g);
      box(0.5, 0.3, 0.4, M.black, 2.9, T + 0.15, -1.2, g);
      box(0.14, 0.1, 0.14, M.ledG, -1.9, T + 0.05, 1.6, g);
      box(0.14, 0.1, 0.14, M.ledO, -1.6, T + 0.05, 1.6, g);
      box(0.6, 0.3, 0.5, M.metalDk, -2.5, T + 0.15, -1.3, g);
      cyl(0.18, 0.45, M.black, -1.6, T + 0.22, -1.2, g);
      return g;
    }

    /* ---------- Módulo OLED de Datos (Alta Definición) ---------- */
    const gaugeScreenCanvas = document.createElement('canvas');
    gaugeScreenCanvas.width = 600;
    gaugeScreenCanvas.height = 324;
    const gaugeScreenCtx = gaugeScreenCanvas.getContext('2d');
    const gaugeScreenTex = new THREE.CanvasTexture(gaugeScreenCanvas);
    gaugeScreenTex.minFilter = THREE.LinearFilter;
    gaugeScreenTex.magFilter = THREE.LinearFilter;
    if ("colorSpace" in gaugeScreenTex) {
      (gaugeScreenTex as any).colorSpace = (THREE as any).SRGBColorSpace;
    }

    function drawGaugeScreen(t: number) {
      if (!gaugeScreenCtx) return;
      const w = gaugeScreenCanvas.width, h = gaugeScreenCanvas.height;
      const ctx = gaugeScreenCtx;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#03050a';
      ctx.fillRect(0, 0, w, h);

      const barColors = ['#22d3ee', '#3b82f6', '#a78bfa', '#22d3ee', '#3b82f6', '#a78bfa', '#22d3ee'];
      const n = barColors.length;
      const pad = w * 0.09;
      const usableW = w - pad * 2;
      const slot = usableW / n;
      const barW = slot * 0.6;
      const baseline = h * 0.82;
      for (let i = 0; i < n; i++) {
        const bh = (Math.sin(t * 1.7 + i * 0.8) * 0.5 + 0.5) * h * 0.56 + h * 0.07;
        const bx = pad + i * slot + (slot - barW) / 2;
        ctx.fillStyle = barColors[i];
        ctx.shadowColor = barColors[i];
        ctx.shadowBlur = 12;
        ctx.fillRect(bx, baseline - bh, barW, bh);
      }
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(148,197,255,.65)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(pad * 0.55, baseline + 3);
      ctx.lineTo(w - pad * 0.55, baseline + 3);
      ctx.stroke();

      gaugeScreenTex.needsUpdate = true;
    }
    drawGaugeScreen(0);

    function buildGauge() {
      const g = new THREE.Group();
      const W = 2.8, H = 3.0;

      g.add(roundedPCB(W, H, 0.16, M.pcbGauge));

      const screenCz = -0.34;
      const scrW = 1.9, scrH = 0.95;

      const bezelWall = 0.285;
      const bezelH = 0.22;
      const bezelBaseY = T + 0.022;
      const bezelMidY = bezelBaseY + bezelH / 2;
      const outerW = scrW + bezelWall * 2, outerH = scrH + bezelWall * 2;

      box(outerW, bezelH, bezelWall, M.bezelGauge, 0, bezelMidY, screenCz - scrH / 2 - bezelWall / 2, g);
      box(outerW, bezelH, bezelWall, M.bezelGauge, 0, bezelMidY, screenCz + scrH / 2 + bezelWall / 2, g);
      box(bezelWall, bezelH, scrH,   M.bezelGauge, -scrW / 2 - bezelWall / 2, bezelMidY, screenCz, g);
      box(bezelWall, bezelH, scrH,   M.bezelGauge,  scrW / 2 + bezelWall / 2, bezelMidY, screenCz, g);
      box(scrW, 0.02, scrH, M.screenBg, 0, bezelBaseY + 0.01, screenCz, g);

      box(outerW + 0.15, 0.03, outerH + 0.15, M.silkFrame, 0, T + 0.01, screenCz, g);

      const screenMat = new THREE.MeshBasicMaterial({ map: gaugeScreenTex, transparent: true });
      screenMat.userData.base = 1;
      const screenY = bezelBaseY + bezelH - 0.06;
      box(scrW - 0.06, 0.015, scrH - 0.06, screenMat, 0, screenY, screenCz, g);

      const connCz = screenCz + outerH / 2 + 0.1;
      box(1.05, 0.055, 0.16, M.silkFrame, 0, T + 0.05, connCz, g);
      const ribbonCz = connCz + 0.4;
      box(1.0, 0.04, 0.62, M.black, 0, T + 0.028, ribbonCz, g);
      box(0.09, 0.045, 0.62, M.tan, -0.51, T + 0.03, ribbonCz, g);
      box(0.09, 0.045, 0.62, M.tan,  0.51, T + 0.03, ribbonCz, g);

      [[-W / 2 + 0.28, -H / 2 + 0.3], [W / 2 - 0.28, -H / 2 + 0.3], [-W / 2 + 0.28, H / 2 - 0.26], [W / 2 - 0.28, H / 2 - 0.26]].forEach(([sx, sy]) => {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.032, 16, 24), M.gold);
        ring.rotation.x = Math.PI / 2; ring.position.set(sx, T + 0.02, sy); g.add(ring);
      });

      box(0.95, 0.13, 0.15, M.black, 0, T + 0.065, -H / 2 + 0.22, g);
      for (let i = 0; i < 4; i++) cyl(0.02, 0.3, M.gold, -0.33 + i * 0.22, T + 0.2, -H / 2 + 0.22, g);

      return g;
    }

    function buildEsp() {
      const g = new THREE.Group();
      g.add(roundedPCB(5.4, 2.8, 0.28, M.pcbEsp));
      box(1.9, 0.32, 2.1, M.metal, -0.8, T + 0.16, 0, g);
      for (let i = 0; i < 5; i++) box(0.06, 0.05, 0.5, M.gold, 1.9, T + 0.03, -0.9 + i * 0.22, g);
      box(0.55, 0.3, 0.75, M.metalDk, -2.75, T + 0.13, 0, g);
      box(0.35, 0.22, 0.35, M.black, -2.1, T + 0.11, 1.0, g);
      box(0.35, 0.22, 0.35, M.black, -2.1, T + 0.11, -1.0, g);
      [1.15, -1.15].forEach(sz => {
        box(4.9, 0.45, 0.28, M.black, 0, T + 0.22, sz, g);
        for (let i = 0; i < 15; i++) cyl(0.03, 0.5, M.gold, -2.2 + i * 0.315, T + 0.55, sz, g);
      });
      box(0.12, 0.08, 0.12, M.ledG, 1.5, T + 0.04, 0.6, g);
      box(0.4, 0.15, 0.4, M.black, 1.4, T + 0.07, -0.4, g);
      return g;
    }

    /* ---------- Sombra de contacto ---------- */
    const shadowTex = (() => {
      const c = document.createElement('canvas'); c.width = c.height = 512;
      const x = c.getContext('2d');
      if (!x) return new THREE.Texture();
      const gr = x.createRadialGradient(256, 256, 20, 256, 256, 240);
      gr.addColorStop(0, 'rgba(0,0,0,.5)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
      x.fillStyle = gr; x.fillRect(0, 0, 512, 512);
      return new THREE.CanvasTexture(c);
    })();
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(14, 7),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -3.4;
    scene.add(shadow);

    /* ---------- Catálogo de Hardware (0: Pi, 1: Arduino, 2: ESP32, 3: OLED) ---------- */
    const boards = [
      { id: 'pi',    g: buildPi(),      scale: 1.05, label: 'RASPBERRY PI 5<br>SoC · GPIO 40p · Edge Node' },
      { id: 'ardu',  g: buildArduino(), scale: 1.18, label: 'ARDUINO UNO<br>ATmega328 · E/S · Automatización' },
      { id: 'esp',   g: buildEsp(),     scale: 1.32, label: 'ESP32 DEVKIT<br>WiFi · BLE · Micro-eventos' },
      { id: 'gauge', g: buildGauge(),   scale: 1.62, label: 'MÓDULO OLED DE DATOS<br>I²C · Bar Graph · Métricas en vivo' },
    ];

    boards.forEach(b => {
      b.g.scale.setScalar(b.scale);
      b.g.visible = false;
      scene.add(b.g);
      b.g.traverse(o => {
        if ((o as THREE.Mesh).isMesh) {
          const mat = (o as THREE.Mesh).material as THREE.Material;
          mat.userData.base = 1;
        }
      });
    });

    // Mapeo riguroso de fases según especificación:
    // Hero -> 0 (Raspberry Pi 5) [Derecha]
    // Fase 01 (Origen) -> 1 (Arduino Uno) [Izquierda]
    // Fase 02 (Transformación / Métricas) -> 3 (Módulo OLED) [Derecha]
    // Fase 03 (Misión / IoT & Edge) -> 2 (ESP32) [Izquierda]
    const phaseBoardMap: Record<string, number> = {
      hero: 0,
      '0': 1,
      '1': 3,
      '2': 2,
    };

    // Posición horizontal en pantalla de cada fase (fracción de 0 a 1)
    const phaseSideFrac: Record<string, number> = {
      hero: 0.72,
      '0': 0.28,
      '1': 0.72,
      '2': 0.28,
    };

    let activePhase: PhaseType = 'hero';
    let localScrollProgress = 0;

    // Opacidades dinámicas para cada una de las 4 placas (Crossfade simultáneo)
    const boardWeights = [1, 0, 0, 0];
    const targetWeights = [1, 0, 0, 0];

    function setPhase(p: PhaseType, progress = 0) {
      activePhase = p;
      localScrollProgress = progress;

      for (let i = 0; i < boards.length; i++) {
        targetWeights[i] = 0;
      }

      if (p !== 'none') {
        const boardIdx = phaseBoardMap[p];
        if (boardIdx !== undefined) {
          targetWeights[boardIdx] = 1;
        }
      }

      updateHud(p);
    }

    // Escucha de evento optimizado de fase emitido desde el ScrollTrigger único
    const handlePhaseEvent = (e: Event) => {
      const custom = e as CustomEvent<{ phase: PhaseType; progress?: number }>;
      if (custom.detail) {
        setPhase(custom.detail.phase, custom.detail.progress ?? 0);
      }
    };
    window.addEventListener('3d-phase-update', handlePhaseEvent);

    let mouseX = 0, mouseY = 0, tMouseX = 0, tMouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      tMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      tMouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let viewW = 16;
    function updateViewSize() {
      const dist = camera.position.z;
      const viewH = 2 * Math.tan((camera.fov * Math.PI / 180) / 2) * dist;
      viewW = viewH * camera.aspect;
    }
    updateViewSize();
    function xFrac(f: number) { return (f - 0.5) * viewW; }

    function updateHud(phase: PhaseType) {
      const hud = document.getElementById('boardHud');
      if (!hud) return;
      if (phase === 'none' || isMobile) {
        hud.style.opacity = '0';
        return;
      }
      const boardIdx = phaseBoardMap[phase];
      if (boardIdx === undefined) {
        hud.style.opacity = '0';
        return;
      }
      const label = boards[boardIdx].label.split('<br>');
      hud.innerHTML = '<strong>' + label[0] + '</strong><br>' + label[1];
      hud.style.opacity = '1';

      // Posicionar el HUD en el lado correspondiente de la placa
      const targetSide = phaseSideFrac[phase] ?? 0.72;
      hud.classList.toggle('left', targetSide < 0.5);
    }
    updateHud('hero');

    // Mapeo de placa a su posición horizontal en pantalla (fracción 0 a 1)
    // 0: Pi (Hero) -> 0.72 (Derecha)
    // 1: Arduino (Fase 01) -> 0.28 (Izquierda)
    // 2: ESP32 (Fase 03) -> 0.28 (Izquierda)
    // 3: OLED (Fase 02) -> 0.72 (Derecha)
    const boardPositionsFrac = [0.72, 0.28, 0.28, 0.72];

    const clock = new THREE.Clock();
    let animFrameId = 0;

    function animate() {
      animFrameId = requestAnimationFrame(animate);

      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      mouseX += (tMouseX - mouseX) * 0.04;
      mouseY += (tMouseY - mouseY) * 0.04;

      // Determinar cuál es la placa activa deseada
      let targetBoardIdx = -1;
      if (activePhase !== 'none') {
        const idx = phaseBoardMap[activePhase];
        if (idx !== undefined) targetBoardIdx = idx;
      }

      // Transición secuencial estricta:
      // 1. Primero bajar rápidamente las placas salientes a 0
      let otherBoardsSum = 0;
      for (let i = 0; i < boards.length; i++) {
        if (i !== targetBoardIdx) {
          boardWeights[i] = Math.max(0, boardWeights[i] - dt * 10.0);
          otherBoardsSum += boardWeights[i];
        }
      }

      // 2. Solo cuando las anteriores estén apagadas (< 0.04), elevar la placa entrante
      if (targetBoardIdx >= 0) {
        if (otherBoardsSum < 0.04) {
          boardWeights[targetBoardIdx] = Math.min(1, boardWeights[targetBoardIdx] + dt * 8.0);
        } else {
          // Mantener en 0 mientras la otra termina de desaparecer
          boardWeights[targetBoardIdx] = Math.max(0, boardWeights[targetBoardIdx] - dt * 10.0);
        }
      }

      let totalVisibleWeight = 0;
      let dominantBoardIdx = 0;
      let maxWeight = 0;

      for (let i = 0; i < boards.length; i++) {
        totalVisibleWeight += boardWeights[i];
        if (boardWeights[i] > maxWeight) {
          maxWeight = boardWeights[i];
          dominantBoardIdx = i;
        }
      }

      // Si la escena está oculta y no hay ninguna placa visible, pausamos el render
      if (totalVisibleWeight <= 0.001 && activePhase === 'none') {
        shadow.material.opacity = 0;
        return;
      }

      const baseScale = isMobile ? 0.75 : 1.15;

      boards.forEach((b, i) => {
        const w = boardWeights[i];
        if (w <= 0.001) {
          b.g.visible = false;
          return;
        }

        // Cada placa permanece en su respectiva columna fija
        const targetFrac = isMobile ? 0.5 : boardPositionsFrac[i];
        const posX = xFrac(targetFrac);

        b.g.visible = true;
        b.g.position.x = posX;
        b.g.position.z = (1 - w) * -0.8;
        b.g.position.y = Math.sin(t * 0.6 + i) * 0.08 - (1 - w) * 0.12;
        b.g.scale.setScalar(b.scale * baseScale);

        const idle = reduceMotion ? 0 : t * 0.12;
        const progressRot = localScrollProgress * Math.PI * 0.4;
        b.g.rotation.y = idle + i * 1.4 + progressRot;
        b.g.rotation.x = 0.42 + Math.sin(localScrollProgress * Math.PI * 2) * 0.06;

        if (i === 3 && !reduceMotion) {
          drawGaugeScreen(t);
        }

        // Aplicar opacidad exacta a todos los materiales de la placa
        b.g.traverse(o => {
          if ((o as THREE.Mesh).isMesh) {
            const mesh = o as THREE.Mesh;
            const mat = mesh.material as THREE.Material;
            mat.transparent = true;
            mat.opacity = w * (mat.userData.base ?? 1);
          }
        });
      });

      // Actualizar sombra según la placa activa
      const dominantFrac = isMobile ? 0.5 : boardPositionsFrac[dominantBoardIdx];
      shadow.material.opacity = maxWeight * 0.75;
      shadow.position.x = xFrac(dominantFrac);

      camera.position.x += (mouseX * 0.4 - camera.position.x) * 0.03;
      camera.position.y += (1.4 - mouseY * 0.25 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      isMobile = window.innerWidth <= 768;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.position.set(0, 1.4, isMobile ? 15 : 12);
      camera.updateProjectionMatrix();

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateViewSize();
      updateHud(activePhase);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('3d-phase-update', handlePhaseEvent);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      boards.forEach(b => {
        b.g.traverse(o => {
          if ((o as THREE.Mesh).isMesh) {
            const mesh = o as THREE.Mesh;
            mesh.geometry.dispose();
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach(m => m.dispose());
            } else {
              mesh.material.dispose();
            }
          }
        });
      });
      shadow.geometry.dispose();
      (shadow.material as THREE.Material).dispose();
      shadowTex.dispose();
      gaugeScreenTex.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="hero-canvas" />;
}

