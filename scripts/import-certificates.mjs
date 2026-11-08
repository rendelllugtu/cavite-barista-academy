// Usage: node scripts/import-certificates.mjs batch.csv [--commit]
// CSV header: holderName,program,issuedOn   (issuedOn as YYYY-MM-DD)
// Dry-run by default: prints what WOULD be written. Add --commit to write.
// Needs serviceAccount.json (Firebase console > Project settings > Service accounts).
import fs from "node:fs";
import crypto from "node:crypto";
import admin from "firebase-admin";

const [file, flag] = process.argv.slice(2);
if (!file) { console.error("Usage: node scripts/import-certificates.mjs batch.csv [--commit]"); process.exit(1); }
const commit = flag === "--commit";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no look-alike characters
const rand = (n) => Array.from(crypto.randomBytes(n), (b) => ALPHABET[b % ALPHABET.length]).join("");

const [head, ...lines] = fs.readFileSync(file, "utf8").trim().split(/\r?\n/);
const cols = head.split(",").map((c) => c.trim());
const rows = lines.filter(Boolean).map((l) => Object.fromEntries(l.split(",").map((v, i) => [cols[i], v.trim()])));

if (commit) admin.initializeApp({ credential: admin.credential.cert(JSON.parse(fs.readFileSync("serviceAccount.json", "utf8"))) });
const db = commit ? admin.firestore() : null;

for (const r of rows) {
  const id = `CBA-${r.issuedOn.slice(0, 4)}-${rand(6)}`;
  const data = { holderName: r.holderName, program: r.program, issuedOn: r.issuedOn, status: "valid" };
  console.log(`${commit ? "WRITE" : "DRY  "} ${id}  ${r.holderName}  ${r.program}  ${r.issuedOn}`);
  if (commit) await db.collection("certificates").doc(id).create(data);
}
console.log(commit ? "Done." : "Dry run only. Re-run with --commit to write.");
