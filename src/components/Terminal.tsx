"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

interface Line {
  prefix: string;
  text: string;
  html?: string;
}

const SCRIPT: Line[] = [
  { prefix: "yb@core:~$ ", text: "./audit.sh --target visitor --deep" },
  {
    prefix: "",
    text: "[+] resolving identity ............ anonymous",
    html: "[+] resolving identity ............ <b>anonymous</b>",
  },
  {
    prefix: "",
    text: "[+] scanning intent ............... curiosity detected",
    html: "[+] scanning intent ............... <b>curiosity detected</b>",
  },
  {
    prefix: "",
    text: "[+] checking taste ................ EXCELLENT",
    html: '[+] checking taste ................ <span class="ok">EXCELLENT</span>',
  },
  { prefix: "", text: "[+] vulnerability found ........... you need a website" },
  {
    prefix: "",
    text: "[+] recommended patch ............. hire Y/B",
    html: '[+] recommended patch ............. <span class="ok">hire Y/B</span>',
  },
  { prefix: "yb@core:~$ ", text: "exit 0   # status: SECURE" },
];

/** Hidden terminal — opens on "/" anywhere outside a form field. */
export default function Terminal() {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName ?? "").toUpperCase();
      if (e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(tag)) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    addEventListener("keydown", onKey);
    console.log(
      "%cY/B%c — built & secured.\n%cYou opened the console. We like you already → " +
        site.email,
      "font:900 32px sans-serif;color:#D5F445",
      "font:700 32px sans-serif;color:#fff",
      "color:#9a9a9a;font:12px monospace"
    );
    return () => removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const el = bodyRef.current!;
    el.innerHTML = "";
    let li = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const nextLine = () => {
      if (li >= SCRIPT.length) {
        el.insertAdjacentHTML(
          "beforeend",
          '<div class="ln">yb@core:~$ <span class="caret"></span></div>'
        );
        return;
      }
      const { prefix, text, html } = SCRIPT[li++];
      const div = document.createElement("div");
      div.className = "ln";
      el.appendChild(div);
      let i = 0;
      const type = () => {
        i++;
        div.innerHTML = prefix + text.slice(0, i) + '<span class="caret"></span>';
        if (i < text.length) timers.push(setTimeout(type, prefix ? 34 : 10));
        else {
          div.innerHTML = prefix + (html ?? text);
          timers.push(setTimeout(nextLine, 240));
        }
      };
      type();
    };
    nextLine();
    return () => timers.forEach(clearTimeout);
  }, [open]);

  if (!open) return null;
  return (
    <div
      className="term"
      role="dialog"
      aria-label="Y/B terminal"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      <div className="tbox">
        <div className="tbar">
          <i />
          <i />
          <i />
          &nbsp; yb@core — audit.sh &nbsp;·&nbsp; esc to close
        </div>
        <div className="tbody" ref={bodyRef} />
      </div>
    </div>
  );
}
