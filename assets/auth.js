import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import {
  getAuth, onAuthStateChanged, GoogleAuthProvider,
  signInWithPopup, signInWithRedirect, getRedirectResult,
  setPersistence, browserLocalPersistence, signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
try { getAnalytics(app); } catch(e) {}
const auth = getAuth(app);
const db   = getFirestore(app);
await setPersistence(auth, browserLocalPersistence);

const STATE_KEY = 'college_movein_checklist_v3_multi_hp';

async function loadFromCloud(uid){
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if(snap.exists()){
    const remote = snap.data().state || {};
    const local  = JSON.parse(localStorage.getItem(STATE_KEY) || '{}');
    const merged = { ...local, ...remote };
    localStorage.setItem(STATE_KEY, JSON.stringify(merged));
    if(window.render) window.render();
  }
}

async function saveToCloud(uid){
  const data = JSON.parse(localStorage.getItem(STATE_KEY) || '{}');
  const ref  = doc(db, 'users', uid);
  await setDoc(ref, { state: data, updatedAt: Date.now() }, { merge: true });
}

function setAuthUI(signedIn, user){
  const s = document.getElementById('authStatus');
  const inBtn  = document.getElementById('btnSignIn');
  const outBtn = document.getElementById('btnSignOut');
  const saveBtn= document.getElementById('btnSaveCloud');
  if(!s || !inBtn || !outBtn || !saveBtn) return;
  if(signedIn){
    s.textContent = `Signed in as ${user.displayName || user.email || user.uid}`;
    inBtn.style.display='none'; outBtn.style.display=''; saveBtn.style.display='';
  } else {
    s.textContent = 'Not signed in';
    inBtn.style.display=''; outBtn.style.display='none'; saveBtn.style.display='none';
  }
}

try{ await getRedirectResult(auth); }catch(e){}

onAuthStateChanged(auth, async (user)=>{
  if(user){
    setAuthUI(true, user);
    await loadFromCloud(user.uid);
    window.addEventListener('beforeunload', ()=> saveToCloud(user.uid));
  } else {
    setAuthUI(false);
  }
});

window.signIn = async ()=>{
  const provider = new GoogleAuthProvider();
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  if(isMobile){ await signInWithRedirect(auth, provider); }
  else { await signInWithPopup(auth, provider); }
};
window.signOutNow = ()=> signOut(auth);
window.saveNow = async ()=>{ const u = auth.currentUser; if(u) await saveToCloud(u.uid); };

let t=null; document.addEventListener('input', ()=>{
  const u = auth.currentUser; if(!u) return;
  clearTimeout(t); t=setTimeout(()=> saveToCloud(u.uid), 1200);
});
