/* Plan screen */
function screenPlan(){
  const cur=S.pendingPlan||S.plan;
  const flag=S.raises>=2?`<div class="card nudge"><h3>You've raised your budget a few weeks running</h3><p>Want to look at what's been draining you? The Week tab shows which days went over.</p></div>`:"";
  return `<div class="screen">
    <div class="dayhead"><h1>Your plan</h1></div>
    <p class="hint">Changes start next week, so you decide when you're calm, not in the middle of a hard day.</p>
    ${flag}
    ${Object.entries(PLANS).map(([k,p])=>{
      const start=k==="custom"?(S.pendingCustom??S.customStart):p.start;
      return `<button class="plan" data-act="plan" data-k="${k}" aria-pressed="${cur===k}"><div class="row"><h3>${p.name}</h3><span class="start">${start} tokens a day</span></div><p>${p.note}</p>${S.pendingPlan===k?'<span class="pending">Starts next week</span>':S.plan===k?'<span class="pending" style="color:var(--reset)">Current plan</span>':""}</button>`}).join("")}
    ${cur==="custom"?`<div class="card"><h3>Daily tokens</h3><div class="range"><input type="range" min="8" max="14" value="${S.pendingCustom??S.customStart}" data-act="custom" aria-label="Daily tokens"><output>${S.pendingCustom??S.customStart}</output></div><p style="margin-top:6px">Limited to 8 to 14 so the budget still means something.</p></div>`:""}
    <div class="section-title">Task costs</div>
    <div class="card"><ul class="list">${TASKS.map(t=>`<li><span>${t.name}</span><span class="delta">−${taskCost(t).cost}</span></li>`).join("")}</ul><p style="margin-top:6px">Costs stay between 1 and 5 tokens.</p></div>
  </div>`;
}
