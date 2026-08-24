"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type PhaseType = 'hero' | '0' | '1' | '2' | 'none';

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    // Soporte para máxima resolución de densidad de píxeles (pantallas Retina / 2K / 4K)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 3));
    renderer.setSize(window.innerWidth, window.innerHeight);

    if ("outputColorSpace" in renderer) {
      (renderer as any).outputColorSpace = (THREE as any).SRGBColorSpace;
    } else if ("outputEncoding" in renderer) {
      (renderer as any).outputEncoding = (THREE as any).sRGBEncoding;
    }

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 100);
    camera.position.set(0, 1.4, isMobile ? 15 : 12);

    /* ---------- Iluminación de estudio ---------- */
    scene.add(new THREE.AmbientLight(0xB8C4D6, .38));
    const key = new THREE.DirectionalLight(0xFFFFFF, 1.05); key.position.set(6, 9, 7); scene.add(key);
    const fill = new THREE.DirectionalLight(0x8FA3BF, .3); fill.position.set(-7, 2, 4); scene.add(fill);
    const rim = new THREE.DirectionalLight(0x3B82F6, .32); rim.position.set(-4, 6, -8); scene.add(rim);

    /* ---------- Materiales base (colores reales de hardware) ---------- */
    const M = {
      pcbPi:   new THREE.MeshStandardMaterial({ color: 0x0F8A34, roughness: .5,  metalness: .15, transparent: true }),
      pcbArdu: new THREE.MeshStandardMaterial({ color: 0x0B7279, roughness: .55, metalness: .15, transparent: true }),
      pcbEsp:  new THREE.MeshStandardMaterial({ color: 0x12355B, roughness: .5,  metalness: .2,  transparent: true }),
      metal:   new THREE.MeshStandardMaterial({ color: 0xC9CED6, roughness: .32, metalness: .92, transparent: true }),
      metalDk: new THREE.MeshStandardMaterial({ color: 0x8A919C, roughness: .42, metalness: .85, transparent: true }),
      black:   new THREE.MeshStandardMaterial({ color: 0x171A1F, roughness: .6,  metalness: .25, transparent: true }),
      chip:    new THREE.MeshStandardMaterial({ color: 0x23262B, roughness: .45, metalness: .4,  transparent: true }),
      gold:    new THREE.MeshStandardMaterial({ color: 0xD2A24C, roughness: .28, metalness: 1,   transparent: true }),
      blue:    new THREE.MeshStandardMaterial({ color: 0x1D4ED8, roughness: .5,  metalness: .3,  transparent: true }),
      tan:     new THREE.MeshStandardMaterial({ color: 0xC89B6A, roughness: .6,  metalness: .1,  transparent: true }),
      ledG:    new THREE.MeshStandardMaterial({ color: 0x10B981, roughness: .3,  metalness: .2,  emissive: new THREE.Color(0x10B981), emissiveIntensity: .7, transparent: true }),
      ledO:    new THREE.MeshStandardMaterial({ color: 0xF97316, roughness: .3,  metalness: .2,  emissive: new THREE.Color(0xF97316), emissiveIntensity: .6, transparent: true }),
      // módulo OLED de datos
      pcbGauge:    new THREE.MeshStandardMaterial({ color: 0x0c56d6, roughness: .55, metalness: .08,  transparent: true }),
      silkFrame:   new THREE.MeshStandardMaterial({ color: 0xeef1f6, roughness: .55, metalness: .05, transparent: true }),
      bezelGauge:  new THREE.MeshStandardMaterial({ color: 0x0b0d10, roughness: .5,  metalness: .3,  transparent: true }),
      screenBg:    new THREE.MeshStandardMaterial({ color: 0x030509, roughness: .7, metalness: 0, emissive: new THREE.Color(0x050912), emissiveIntensity: .3, transparent: true }),
      barBlue:     new THREE.MeshStandardMaterial({ color: 0x2f6fe0, roughness: .35, metalness: 0, emissive: new THREE.Color(0x3b82f6), emissiveIntensity: .85, transparent: true }),
      barCyan:     new THREE.MeshStandardMaterial({ color: 0x17b8d6, roughness: .35, metalness: 0, emissive: new THREE.Color(0x22d3ee), emissiveIntensity: .85, transparent: true }),
      barViolet:   new THREE.MeshStandardMaterial({ color: 0x8b6ef0, roughness: .35, metalness: 0, emissive: new THREE.Color(0xa78bfa), emissiveIntensity: .8, transparent: true }),
    };

    function roundedPCB(w: number, h: number, r: number, mat: THREE.Material, t = .16) {
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

    const T = .16;

    function buildPi() {
      const g = new THREE.Group();
      g.add(roundedPCB(8.56, 5.65, .4, M.pcbPi));
      [[-3.85, 2.3], [3.85, 2.3], [-3.85, -2.3], [3.85, -2.3]].forEach(([sx, sy]) => {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(.26, .08, 16, 28), M.gold);
        ring.rotation.x = Math.PI / 2; ring.position.set(sx, T + .01, -sy); g.add(ring);
      });
      box(5.2, .55, .55, M.black, .6, T + .28, -2.45, g);
      for (let i = 0; i < 20; i++) {
        cyl(.035, .4, M.gold, -1.9 + i * .264, T + .72, -2.32, g);
        cyl(.035, .4, M.gold, -1.9 + i * .264, T + .72, -2.58, g);
      }
      box(1.6, 1.3, 1.7, M.metal, 2.7, T + .62, -2.75, g);
      [-1.9, .2].forEach(sx => {
        box(1.55, 1.5, 1.75, M.metal, sx, T + .72, -2.75, g);
        box(1.25, .18, .12, M.blue, sx, T + .5, -3.62, g);
        box(1.25, .18, .12, M.blue, sx, T + 1.05, -3.62, g);
      });
      box(.75, .32, .9, M.metalDk, -4.3, T + .14, 1.75, g);
      box(.65, .28, .75, M.metalDk, -4.3, T + .12, .55, g);
      box(.65, .28, .75, M.metalDk, -4.3, T + .12, -.45, g);
      cyl(.34, .7, M.black, -4.35, T + .32, -1.5, g, 0, Math.PI / 2);
      box(1.55, .14, 1.55, M.metal, .5, T + .07, .1, g);
      box(1.5, .1, 1.5, M.chip, .5, T + .02, .1, g);
      box(1.25, .12, 1.05, M.chip, 2.2, T + .06, -.9, g);
      box(.7, .12, .7, M.chip, -.9, T + .06, -.7, g);
      box(1.35, .12, 1.15, M.metal, -2.5, T + .06, 1.5, g);
      box(1.7, .28, .3, M.black, -1.2, T + .14, 2.1, g);
      box(1.5, .22, .18, M.tan, -1.2, T + .3, 2.1, g);
      box(.3, .28, 1.4, M.black, 3.3, T + .14, .6, g);
      box(.5, .1, .4, M.chip, -.6, T + .05, 1.2, g);
      box(.4, .1, .4, M.chip, 1.6, T + .05, 1.5, g);
      box(.5, .35, .4, M.black, 2.6, T + .17, 1.9, g);
      box(1.2, .12, 1.1, M.metalDk, .4, -.1, -2.5, g);
      box(.12, .08, .12, M.ledG, -3.4, T + .04, -1.9, g);
      box(.12, .08, .12, M.ledO, -3.1, T + .04, -1.9, g);
      return g;
    }

    function buildArduino() {
      const g = new THREE.Group();
      g.add(roundedPCB(6.86, 5.34, .35, M.pcbArdu));
      box(1.15, 1.1, 1.65, M.metal, -3.5, T + .5, 1.2, g);
      cyl(.42, .95, M.black, -3.45, T + .4, -1.3, g, 0, Math.PI / 2);
      box(3.1, .3, .75, M.black, .4, T + .15, -1.9, g);
      box(2.6, .5, .45, M.black, -1.2, T + .25, 2.35, g);
      box(1.9, .5, .45, M.black, 1.6, T + .25, 2.35, g);
      box(2.6, .5, .45, M.black, -1.2, T + .25, -2.35, g);
      box(1.9, .5, .45, M.black, 1.6, T + .25, -2.35, g);
      box(.5, .18, .28, M.metal, -2.4, T + .09, .2, g);
      box(.4, .25, .4, M.metalDk, -2.6, T + .12, 1.9, g);
      box(.5, .3, .4, M.black, 2.9, T + .15, -1.2, g);
      box(.14, .1, .14, M.ledG, -1.9, T + .05, 1.6, g);
      box(.14, .1, .14, M.ledO, -1.6, T + .05, 1.6, g);
      box(.6, .3, .5, M.metalDk, -2.5, T + .15, -1.3, g);
      cyl(.18, .45, M.black, -1.6, T + .22, -1.2, g);
      return g;
    }

    /* ---------- Módulo OLED de Datos (Alta Definición) ---------- */
    const gaugeScreenCanvas = document.createElement('canvas');
    gaugeScreenCanvas.width = 600; gaugeScreenCanvas.height = 324;
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
      ctx.beginPath(); ctx.moveTo(pad * 0.55, baseline + 3); ctx.lineTo(w - pad * 0.55, baseline + 3); ctx.stroke();

      gaugeScreenTex.needsUpdate = true;
    }
    drawGaugeScreen(0);

    function buildGauge() {
      const g = new THREE.Group();
      const W = 2.8, H = 3.0;

      g.add(roundedPCB(W, H, .16, M.pcbGauge));

      const screenCz = -0.34;
      const scrW = 1.9, scrH = 0.95;

      const bezelWall = 0.285;
      const bezelH = 0.22;
      const bezelBaseY = T + .022;
      const bezelMidY = bezelBaseY + bezelH / 2;
      const outerW = scrW + bezelWall * 2, outerH = scrH + bezelWall * 2;

      box(outerW, bezelH, bezelWall, M.bezelGauge, 0, bezelMidY, screenCz - scrH / 2 - bezelWall / 2, g);
      box(outerW, bezelH, bezelWall, M.bezelGauge, 0, bezelMidY, screenCz + scrH / 2 + bezelWall / 2, g);
      box(bezelWall, bezelH, scrH,   M.bezelGauge, -scrW / 2 - bezelWall / 2, bezelMidY, screenCz, g);
      box(bezelWall, bezelH, scrH,   M.bezelGauge,  scrW / 2 + bezelWall / 2, bezelMidY, screenCz, g);
      box(scrW, .02, scrH, M.screenBg, 0, bezelBaseY + .01, screenCz, g);

      box(outerW + .15, .03, outerH + .15, M.silkFrame, 0, T + .01, screenCz, g);

      const screenMat = new THREE.MeshBasicMaterial({ map: gaugeScreenTex, transparent: true });
      screenMat.userData.base = 1;
      const screenY = bezelBaseY + bezelH - .06;
      box(scrW - .06, .015, scrH - .06, screenMat, 0, screenY, screenCz, g);

      const connCz = screenCz + outerH / 2 + .1;
      box(1.05, .055, .16, M.silkFrame, 0, T + .05, connCz, g);
      const ribbonCz = connCz + .4;
      box(1.0, .04, .62, M.black, 0, T + .028, ribbonCz, g);
      box(.09, .045, .62, M.tan, -.51, T + .03, ribbonCz, g);
      box(.09, .045, .62, M.tan,  .51, T + .03, ribbonCz, g);

      [[-W / 2 + .28, -H / 2 + .3], [W / 2 - .28, -H / 2 + .3], [-W / 2 + .28, H / 2 - .26], [W / 2 - .28, H / 2 - .26]].forEach(([sx, sy]) => {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(.1, .032, 16, 24), M.gold);
        ring.rotation.x = Math.PI / 2; ring.position.set(sx, T + .02, sy); g.add(ring);
      });

      box(.95, .13, .15, M.black, 0, T + .065, -H / 2 + .22, g);
      for (let i = 0; i < 4; i++) cyl(.02, .3, M.gold, -.33 + i * .22, T + .2, -H / 2 + .22, g);

      return g;
    }

    function buildEsp() {
      const g = new THREE.Group();
      g.add(roundedPCB(5.4, 2.8, .28, M.pcbEsp));
      box(1.9, .32, 2.1, M.metal, -.8, T + .16, 0, g);
      for (let i = 0; i < 5; i++) box(.06, .05, .5, M.gold, 1.9, T + .03, -.9 + i * .22, g);
      box(.55, .3, .75, M.metalDk, -2.75, T + .13, 0, g);
      box(.35, .22, .35, M.black, -2.1, T + .11, 1.0, g);
      box(.35, .22, .35, M.black, -2.1, T + .11, -1.0, g);
      [1.15, -1.15].forEach(sz => {
        box(4.9, .45, .28, M.black, 0, T + .22, sz, g);
        for (let i = 0; i < 15; i++) cyl(.03, .5, M.gold, -2.2 + i * .315, T + .55, sz, g);
      });
      box(.12, .08, .12, M.ledG, 1.5, T + .04, .6, g);
      box(.4, .15, .4, M.black, 1.4, T + .07, -.4, g);
      return g;
    }

    /* ---------- Sombra de contacto de alta resolución ---------- */
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
    shadow.rotation.x = -Math.PI / 2; shadow.position.y = -3.4; scene.add(shadow);

    /* ---------- Ensamblaje: una placa a la vez ---------- */
    const boards = [
      { g: buildPi(),      scale: 1,    footprint: 0, label: 'RASPBERRY PI 5<br>SoC · GPIO 40p · Edge Node' },
      { g: buildArduino(), scale: 1.12, footprint: 0, label: 'ARDUINO UNO<br>ATmega328 · E/S · Automatización' },
      { g: buildEsp(),     scale: 1.25, footprint: 0, label: 'ESP32 DEVKIT<br>WiFi · BLE · Micro-eventos' },
      { g: buildGauge(),   scale: 1.55, footprint: 0, label: 'MÓDULO OLED DE DATOS<br>I²C · Bar Graph · Métricas en vivo' },
    ];
    boards.forEach(b => {
      b.g.scale.setScalar(b.scale); scene.add(b.g);
      b.g.traverse(o => {
        if ((o as THREE.Mesh).isMesh) {
          const mat = (o as THREE.Mesh).material as THREE.Material;
          mat.userData.base = 1;
        }
      });
      const box3 = new THREE.Box3().setFromObject(b.g);
      const sx = box3.max.x - box3.min.x, sz = box3.max.z - box3.min.z;
      b.footprint = Math.sqrt(sx * sx + sz * sz);
    });

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

    const phaseBoard: Record<string, number> = { hero: 0, '0': 3, '1': 1, '2': 2 };
    const phaseRestFr: Record<string, number> = { hero: 0.72, '0': 0.74, '1': 0.26, '2': 0.74 };
    const phaseEntryFr: Record<string, number> = { hero: 1.05, '0': 1.05, '1': -0.05, '2': 1.05 };
    const phaseSide: Record<string, number> = { hero: 1, '0': 1, '1': -1, '2': 1 };

    function safeScaleFor(board: typeof boards[0], restFrac: number, aestheticCap: number) {
      const edgeFrac = restFrac >= 0.5 ? 1 : 0;
      const availableWorld = Math.abs(xFrac(edgeFrac) - xFrac(restFrac)) * 0.88;
      const wobbleFactor = 1.15;
      const raw = availableWorld / (board.footprint * 0.5 * wobbleFactor);
      return THREE.MathUtils.clamp(raw, 0.70, aestheticCap);
    }

    function narrowT() {
      return THREE.MathUtils.clamp((window.innerWidth - 480) / (1200 - 480), 0, 1);
    }
    function responsiveScale() { return THREE.MathUtils.lerp(0.85, 1, narrowT()); }
    function responsiveFrac(targetFrac: number) { return THREE.MathUtils.lerp(0.5, targetFrac, narrowT()); }

    function computePhase(): PhaseType {
      const heroEl = document.getElementById('hero');
      const journeyEls = document.querySelectorAll('.journey');
      const vh = window.innerHeight;
      const cy = window.scrollY + vh / 2;
      const heroBottom = (heroEl ? heroEl.getBoundingClientRect().bottom : 0) + window.scrollY;
      if (cy < heroBottom) return 'hero';
      for (let i = 0; i < journeyEls.length; i++) {
        const r = journeyEls[i].getBoundingClientRect();
        const top = r.top + window.scrollY, bot = r.bottom + window.scrollY;
        if (cy >= top && cy <= bot) return String(i) as PhaseType;
      }
      return 'none';
    }

    function localProgress(phase: PhaseType) {
      const vh = window.innerHeight;
      if (phase === 'hero') {
        const heroEl = document.getElementById('hero');
        if (!heroEl) return 0;
        const r = heroEl.getBoundingClientRect();
        return THREE.MathUtils.clamp((0 - r.top) / Math.max(r.height, 1), 0, 1);
      }
      if (phase === 'none') return 0;
      const idx = parseInt(phase, 10);
      const journeyEls = document.querySelectorAll('.journey');
      if (isNaN(idx) || !journeyEls[idx]) return 0;
      const r = journeyEls[idx].getBoundingClientRect();
      return THREE.MathUtils.clamp((vh / 2 - r.top) / Math.max(r.height, 1), 0, 1);
    }

    let shownPhase: PhaseType = 'hero';
    let targetPhase: PhaseType = 'hero';
    let opacity = 1;
    const FADE_SPEED = 2.8;

    const _clampBox3 = new THREE.Box3();
    const _clampVec = new THREE.Vector3();
    const CLAMP_MARGIN_PX = 26;

    function clampToScreen(b: typeof boards[0]) {
      const box3 = _clampBox3.setFromObject(b.g);
      let minX = Infinity, maxX = -Infinity;
      for (let i = 0; i < 8; i++) {
        _clampVec.set(
          (i & 1) ? box3.max.x : box3.min.x,
          (i & 2) ? box3.max.y : box3.min.y,
          (i & 4) ? box3.max.z : box3.min.z
        );
        _clampVec.project(camera);
        const sx = (_clampVec.x * 0.5 + 0.5) * window.innerWidth;
        if (sx < minX) minX = sx;
        if (sx > maxX) maxX = sx;
      }
      const w = window.innerWidth;
      const overflow = Math.max(CLAMP_MARGIN_PX - minX, maxX - (w - CLAMP_MARGIN_PX), 0);
      if (overflow > 0) {
        const widthPx = Math.max(maxX - minX, 1);
        const shrink = Math.max(0.22, (widthPx - overflow * 2) / widthPx);
        b.g.scale.multiplyScalar(shrink);
      }
    }

    function updateHud(phase: PhaseType) {
      const hud = document.getElementById('boardHud');
      if (!hud) return;
      if (phase === 'none') {
        hud.style.opacity = '0';
        return;
      }
      const boardIdx = phaseBoard[phase];
      if (boardIdx === undefined) return;
      const label = boards[boardIdx].label.split('<br>');
      hud.innerHTML = '<strong>' + label[0] + '</strong><br>' + label[1];
      hud.style.opacity = '1';
      hud.classList.toggle('left', (phaseSide[phase] ?? 1) < 0);
    }
    updateHud(shownPhase);

    const clock = new THREE.Clock();
    let animFrameId = 0;

    function animate() {
      animFrameId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), .05);
      const t = clock.elapsedTime;

      mouseX += (tMouseX - mouseX) * 0.03;
      mouseY += (tMouseY - mouseY) * 0.03;

      targetPhase = computePhase();

      if (targetPhase !== shownPhase) {
        opacity = Math.max(0, opacity - dt * FADE_SPEED);
        if (opacity <= 0) {
          shownPhase = targetPhase;
          updateHud(shownPhase);
        }
      } else {
        opacity = Math.min(1, opacity + dt * FADE_SPEED);
      }

      boards.forEach(b => { b.g.visible = false; });

      if (shownPhase !== 'none' && opacity > 0.001) {
        const idx = phaseBoard[shownPhase];
        if (idx !== undefined) {
          const b = boards[idx];
          const e = opacity * opacity * (3 - 2 * opacity);

          const restFrac = responsiveFrac(phaseRestFr[shownPhase] ?? 0.5);
          const restX  = xFrac(restFrac);
          const entryX = xFrac(responsiveFrac(phaseEntryFr[shownPhase] ?? 0.5));
          const sc = safeScaleFor(b, restFrac, shownPhase === 'hero' ? 1.15 : 1.05) * responsiveScale();

          b.g.visible = true;
          b.g.position.x = entryX + (restX - entryX) * e;
          b.g.position.z = (1 - e) * -1.2;
          b.g.position.y = Math.sin(t * 0.5) * 0.08 - (1 - e) * 0.15;
          b.g.scale.setScalar(b.scale * sc);

          const idle = reduceMotion ? 0 : t * 0.12;
          const lp = localProgress(shownPhase);
          b.g.rotation.y = idle + idx * 1.3 + lp * Math.PI * 0.55;
          b.g.rotation.x = 0.42 + Math.sin(lp * Math.PI * 2) * 0.06;

          clampToScreen(b);

          if (idx === 3 && !reduceMotion) {
            drawGaugeScreen(t);
          }

          b.g.traverse(o => {
            if ((o as THREE.Mesh).isMesh) {
              const mesh = o as THREE.Mesh;
              const mat = mesh.material as THREE.Material;
              mat.transparent = true;
              mat.opacity = e * (mat.userData.base ?? 1);
            }
          });

          shadow.material.opacity = e * .78;
          shadow.position.x = b.g.position.x;
        }
      } else {
        shadow.material.opacity = 0;
      }

      camera.position.x += (mouseX * .5 - camera.position.x) * .02;
      camera.position.y += (1.4 - mouseY * .3 - camera.position.y) * .02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 3));
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateViewSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
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
