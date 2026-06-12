"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { socials } from "@/data/site";

type Status = "idle" | "sending" | "success" | "error";

const PROJECT_TYPES = [
  "Website / Web app",
  "Security audit",
  "Custom system",
  "Branding / UI",
  "Something else",
];

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [bad, setBad] = useState<Record<string, boolean>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >;

    const errors = {
      name: data.name.trim().length < 2,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()),
      message: data.message.trim().length < 6,
    };
    setBad(errors);
    if (Object.values(errors).some(Boolean)) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      style={{ background: "#050505", borderTop: "1px solid var(--line)" }}
    >
      <div className="wrap">
        <Reveal>
          <div className="lab">04 — Contact</div>
          <h2 className="contact-h">
            Let&apos;s build
            <br />
            something<span className="dot">.</span>
          </h2>
        </Reveal>
        <div className="cgrid">
          <Reveal>
            {status === "success" ? (
              <div className="form-ok" role="status">
                <b>
                  Received<span className="dot">.</span>
                </b>
                <p>Y/B will get back to you within 24h. Probably faster.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className={`row ${bad.name ? "bad" : ""}`}>
                  <label htmlFor="f-name">Name</label>
                  <input id="f-name" name="name" type="text" autoComplete="name" />
                  <div className="err">Tell us who you are.</div>
                </div>
                <div className={`row ${bad.email ? "bad" : ""}`}>
                  <label htmlFor="f-email">Email</label>
                  {/* extensions (temp-mail etc.) inject attributes here pre-hydration */}
                  <input
                    id="f-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    suppressHydrationWarning
                  />
                  <div className="err">That email doesn&apos;t look right.</div>
                </div>
                <div className="row">
                  <label htmlFor="f-type">Project type</label>
                  <select id="f-type" name="projectType" defaultValue={PROJECT_TYPES[0]}>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className={`row ${bad.message ? "bad" : ""}`}>
                  <label htmlFor="f-msg">Message</label>
                  <textarea id="f-msg" name="message" />
                  <div className="err">A few words about the project helps.</div>
                </div>
                {/* honeypot — bots fill it, humans never see it */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", height: 0 }}
                />
                <button
                  className="btn solid"
                  type="submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending…" : "Send it →"}
                </button>
                {status === "error" && (
                  <p className="form-fail" role="alert">
                    Something broke on our side — email us directly instead.
                  </p>
                )}
              </form>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <div className="soc">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {s.label} <span>{s.mark}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
