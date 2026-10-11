/* Week review screen */
function screenWeek(){
  const days=[...S.days];
  const today={spent:S.log.filter(l=>l.delta<0).reduce((a,l)=>a-l.delta,0),recovered:S.recovered,over:S.tokens<=0,shared:S.log.filter(l=>l.kind==="share").length};
  const all=DAYS.map((_,i)=>i<days.length?days[i]:i===S.day?today:null);
  const max=Math.max(14,...all.filter(Boolean).map(d=>d.spent));
  const bars=all.map(d=>{
    if(!d)return `<div class="bar"><div class="fill none"></div></div>`;
    return `<div class="bar"><div class="fill ${d.over?"over":""}" style="height:${Math.max(4,d.spent/max*100)}%"></div><div class="rec" style="height:${d.recovered/max*100}%"></div></div>`;
  }).join("");
  const done=all.filter(Boolean);
  const shared=done.reduce((a,d)=>a+d.shared,0);
  const overs=done.filter(d=>d.over).length;
  const resets=days.reduce((a,d)=>a+(d.resets||0),0)+resetsToday();
  const balanced=overs===0||shared>0;
  const sunday=S.day===6;
  const presets=["If I have two deadlines, I'll share the admin","If I sleep under 6 hours, I'll skip optional tasks","If it's exam week, I'll still do two 20-minute runs"].map(p=>tr(p));
  return `<div class="screen">
    <div class="dayhead"><h1>${tr("Week {n}",{n:S.week})}</h1><span class="plan-chip">${tr(sunday?"Sunday review":"So far")}</span></div>
    <div class="card"><h3>${tr("Tokens spent each day")}</h3><div class="bars">${bars}</div>
      <div class="barlabels">${DAYS.map(d=>`<span>${shortDay(d)}</span>`).join("")}</div>
      <div class="legend"><span><i style="background:var(--token)"></i>${tr("Spent")}</span><span><i style="background:var(--reset)"></i>${tr("Recovered")}</span><span><i style="background:var(--alert)"></i>${tr("Ran out")}</span></div></div>
    <div class="stats"><div class="stat"><b>${shared}</b><span>${tr("Shared")}</span></div><div class="stat"><b>${resets}</b><span>${tr("Resets")}</span></div><div class="stat"><b>${overs}</b><span>${tr("Ran out")}</span></div></div>
    <div class="card growth">${mochi("bright",{growth:S.growth+(balanced?1:0),scarf:S.sharesTotal>0})}<div><h3>${tr(balanced?"Mochi will grow this week":"Mochi stays the same size")}</h3><p>${tr(balanced?"You stayed in budget or asked for help. Both count.":"Share one task or stay in budget to help Mochi grow.")}</p></div></div>
    <div class="section-title">${tr("Plan for next week")}</div>
    <div class="card"><p>${tr("Write one if-then plan for a week that might get busy.")}</p>
      <div class="presets">${presets.map(p=>`<button data-act="ifthen" data-t="${p}">${p}</button>`).join("")}</div>
      <textarea data-act="ifthenText" aria-label="${tr("Your if-then plan")}" placeholder="${tr("If ..., I will ...")}">${S.ifThen}</textarea></div>
    <button class="btn primary" style="width:100%" data-act="startWeek" ${sunday?"":"disabled"}>${tr(sunday?"Start next week":"Available on Sunday")}</button>
  </div>`;
}
