# Cavite Barista Academy

React + Vite, Firebase Hosting, Firestore. Registration via Google Forms (for now).

## Setup
1. `npm install`
2. Create a Firebase project, add a Web app, copy its config into `.env` (see `.env.example`).
3. Enable Firestore (production mode).
4. Edit `src/config.js`: Google Form URL, contact details, programs.
5. `npm run dev`

## Deploy
```
npm i -g firebase-tools
firebase login
firebase use --add      # pick your project
npm run deploy          # builds, deploys hosting + Firestore rules
```

## Issuing certificates
Add a document in Firestore: `certificates/{CERT_NO}` with
`holderName`, `program`, `issuedOn` (YYYY-MM-DD), `status` ("valid" or "revoked").
Or bulk import: `npm run import:certs -- batch.csv` (dry-run), then add `--commit`.
Put a QR code linking to `https://YOURDOMAIN/verify/CERT_NO` on each certificate.
Set status to "revoked" to invalidate one without deleting it.
