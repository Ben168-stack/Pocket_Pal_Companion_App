/* Token rules: task cost, energy level, spending, day/week rollover */
/* ---------- logic ---------- */
function taskCost(t){
  const familiar=t.unfamiliar&&(S.seen[t.id]||0)>0;
  return {cost:1+t.time+(familiar?0:t.unfamiliar)+t.strain,familiar};
}
function energy(st=S){
  if(st.tokens<=0)return"asleep";
  const r=st.tokens/st.startTokens;
  return r>.6?"bright":r>.3?"okay":"tired";
}
function sharesThisWeek(){return S.days.reduce((a,d)=>a+d.shared,0)+S.log.filter(l=>l.kind==="share").length}
function goodNights(){return S.days.filter(d=>d.slept==="good").length+(S.slept==="good"?1:0)}
function resetsToday(){return S.log.filter(l=>l.kind==="reset").length}

function spend(name,kind,delta,extra={}){
  S.tokens+=delta;
  S.log.unshift({name,kind,delta,...extra});
}
function closeDay(){
  const spent=S.log.filter(l=>l.delta<0).reduce((a,l)=>a-l.delta,0);
  S.days.push({spent,recovered:S.recovered,shared:S.log.filter(l=>l.kind==="share").length,over:S.tokens<0,slept:S.slept,resets:resetsToday()});
}
function nextDay(){
  closeDay();
  S.day++;
  S.tokens=S.startTokens;S.slept=null;S.recovered=0;S.log=[];S.view="today";S.sheet=null;
}
function startWeek(){
  const over=S.days.filter(d=>d.over).length;
  const shared=S.days.reduce((a,d)=>a+d.shared,0);
  if(over===0||shared>0)S.growth++;
  if(S.pendingPlan){S.plan=S.pendingPlan;S.pendingPlan=null}
  if(S.pendingCustom!=null){if(S.pendingCustom>S.customStart)S.raises++;else S.raises=0;S.customStart=S.pendingCustom;S.pendingCustom=null}
  S.startTokens=S.plan==="custom"?S.customStart:PLANS[S.plan].start;
  S.week++;S.day=0;S.days=[];S.tokens=S.startTokens;S.slept=null;S.recovered=0;S.log=[];S.view="today";S.sheet=null;
  if(S.plan==="crunch"){S.pendingPlan="steady"}
  toast("New week. Mochi is ready.");
}
