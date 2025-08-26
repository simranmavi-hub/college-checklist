import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
try { getAnalytics(app); } catch(e) {}
const auth = getAuth(app);
await setPersistence(auth, browserLocalPersistence);

function setError(msg){ const el=document.getElementById('err'); if(el){ el.textContent=msg||''; } }
function toApp(){ location.href = './app.html'; }

try{ await getRedirectResult(auth); }catch(e){}

// If already signed in, go straight to app
if(auth.currentUser){ toApp(); }

// Google sign-in
window.googleLogin = async ()=>{
  setError('');
  const provider = new GoogleAuthProvider();
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  try{
    if(isMobile){ await signInWithRedirect(auth, provider); }
    else { await signInWithPopup(auth, provider); toApp(); }
  }catch(e){ setError(e.message || 'Sign-in failed'); }
};

// Email/password
window.emailSignup = async ()=>{
  setError('');
  const email = document.getElementById('email')?.value.trim();
  const pass  = document.getElementById('password')?.value;
  if(!email || !pass){ setError('Email and password are required.'); return; }
  try{ await createUserWithEmailAndPassword(auth, email, pass); toApp(); }
  catch(e){ setError(e.message || 'Sign-up failed'); }
};

window.emailLogin = async ()=>{
  setError('');
  const email = document.getElementById('email')?.value.trim();
  const pass  = document.getElementById('password')?.value;
  if(!email || !pass){ setError('Email and password are required.'); return; }
  try{ await signInWithEmailAndPassword(auth, email, pass); toApp(); }
  catch(e){ setError(e.message || 'Sign-in failed'); }
};
