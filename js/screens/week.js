/* Week review screen */
function screenWeek(){
  const days=[...S.days];
  const today=todaySummary();
  const all=DAYS.map((_,i)=>i<days.length?days[i]:i===S.day?today:null);
  const max=Math.max(14,...all.filter(Boolean).map(d=>d.spent));
  const bars=all.map(d=>{
    if(!d)return `<div class="bar"><div class="fill none"></div></div>`;
    return `<div class="bar"><div class="fill ${d.over?"over":""}" style="height:${Math.max(4,d.spent/max*100)}%"></div><div class="rec" style="height:${d.recovered/max*100}%"></div></div>`;
  }).join("");
  const w=weekStats(),balanced=w.grows;
  const buddy=S.people[buddyIndex()];
  const check=(ok,label,sub)=>`<li class="${ok?"done":""}"><span class="tick" aria-hidden="true">${ok?"✓":""}</span><span><b>${tr(label)}</b><small>${sub}</small></span><span class="sr">${tr(ok?"Done":"Not yet")}</span></li>`;
  const sunday=S.day===6;
  const presets=["If I have two deadlines, I'll share the admin","If I sleep under 6 hours, I'll skip optional tasks","If it's exam week, I'll still do two 20-minute runs"].map(p=>tr(p));
  return `<div class="screen">
    <div class="dayhead"><h1>${tr("Week {n}",{n:S.week})}</h1><span class="plan-chip">${tr(sunday?"Sunday review":"So far")}</span></div>
    <div class="card"><h3>${tr("Tokens spent each day")}</h3><div class="bars">${bars}</div>
      <div class="barlabels">${DAYS.map(d=>`<span>${shortDay(d)}</span>`).join("")}</div>
      <div class="legend"><span><i style="background:var(--token)"></i>${tr("Spent")}</span><span><i style="background:var(--reset)"></i>${tr("Recovered")}</span><span><i style="background:var(--alert)"></i>${tr("Ran out")}</span></div></div>
    <div class="stats"><div class="stat"><b>${w.shared}</b><span>${tr("Shared")}</span></div><div class="stat"><b>${w.resets}</b><span>${tr("Resets")}</span></div><div class="stat"><b>${w.clinic}</b><span>${tr("Clinic")}</span></div><div class="stat"><b>${w.overs}</b><span>${tr("Ran out")}</span></div></div>
    <div class="card"><ul class="checks">${check(w.buddy>0,"Buddy check-in",w.buddy>0?tr("You reached out to {name}",{name:tr(buddy.name)}):tr("Message {name} when something feels new",{name:tr(buddy.name)}))}${check(w.hall>0,"Hall or circle session",w.hall>0?tr(w.hall===1?"{n} session this week":"{n} sessions this week",{n:w.hall}):tr("See what's on in Reset"))}</ul></div>
    <div class="card growth">${mochi("bright",{growth:S.growth+(balanced?1:0),scarf:S.sharesTotal>0})}<div><h3>${tr(balanced?"Mochi will grow this week":"Mochi stays the same size")}</h3><p>${tr(balanced?"You stayed in budget, asked for help, or joined a hall session. All of them count.":"Share one task, join a hall session, or stay in budget to help Mochi grow.")}</p></div></div>
    <div class="section-title">${tr("Plan for next week")}</div>
    <div class="card"><p>${tr("Write one if-then plan for a week that might get busy.")}</p>
      <div class="presets">${presets.map(p=>`<button data-act="ifthen" data-t="${p}">${p}</button>`).join("")}</div>
      <textarea data-act="ifthenText" aria-label="${tr("Your if-then plan")}" placeholder="${tr("If ..., I will ...")}">${S.ifThen}</textarea></div>
    <button class="btn primary" style="width:100%" data-act="startWeek" ${sunday?"":"disabled"}>${tr(sunday?"Start next week":"Available on Sunday")}</button>
  </div>`;
}
