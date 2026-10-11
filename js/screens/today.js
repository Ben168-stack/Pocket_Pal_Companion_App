/* Today screen */
function screenToday(){
  const e=energy();
  const planName=tr(S.plan==="custom"?"Custom":PLANS[S.plan].name);
  let cards="";
  if(S.slept===null){
    cards+=`<div class="card"><h3>${tr("How did you sleep?")}</h3><p>${tr("This sets how many tokens you start with today.")}</p>
      <div class="sleep"><button data-act="sleep" data-q="poor">${tr("Under 6h")}<span>${tr("−2 tokens")}</span></button><button data-act="sleep" data-q="ok">${tr("6 to 7h")}<span>${tr("no change")}</span></button><button data-act="sleep" data-q="good">${tr("7h or more")}<span>${tr("+2 tokens")}</span></button></div></div>`;
  }
  if(S.tokens<0){
    const shares=sharesThisWeek(),nights=goodNights();
    cards+=`<div class="card alert"><h3>${tr("Over budget by {n}",{n:-S.tokens})}</h3><p>${tr("One tough day doesn't undo the week. So far you've shared {shares} and had {nights} of sleep. Tomorrow starts fresh.",{shares:tr(shares===1?"{n} task":"{n} tasks",{n:shares}),nights:tr(nights===1?"{n} good night":"{n} good nights",{n:nights})})}</p></div>`;
  }else if(S.tokens>0&&S.tokens<=3){
    cards+=`<div class="card nudge"><h3>${tr("Running low")}</h3><p>${tr("A 20-minute walk before the next task would give a token back.")}</p></div>`;
  }
  if(S.plan==="crunch"&&resetsToday()===0){
    cards+=`<div class="card nudge"><h3>${tr("Crunch week rule")}</h3><p>${tr("Log one Reset today to keep the two extra tokens fair.")}</p></div>`;
  }
  const later=S.later.length?`<div class="section-title">${tr("Deferred")}</div><div class="card"><ul class="list">${S.later.map((l,i)=>`<li><span>${tr(l.name)}</span><button class="tag defer" data-act="undefer" data-i="${i}">${tr("Do now")}</button></li>`).join("")}</ul></div>`:"";
  const kinds={self:"Did it",share:"Shared",defer:"Deferred",reset:"Reset",sleep:"Sleep"};
  const log=S.log.length?`<ul class="list">${S.log.map(l=>`<li><span><span class="tag ${l.kind}">${tr(kinds[l.kind])}</span> ${logName(l)}</span><span class="delta ${l.delta>0?"plus":"minus"}">${l.delta>0?"+":""}${l.delta||"0"}</span></li>`).join("")}</ul>`:`<p class="empty-note">${tr("Nothing logged yet. Add the first thing on your plate.")}</p>`;
  return `<div class="screen">
    <div class="dayhead"><h1>${tr(DAYS[S.day])}</h1><span class="plan-chip">${tr("Week {n}, {plan}",{n:S.week,plan:planName})}</span></div>
    <div class="hero"><div class="says">${tr(SAYS[e])}</div>${mochi(e,{growth:S.growth,scarf:S.sharesTotal>0})}
      <div class="beads" aria-hidden="true">${beads()}</div>
      <div class="count">${S.tokens} <small>${tr("of {n} tokens left today",{n:S.startTokens})}</small></div></div>
    <div class="actions"><button class="btn primary" data-act="sheet" data-s="log">${tr("Log a task")}</button><button class="btn reset" data-act="sheet" data-s="reset">${tr("Reset")}</button></div>
    ${cards}${later}
    <div class="section-title">${tr("Today")}</div><div class="card">${log}</div>
  </div>`;
}
