import Link from "next/link";
import { navLinks, site } from "@/data/site";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fmark">
          Y/B<span className="dot">.</span>
        </div>
        <div className="frow">
          <div>
            © {new Date().getFullYear()} {site.owner} — Built &amp; secured by{" "}
            {site.name}
          </div>
          <div className="flinks">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="hint">
            psst — press <kbd>/</kbd>
          </div>
        </div>
      </div>
    </footer>
  );
}
