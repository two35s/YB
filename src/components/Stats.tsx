"use client";

import { useEffect, useRef } from "react";
import { stats } from "@/data/site";

/** Stats row — numbers count up when scrolled into view. */
export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = ref.current!.querySelectorAll<HTMLElement>("b[data-n]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          const el = e.target as HTMLElement;
          const n = Number(el.dataset.n);
          const t0 = performance.now();
          const step = (now: number) => {
            const p = Math.min(1, (now - t0) / 1400);
            const ease = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(n * ease) + (p === 1 ? "+" : "");
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }),
      { threshold: 0.6 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="stats" ref={ref}>
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <b data-n={s.value}>0</b>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
