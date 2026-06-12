"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/data/site";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = scrollY;
      setHidden(y > lastY && y > 300);
      lastY = y;
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("menu-open");
      removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav className={`nav ${hidden && !open ? "hide" : ""}`}>
        <Link className="logo" href="/" aria-label="Y/B home">
          B<span className="dot">.</span>
        </Link>
        <div className="nl">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <button
          className="burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mob-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 52px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 52px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 52px) 36px)" }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.3, 1] }}
          >
            {navLinks.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
              >
                <Link href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                  <span className="dot">.</span>
                </Link>
              </motion.div>
            ))}
            <div className="mm-foot">Y/B — BUILT &amp; SECURED</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
