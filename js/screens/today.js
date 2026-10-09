/* Today screen */
function screenToday(){
  const e=energy();
  const planName=S.plan==="custom"?"Custom":PLANS[S.plan].name;
  let cards="";
  if(S.slept===null){
    cards+=`<div class="card"><h3>How did you sleep?</h3><p>This sets how many tokens you start with today.</p>
      <div class="sleep"><button data-act="sleep" data-q="poor">Under 6h<span>−2 tokens</span></button><button data-act="sleep" data-q="ok">6 to 7h<span>no change</span></button><button data-act="sleep" data-q="good">7h or more<span>+2 tokens</span></button></div></div>`;
  }
  if(S.tokens<0){
    cards+=`<div class="card alert"><h3>Over budget by ${-S.tokens}</h3><p>One tough day doesn't undo the week. So far you've shared ${sharesThisWeek()} task${sharesThisWeek()===1?"":"s"} and had ${goodNights()} good night${goodNights()===1?"":"s"} of sleep. Tomorrow starts fresh.</p></div>`;
  }else if(S.tokens>0&&S.tokens<=3){
    cards+=`<div class="card nudge"><h3>Running low</h3><p>A 20-minute walk before the next task would give a token back.</p></div>`;
  }
  if(S.plan==="crunch"&&resetsToday()===0){
    cards+=`<div class="card nudge"><h3>Crunch week rule</h3><p>Log one Reset today to keep the two extra tokens fair.</p></div>`;
  }
  const later=S.later.length?`<div class="section-title">Deferred</div><div class="card"><ul class="list">${S.later.map((l,i)=>`<li><span>${l.name}</span><button class="tag defer" data-act="undefer" data-i="${i}">Do now</button></li>`).join("")}</ul></div>`:"";
  const log=S.log.length?`<ul class="list">${S.log.map(l=>`<li><span><span class="tag ${l.kind}">${{self:"Did it",share:"Shared",defer:"Deferred",reset:"Reset",sleep:"Sleep"}[l.kind]}</span> ${l.name}</span><span class="delta ${l.delta>0?"plus":"minus"}">${l.delta>0?"+":""}${l.delta||"0"}</span></li>`).join("")}</ul>`:`<p class="empty-note">Nothing logged yet. Add the first thing on your plate.</p>`;
  return `<div class="screen">
    <div class="dayhead"><h1>${DAYS[S.day]}</h1><span class="plan-chip">Week ${S.week}, ${planName}</span></div>
    <div class="hero"><div class="says">${SAYS[e]}</div>${mochi(e,{growth:S.growth,scarf:S.sharesTotal>0})}
      <div class="beads" aria-hidden="true">${beads()}</div>
      <div class="count">${S.tokens} <small>of ${S.startTokens} tokens left today</small></div></div>
    <div class="actions"><button class="btn primary" data-act="sheet" data-s="log">Log a task</button><button class="btn reset" data-act="sheet" data-s="reset">Reset</button></div>
    ${cards}${later}
    <div class="section-title">Today</div><div class="card">${log}</div>
  </div>`;
}
