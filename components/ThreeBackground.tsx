"use client";

import ThreeScene from "./ThreeScene";

export default function ThreeBackground() {
  return (
    <>
      <div className="dot-grid" />
      <div className="stage-glow" />
      <div className="scene-wrapper">
        <ThreeScene />
      </div>
      <div className="vignette" />
      <div className="noise" />
    </>
  );
}
