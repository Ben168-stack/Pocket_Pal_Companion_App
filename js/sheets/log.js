/* 'Log a task' bottom sheet */
function sheetLog(){
  const d=S.draft;
  let body;
  if(!d){
    body=`<p class="hint">Each task starts at 1 token. Taking long, being new to you, or being stressful each add 1.</p>
      ${TASKS.map(t=>{const c=taskCost(t);return `<button class="pick" data-act="pickTask" data-id="${t.id}"><span>${t.name}<span class="sub">${t.ex}</span>${c.familiar?'<span class="familiar">Familiar now, 1 cheaper</span>':""}</span><span class="cost">−${c.cost}</span></button>`}).join("")}
      <button class="pick" data-act="pickTask" data-id="custom"><span>Something else<span class="sub">Name it and rate it yourself</span></span><span class="cost">+</span></button>`;
  }else{
    const t=d;
    const c=d.custom?{cost:1+d.time+d.unfamiliar+d.strain,familiar:false}:taskCost(d);
    const tog=(k,label,sub)=>`<button class="toggle" data-act="tog" data-k="${k}" aria-pressed="${!!d[k]}"><span>${label}<span class="sub" style="display:block;font-size:12px;color:var(--ink-soft)">${sub}</span></span><span class="sw"></span></button>`;
    body=`${d.custom?`<label class="hint" for="tname">Task name</label><input id="tname" type="text" data-act="tname" value="${d.name||""}" placeholder="e.g. Phone call with landlord">`:`<div class="card"><h3>${t.name}</h3><p>${t.ex}</p></div>`}
      <div class="factors">${tog("time","Takes over 2 hours","Or spreads over several days")}${tog("unfamiliar","New to me","First time, or an unfamiliar system")}${tog("strain","Stressful","Uncertainty, pressure or conflict")}</div>
      ${c.familiar?'<p class="familiar">You have done this before, so it costs 1 less.</p>':""}
      <div class="choice">
        <button class="btn primary" data-act="doTask" data-how="self">Do it myself<small>−${c.cost} tokens</small></button>
        <button class="btn share" data-act="doTask" data-how="share">Share it<small>−1 token</small></button>
        <button class="btn defer" data-act="doTask" data-how="defer">Defer it<small>0 today</small></button>
      </div>
      <button class="btn ghost" style="width:100%;margin-top:8px" data-act="draftBack">Pick a different task</button>`;
  }
  return sheet("Log a task",body);
}
