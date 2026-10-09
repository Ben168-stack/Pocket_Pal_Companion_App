/* Shared UI: tab bar icons, tab bar, token beads, bottom-sheet wrapper */
/* ---------- screens ---------- */
const icons={
  today:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="13" r="8"/><path d="M9 13h.01M15 13h.01M10 16q2 1.5 4 0"/></svg>',
  week:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 20V12M10 20V6M15 20v-9M20 20V9"/></svg>',
  plan:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg>',
  people:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M16 4.5a3.5 3.5 0 0 1 0 7M18 14c2 .8 3 3 3 6"/></svg>'
};
function tabbar(v){
  const t=[["today","Today"],["week","Week"],["plan","Plan"],["people","People"]];
  return `<nav class="tabbar">${t.map(([k,l])=>`<button class="tab" data-act="view" data-v="${k}" ${v===k?'aria-current="page"':""}>${icons[k]}${l}<span class="dot"></span></button>`).join("")}</nav>`;
}
function beads(st=S){
  const total=Math.max(st.startTokens,st.tokens);
  let h="";
  for(let i=0;i<total;i++)h+=`<span class="bead ${i<st.tokens?"":"empty"}"></span>`;
  for(let i=0;i<-st.tokens;i++)h+=`<span class="bead debt"></span>`;
  return h;
}
function sheet(title,body){
  return `<div class="scrim" data-act="closeScrim"><div class="sheet" role="dialog" aria-label="${title}"><div class="grab"></div><div class="sheet-head"><h2>${title}</h2><button class="close" data-act="close" aria-label="Close">×</button></div>${body}</div></div>`;
}
