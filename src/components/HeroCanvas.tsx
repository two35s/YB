"use client";

import { useEffect, useRef } from "react";

/** Dot grid that ignites lime around the cursor (auto-drifts on touch). */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const fine = matchMedia("(pointer: fine)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const GAP = 42;
    let dots: { x: number; y: number }[] = [];
    let mx = -9e3,
      my = -9e3,
      t = 0,
      raf = 0;

    const size = () => {
      cv.width = cv.offsetWidth * devicePixelRatio;
      cv.height = cv.offsetHeight * devicePixelRatio;
      dots = [];
      for (let x = GAP; x < cv.offsetWidth; x += GAP)
        for (let y = GAP; y < cv.offsetHeight; y += GAP) dots.push({ x, y });
    };
    const onMove = (e: MouseEvent) => {
      const b = cv.getBoundingClientRect();
      mx = e.clientX - b.left;
      my = e.clientY - b.top;
    };
    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);
      t += 0.012;
      const ax = fine
        ? mx
        : cv.offsetWidth / 2 + Math.cos(t) * cv.offsetWidth * 0.3;
      const ay = fine
        ? my
        : cv.offsetHeight / 2 + Math.sin(t * 1.3) * cv.offsetHeight * 0.25;
      for (const d of dots) {
        const g = Math.max(0, 1 - Math.hypot(d.x - ax, d.y - ay) / 260);
        if (g > 0.02) {
          ctx.fillStyle = `rgba(213,244,69,${(g * g * 0.9).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(d.x, d.y, 1.4 + g * 1.8, 0, 7);
          ctx.fill();
        } else {
          ctx.fillStyle = "rgba(255,255,255,.05)";
          ctx.fillRect(d.x, d.y, 1.6, 1.6);
        }
      }
      ctx.restore();
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    size();
    draw();
    addEventListener("resize", size);
    addEventListener("mousemove", onMove);
    return () => {
      removeEventListener("resize", size);
      removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}
