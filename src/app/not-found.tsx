import Link from "next/link";

export default function NotFound() {
  return (
    <section className="nf">
      <h1>
        404<span className="dot">.</span>
      </h1>
      <p>THIS ROUTE DOES NOT RESOLVE — BUT IT IS SECURE.</p>
      <Link className="btn solid" href="/">
        Back home →
      </Link>
    </section>
  );
}
