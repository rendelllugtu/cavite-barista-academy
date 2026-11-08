import Hero from "../components/Hero.jsx";
import { PROGRAMS, STEPS, SITE } from "../config.js";

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="section" id="programs">
        <h2>Programs</h2>
        {PROGRAMS.map((p) => (
          <article className="program" key={p.name}>
            <div>
              <h3>{p.name}</h3>
              <span className="level">{p.level}</span>
            </div>
            <div>
              <p>{p.blurb}</p>
              <ul className="topics">{p.topics.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            <dl><dt>Duration</dt><dd>{p.duration}</dd><dt>Fee</dt><dd>{p.fee}</dd></dl>
          </article>
        ))}
      </section>

      <section className="band">
        <div className="section">
          <h2>How enrollment works</h2>
          <ol className="steps">{STEPS.map((s) => <li key={s}>{s}</li>)}</ol>
          <a className="btn" href={SITE.formUrl} target="_blank" rel="noreferrer">Open registration form</a>
        </div>
      </section>

      <section className="section">
        <h2>Hiring a graduate?</h2>
        <p className="lead">Every certificate has a number. Enter it on the verification page to confirm the holder, the program, and the issue date.</p>
        <a className="btn dark" href="/verify">Verify a certificate</a>
      </section>
    </main>
  );
}
