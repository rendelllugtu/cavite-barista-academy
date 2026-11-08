import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { SITE } from "../config.js";

function Layer({ progress, from, to, spin = 0, className, children }) {
  const y = useTransform(progress, [0, 1], [from, to]);
  const rotate = useTransform(progress, [0, 1], [0, spin]);
  return <motion.div className={`layer ${className}`} style={{ y, rotate }}>{children}</motion.div>;
}

const Bean = ({ size = 40 }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 40 56" aria-hidden="true">
    <ellipse cx="20" cy="28" rx="18" ry="26" fill="#3a2216" />
    <path d="M20 4 C 8 20, 32 36, 20 52" stroke="#1F3B2D" strokeWidth="3" fill="none" />
  </svg>
);

// Top-down flat white with a tulip pour.
const Cup = () => (
  <svg viewBox="0 0 400 400" aria-hidden="true">
    <rect x="335" y="185" width="58" height="30" rx="15" fill="#F1F3EF" />
    <circle cx="200" cy="200" r="192" fill="#2d5642" />
    <circle cx="200" cy="200" r="152" fill="#F1F3EF" />
    <circle cx="200" cy="200" r="130" fill="#3a2216" />
    <circle cx="200" cy="200" r="120" fill="#B9854F" />
    <ellipse cx="200" cy="232" rx="64" ry="26" fill="#F1F3EF" />
    <ellipse cx="200" cy="196" rx="50" ry="22" fill="#F1F3EF" />
    <ellipse cx="200" cy="164" rx="36" ry="17" fill="#F1F3EF" />
    <path d="M200 140 L200 262" stroke="#B9854F" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const k = reduce ? 0 : 1;

  return (
    <section className="hero" ref={ref}>
      <Layer progress={scrollYProgress} from={0} to={120 * k} spin={30 * k} className="cup"><Cup /></Layer>
      <Layer progress={scrollYProgress} from={0} to={-260 * k} spin={90 * k} className="bean b1"><Bean size={46} /></Layer>
      <Layer progress={scrollYProgress} from={0} to={-420 * k} spin={-60 * k} className="bean b2"><Bean size={30} /></Layer>
      <Layer progress={scrollYProgress} from={0} to={-180 * k} spin={45 * k} className="bean b3"><Bean size={60} /></Layer>
      <Layer progress={scrollYProgress} from={0} to={200 * k} className="hero-copy">
        <h1>Cavite Barista Academy</h1>
        <p>Hands-on barista training. Learn to pull the shot, steam the milk, and run the bar. Your certificate can be verified by any employer, online.</p>
        <div className="row">
          <a className="btn" href={SITE.formUrl} target="_blank" rel="noreferrer">Register for the next batch</a>
          <a className="btn ghost" href="/verify">Verify a certificate</a>
        </div>
      </Layer>
    </section>
  );
}
