"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { categories, projects, type ProjectCategory } from "@/data/projects";

export default function Work() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const visible =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="work"
      style={{
        background: "#050505",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="wrap">
        <Reveal>
          <div className="lab">02 — Selected work</div>
          <h2 className="h2">
            Projects<span className="dot">.</span>
          </h2>
        </Reveal>
        <Reveal>
          <div className="filters" role="group" aria-label="Filter projects">
            {categories.map((c) => (
              <button
                key={c.id}
                className={`fbtn ${filter === c.id ? "on" : ""}`}
                onClick={() => setFilter(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Reveal>
        <motion.div className="wgrid" layout>
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              >
                <Link className="proj" href={`/work/${p.slug}`}>
                  <div className="cover">
                    <b>{String(i + 1).padStart(2, "0")}</b>
                    <span className="case">View case study →</span>
                  </div>
                  <div className="pmeta">
                    <h3>
                      {p.title} <span>{p.year}</span>
                    </h3>
                    <div className="tags">
                      {p.tags.map((t) => (
                        <em key={t}>{t}</em>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
