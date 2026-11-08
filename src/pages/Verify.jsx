import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase.js";

export default function Verify() {
  const { certNo: param } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(param || "");
  const [state, setState] = useState({ status: "idle" }); // idle | loading | valid | invalid | error

  async function lookup(raw) {
    const id = raw.trim().toUpperCase();
    if (!id) return;
    setState({ status: "loading" });
    try {
      const snap = await getDoc(doc(db, "certificates", id));
      const data = snap.exists() ? snap.data() : null;
      setState(data && data.status === "valid" ? { status: "valid", data, id } : { status: "invalid", id });
    } catch {
      setState({ status: "error" });
    }
  }

  useEffect(() => { if (param) lookup(param); }, [param]);

  return (
    <main className="section narrow">
      <h1 className="h1">Verify a certificate</h1>
      <p className="lead">Enter the certificate number printed on the certificate, or scan its QR code.</p>
      <form className="row" onSubmit={(e) => { e.preventDefault(); navigate(`/verify/${value.trim().toUpperCase()}`); }}>
        <label className="sr" htmlFor="cert">Certificate number</label>
        <input id="cert" value={value} onChange={(e) => setValue(e.target.value)} placeholder="CBA-2026-XXXXXX" autoComplete="off" />
        <button className="btn dark">Verify</button>
      </form>

      <div aria-live="polite">
        {state.status === "loading" && <p className="result">Checking…</p>}
        {state.status === "valid" && (
          <div className="result ok">
            <h2>Valid certificate</h2>
            <dl>
              <dt>Holder</dt><dd>{state.data.holderName}</dd>
              <dt>Program</dt><dd>{state.data.program}</dd>
              <dt>Issued</dt><dd>{state.data.issuedOn}</dd>
              <dt>Number</dt><dd>{state.id}</dd>
            </dl>
          </div>
        )}
        {state.status === "invalid" && (
          <div className="result bad"><h2>No valid certificate found</h2><p>Check the number for typos. If it still fails, contact the academy.</p></div>
        )}
        {state.status === "error" && (
          <div className="result bad"><h2>Couldn't check right now</h2><p>Check your connection and try again.</p></div>
        )}
      </div>
    </main>
  );
}
