
# College Checklist (Multi‑page + Firebase Auth)

This site is a static, mobile‑friendly checklist deployed on GitHub Pages with:
- Multi‑page navigation
- High‑protein filters
- Local autosave **and** cloud sync via **Firebase Authentication + Firestore**

## 1) Firebase Console Setup
1. Create a Firebase project → Add a **Web** app → copy the config.
2. **Authentication → Sign‑in method**: Enable **Google** and Save.
3. **Firestore Database**: Create a database (start in *Test Mode* for development).
4. Update **security rules** (below), then Publish.

### Firestore Rules (Users can only read/write their own document)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 2) Deploy to GitHub Pages
1. Create a public repo (or use an existing one).
2. Upload **all files and the `assets/` folder** from this ZIP to the repo root.
3. Repo **Settings → Pages** → Source: *Deploy from a branch*; Branch: `main` and `/ (root)` → Save.
4. Visit `https://<your-username>.github.io/<repo>/`.

## 3) How it works
- While **signed out**, the app stores progress in `localStorage`.
- When you **Sign in with Google**, the app loads your data from Firestore (`users/{uid}.state`) and merges it with local state; cloud data takes precedence by default.
- As you interact, it autosaves to Firestore (debounced) and again on page unload.
- Use **Save to Cloud** to force a save any time.

## 4) Files of interest
- `assets/firebase-config.js` — your Firebase project identifiers.
- `assets/auth.js` — sign‑in/out and Firestore sync logic.
- `assets/app.js` — checklist UI and local autosave.
- `assets/data.js` — all items and sections.
- Each `*.html` — page shell including auth controls and scripts.

## 5) Troubleshooting
- **Pop‑ups blocked on mobile?** The app uses **redirect** on mobile for Google sign‑in.
- **LocalStorage disabled (Private mode)?** Sign‑in works, but local autosave may be limited.
- **Not seeing updates?** Hard refresh (Cmd/Ctrl+Shift+R) or clear site data for the Pages URL.

---
