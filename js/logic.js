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
function resetsToday(){return S.log.filter(l=>l.kind==="reset"||l.kind==="hall").length}
// The next hall session from today on (wraps to next week's first one)
function nextHallEvent(){const h=RESETS.filter(r=>r.hall);return h.find(r=>r.day>=S.day)||h[0]}
// The People list with each person's index in S.people: buddy, circle, support, then anyone added
const PEOPLE_ORDER={buddy:0,circle:1,support:2};
function peopleInOrder(){return S.people.map((p,i)=>[p,i]).sort((a,b)=>(PEOPLE_ORDER[a[0].type]??3)-(PEOPLE_ORDER[b[0].type]??3))}
function buddyIndex(){const i=S.people.findIndex(p=>p.type==="buddy");return i<0?null:i}

// Tokens can't go below 0. Returns false (and changes nothing) if you can't afford it.
function spend(name,kind,delta,extra={}){
  if(S.tokens+delta<0)return false;
  S.tokens+=delta;
  S.log.unshift({name,kind,delta,...extra});
  return true;
}
// Today so far, in the shape stored in S.days. "over" means the day ran out of tokens (hit 0).
// buddy, hall and clinic were added later, so older saved days may not have them.
function todaySummary(){
  const n=f=>S.log.filter(f).length;
  return {spent:S.log.filter(l=>l.delta<0).reduce((a,l)=>a-l.delta,0),recovered:S.recovered,shared:n(l=>l.kind==="share"),over:S.tokens<=0,slept:S.slept,resets:resetsToday(),
    buddy:n(l=>l.kind==="share"&&l.to==="buddy"),hall:n(l=>l.kind==="hall"),clinic:n(l=>l.kind==="clinic")};
}
function closeDay(){S.days.push(todaySummary())}
// Totals for the week including today. Mochi grows if you stayed in budget, shared, or went to a hall session.
function weekStats(){
  const all=[...S.days,todaySummary()];
  const sum=k=>all.reduce((a,d)=>a+(d[k]||0),0);
  const w={shared:sum("shared"),resets:sum("resets"),overs:all.filter(d=>d.over).length,buddy:sum("buddy"),hall:sum("hall"),clinic:sum("clinic")};
  w.grows=w.overs===0||w.shared>0||w.hall>0;
  return w;
}
function nextDay(){
  closeDay();
  S.day++;
  S.tokens=S.startTokens;S.slept=null;S.recovered=0;S.log=[];S.view="today";S.sheet=null;
}
function startWeek(){
  if(weekStats().grows)S.growth++;
  if(S.pendingPlan){S.plan=S.pendingPlan;S.pendingPlan=null}
  if(S.pendingCustom!=null){if(S.pendingCustom>S.customStart)S.raises++;else S.raises=0;S.customStart=S.pendingCustom;S.pendingCustom=null}
  S.startTokens=S.plan==="custom"?S.customStart:PLANS[S.plan].start;
  S.week++;S.day=0;S.days=[];S.tokens=S.startTokens;S.slept=null;S.recovered=0;S.log=[];S.view="today";S.sheet=null;
  if(S.plan==="crunch"){S.pendingPlan="steady"}
  toast(tr("New week. Mochi is ready."));
}
