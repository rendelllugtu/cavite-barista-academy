import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Verify from "./pages/Verify.jsx";
import { SITE } from "./config.js";
import "./index.css";

function Layout({ children }) {
  return (
    <>
      <header className="nav">
        <Link to="/" className="brand">
          <img src="/logo.png" alt={SITE.name} className="brand-logo" />
        </Link>
        <nav>
          <a href="/#programs">Programs</a>
          <NavLink to="/verify">Verify certificate</NavLink>
          <a className="btn small" href={SITE.formUrl} target="_blank" rel="noreferrer">Enroll</a>
        </nav>
      </header>
      {children}
      <footer className="footer" id="contact">
        <div className="footer-brand">
          <img src="/logo.png" alt={SITE.name} className="footer-logo" />
        </div>
        <div className="footer-col">
          <strong>Contact Us</strong>
          <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a>
          <a href={`tel:${SITE.contact.phone.replace(/\s/g, "")}`}>{SITE.contact.phone}</a>
          <span>{SITE.contact.location}</span>
        </div>
        <div className="footer-col">
          <strong>Follow Us</strong>
          <a href={SITE.contact.facebook} target="_blank" rel="noreferrer" className="footer-fb-btn">👍 Like &amp; Follow on Facebook</a>
          <a href={SITE.contact.messenger} target="_blank" rel="noreferrer" className="footer-fb-btn messenger">💬 Message us on Messenger</a>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/verify/:certNo" element={<Verify />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
