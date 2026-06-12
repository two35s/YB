import { marqueeWords } from "@/data/site";

export default function Marquee() {
  const words = [...marqueeWords, ...marqueeWords];
  return (
    <div className="marq" aria-hidden="true">
      <div className="marq-in">
        {words.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
    </div>
  );
}
