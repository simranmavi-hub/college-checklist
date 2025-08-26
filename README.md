
# College Checklist — Auth Landing + Gated App

This package makes the **landing page a Sign in / Sign up screen** (`index.html`) and moves the app to `app.html`. All other pages are gated and require sign‑in.

## Files
- `index.html` — Landing page: Google sign‑in + Email/Password sign‑up / sign‑in.
- `app.html` — All Items page (app home) shown after authentication.
- Other `*.html` — Section pages. All pages include an **auth guard** that redirects to `index.html` if not signed in.
- `assets/auth-landing.js` — Handles Google and Email/Password flows on landing.
- `assets/auth-guard.js` — Redirects unauthenticated users to the landing page.
- `assets/auth.js` — In‑app auth UI (status, sign out, Save to Cloud) and Firestore syncing.
- `assets/firebase-config.js` — Your Firebase config identifiers.

## Firebase Console (one time)
1. **Authentication → Sign‑in method**: Enable **Google** (and Email/Password if using it).
2. **Firestore Database**: Create database.
3. **Rules**:
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

## Deploy on GitHub Pages
1. Upload everything to your repo root (replacing older files where needed).
2. **Settings → Pages** → Source: *Deploy from a branch*; Branch: `main` and `/ (root)` → Save.
3. Visit your Pages URL. You’ll see `index.html` (auth screen). After sign‑in, you’ll be taken to `app.html`.

## Behavior
- Signed‑out visitors always land on `index.html` to sign in / sign up.
- After authentication, the app loads or creates `users/{uid}` in Firestore and syncs the local checklist (`college_movein_checklist_v3_multi_hp`).
- All app pages are gated and will redirect to `index.html` if the session is missing.

## Notes
- If you previously shared the All Items link as `/index.html`, update it to `/app.html`.
- On mobile, Google sign‑in uses **redirect** (more reliable than pop‑ups). On desktop, it uses pop‑up by default.

