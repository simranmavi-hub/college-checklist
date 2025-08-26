const STORAGE_KEY = 'college_movein_checklist_v3_multi_hp';

function storageAvailable(){ try{const x='__t'; localStorage.setItem(x,'1'); localStorage.removeItem(x); return true;}catch(e){return false;} }
const HAS_STORAGE = storageAvailable();

function normItem(item){ return (typeof item==='string')? {name:item, hp:false} : {hp:false, qty:false, ...item}; }
function uid(section, name){ return (section + '::' + name).replace(/\s+/g,'_').toLowerCase(); }
function loadState(){ if(!HAS_STORAGE) return {}; try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }catch(e){ return {}; } }
function saveState(s){ if(HAS_STORAGE){ localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } }
const state = loadState();

function allowed(block){
  if(PAGE.allowedCats && !PAGE.allowedCats.includes(block.cat)) return false;
  if(PAGE.allowedSections && !PAGE.allowedSections.includes(block.section)) return false;
  return true;
}

function updateProgress(){
  const cbs = [...document.querySelectorAll('input[type=checkbox]')].filter(el=>el.offsetParent!==null);
  const total = cbs.length; const checked = cbs.filter(c=>c.checked).length;
  const el = document.getElementById('progress'); if(el) el.textContent = `${checked} of ${total} checked`;
}

function render(){
  const container = document.getElementById('container');
  container.innerHTML = '';
  const term = (document.getElementById('search')?.value||'').toLowerCase();
  const filter = document.getElementById('filter')?.value || 'all';
  const hpOnly = (document.getElementById('hpOnly')?.checked || filter==='hp' || PAGE.hpDefaultOnly) ? true : false;
  const hpHighlight = document.getElementById('hpHighlight')?.checked !== false;

  DATA.forEach(block=>{
    if(!allowed(block)) return;
    if(filter!=='all' && filter!=='hp' && block.cat!==filter) return;
    if(filter==='hp' && block.cat==='home') return;

    const sec = document.createElement('div'); sec.className='section';
    const details = document.createElement('details'); details.open=true;

    const summary = document.createElement('summary');
    const hdr = document.createElement('div'); hdr.className='title';
    const h = document.createElement('strong'); h.textContent = block.section;
    const badge = document.createElement('span'); badge.className='badge'; badge.textContent = (block.cat==='grocery'?'Groceries':'Home');
    if(block.hpSection){ const hb=document.createElement('span'); hb.className='badge hp-badge'; hb.textContent='High‑Protein'; hdr.appendChild(hb); }
    hdr.appendChild(h); hdr.appendChild(badge); summary.appendChild(hdr);

    const itemsDiv = document.createElement('div'); itemsDiv.className='items';
    const ul = document.createElement('ul');

    block.items.forEach(raw=>{
      const it = normItem(raw); const name = it.name;
      if(term && !name.toLowerCase().includes(term)) return;
      if(hpOnly && !it.hp) return;

      const id = uid(block.section, name);
      const li = document.createElement('li'); if(hpHighlight && it.hp) li.classList.add('hp');

      const cb = document.createElement('input'); cb.type='checkbox'; cb.id=id; cb.dataset.id=id; if(state[id]?.checked) cb.checked=true;
      cb.addEventListener('change',()=>{ state[id]=state[id]||{}; state[id].checked=cb.checked; saveState(state); updateProgress(); });

      const label = document.createElement('label'); label.className='name'; label.htmlFor=id; label.textContent=name + (it.hp?' — protein':'');
      li.appendChild(cb); li.appendChild(label);

      if(block.qty){
        const qty = document.createElement('input'); qty.className='qty'; qty.placeholder='qty (e.g., 2 lb)'; qty.value = state[id]?.qty||'';
        qty.addEventListener('input',()=>{ state[id]=state[id]||{}; state[id].qty = qty.value; saveState(state); });
        li.appendChild(qty);
      }

      ul.appendChild(li);
    });

    // add row
    const addRow = document.createElement('div'); addRow.className='add-row';
    const addInput = document.createElement('input'); addInput.placeholder = 'Add custom item to "'+block.section+'"…';
    const addBtn = document.createElement('button'); addBtn.textContent = 'Add';
    addBtn.addEventListener('click',()=>{
      const val = addInput.value.trim(); if(!val) return;
      const newItem = (document.getElementById('hpOnly')?.checked ? {name:val, hp:true} : val);
      block.items.push(newItem); addInput.value=''; render();
    });
    addRow.appendChild(addInput); addRow.appendChild(addBtn);

    itemsDiv.appendChild(ul); itemsDiv.appendChild(addRow);
    details.appendChild(summary); details.appendChild(itemsDiv); sec.appendChild(details);
    container.appendChild(sec);
  });

  updateProgress();
}

['search','filter','hpOnly','hpHighlight'].forEach(id=>{
  const el = document.getElementById(id); if(el) el.addEventListener('input', render);
});

window.addEventListener('DOMContentLoaded', render);
