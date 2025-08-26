import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const gate = document.getElementById('gate');
if(gate){ gate.style.display='block'; }

onAuthStateChanged(auth, (user)=>{
  if(user){
    if(gate){ gate.style.display='none'; }
  } else {
    // redirect to landing (index.html) if not signed in
    location.href = './index.html';
  }
});
