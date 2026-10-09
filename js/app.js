/* Renders the phone and handles every button/input (start here for behaviour changes) */
function phoneHTML(){
  const views={today:screenToday,week:screenWeek,plan:screenPlan,people:screenPeople};
  const sh={log:sheetLog,reset:sheetReset,share:sheetShare}[S.sheet];
  return `<div class="statusbar"><span>9:41</span><span class="display" style="font-size:16px">Loadout</span><span>100%</span></div>${views[S.view]()}${tabbar(S.view)}${sh?sh():""}${S.toast?`<div class="toast" role="status">${S.toast}</div>`:""}`;
}

/* ---------- actions ---------- */
let toastTimer;
function toast(m){S.toast=m;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{S.toast=null;render()},1800)}
const phone=document.getElementById("phone");
function render(){phone.innerHTML=phoneHTML();save()}

document.addEventListener("click",e=>{
  const b=e.target.closest("[data-act]");if(!b||b.closest("#gallery"))return;
  const a=b.dataset.act;
  if(a==="closeScrim"&&e.target!==b)return;
  switch(a){
    case"view":S.view=b.dataset.v;S.sheet=null;break;
    case"sheet":S.sheet=b.dataset.s;S.draft=null;break;
    case"close":case"closeScrim":S.sheet=null;S.draft=null;break;
    case"sleep":{const q=b.dataset.q,d={poor:-2,ok:0,good:2}[q];S.slept=q;S.tokens+=d;spend(q==="good"?"Slept 7h or more":q==="poor"?"Slept under 6h":"Slept 6 to 7h","sleep",0);S.log[0].delta=d;break}
    case"pickTask":{const id=b.dataset.id;S.draft=id==="custom"?{custom:true,id:"c"+Date.now(),name:"",time:0,unfamiliar:0,strain:0}:{...TASKS.find(t=>t.id===id)};break}
    case"draftBack":S.draft=null;break;
    case"tog":{const k=b.dataset.k;S.draft[k]=S.draft[k]?0:1;break}
    case"doTask":{
      const d=S.draft;const name=(d.custom?(d.name||"Custom task"):d.name);
      const c=d.custom?{cost:1+d.time+d.unfamiliar+d.strain}:taskCost(d);
      const how=b.dataset.how;
      if(how==="self"){spend(name,"self",-c.cost);S.seen[d.id]=(S.seen[d.id]||0)+1;S.sheet=null;toast(`−${c.cost} tokens`)}
      if(how==="defer"){S.later.push({...d,name});spend(name,"defer",0);S.sheet=null;toast("Moved to Deferred")}
      if(how==="share"){S.shareFor={...d,name,fullCost:c.cost};S.shareTo=null;S.sheet="share"}
      S.draft=null;break}
    case"sharePick":S.shareTo=+b.dataset.i;break;
    case"shareSend":{
      const t=S.shareFor;const p=S.people[S.shareTo];
      const msg=`Hey, I'm stuck on ${t.name.toLowerCase()}. Could you help me with it, or tell me how you handled it? Even 10 minutes would help a lot.`;
      try{navigator.clipboard&&navigator.clipboard.writeText(msg).catch(()=>{})}catch(err){}
      spend(`${t.name} with ${p.name}`,"share",-1);S.seen[t.id]=(S.seen[t.id]||0)+1;S.sharesTotal++;S.sheet=null;S.shareFor=null;toast("Message copied. Shared for 1 token");break}
    case"doReset":{
      const r=RESETS.find(x=>x.id===b.dataset.id);const bonus=S.plan==="free"?1:0;
      const g=Math.min(r.gain+bonus,DAILY_CAP-S.recovered);if(g<=0)break;
      S.recovered+=g;spend(r.name,"reset",g);S.sheet=null;toast(`+${g}. Mochi feels better`);break}
    case"undefer":{const t=S.later.splice(+b.dataset.i,1)[0];S.draft=t;S.sheet="log";break}
    case"plan":{const k=b.dataset.k;S.pendingPlan=k===S.plan&&k!=="custom"?null:k;if(k===S.plan&&k==="custom")S.pendingPlan=null;break}
    case"ifthen":S.ifThen=b.dataset.t;break;
    case"startWeek":startWeek();break;
    case"addPerson":{const i=phone.querySelector('[data-act="newPerson"]');if(i&&i.value.trim()){S.people.push({name:i.value.trim(),role:"Added by you"});toast("Added")}break}
    case"nextDay":if(S.day===6){S.view="week";toast("It's Sunday. Review the week.")}else{nextDay();toast(`Good morning. It's ${DAYS[S.day]}.`)}break;
    case"sampleWeek":sampleWeek();break;
    case"drain":if(S.slept===null){S.slept="poor";S.log.unshift({name:"Slept under 6h",kind:"sleep",delta:-2});S.tokens-=2}spend("First lab report","self",-4);spend("Unfamiliar admin","self",-3);spend("Academic deadline","self",-3);toast("Heavy day loaded");break;
    case"restart":S=fresh();break;
    case"gallery":showGallery();return;
    default:return;
  }
  render();
});
document.addEventListener("input",e=>{
  const a=e.target.dataset.act;
  if(a==="tname"){S.draft.name=e.target.value;save()}
  if(a==="ifthenText"){S.ifThen=e.target.value;save()}
  if(a==="custom"){const v=+e.target.value;S.pendingCustom=v===S.customStart?null:v;e.target.nextElementSibling.textContent=v;save()}
});
document.addEventListener("change",e=>{if(e.target.dataset.act==="custom")render()});

render();
