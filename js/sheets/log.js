/* 'Log a task' bottom sheet */
function sheetLog(){
  const d=S.draft;
  let body;
  if(!d){
    body=`<p class="hint">${tr("Each task starts at 1 token. Taking long, being new to you, or being stressful each add 1.")}</p>
      ${TASKS.map(t=>{const c=taskCost(t);return `<button class="pick" data-act="pickTask" data-id="${t.id}"><span>${tr(t.name)}<span class="sub">${tr(t.ex)}</span>${c.familiar?`<span class="familiar">${tr("Familiar now, 1 cheaper")}</span>`:""}</span><span class="cost">−${c.cost}</span></button>`}).join("")}
      <button class="pick" data-act="pickTask" data-id="custom"><span>${tr("Something else")}<span class="sub">${tr("Name it and rate it yourself")}</span></span><span class="cost">+</span></button>`;
  }else{
    const t=d;
    const c=d.custom?{cost:1+d.time+d.unfamiliar+d.strain,familiar:false}:taskCost(d);
    const tog=(k,label,sub)=>`<button class="toggle" data-act="tog" data-k="${k}" aria-pressed="${!!d[k]}"><span>${tr(label)}<span class="sub" style="display:block;font-size:12px;color:var(--ink-soft)">${tr(sub)}</span></span><span class="sw"></span></button>`;
    body=`${d.custom?`<label class="hint" for="tname">${tr("Task name")}</label><input id="tname" type="text" data-act="tname" value="${d.name||""}" placeholder="${tr("e.g. Phone call with landlord")}">`:`<div class="card"><h3>${tr(t.name)}</h3><p>${tr(t.ex)}</p></div>`}
      <div class="factors">${tog("time","Takes over 2 hours","Or spreads over several days")}${tog("unfamiliar","New to me","First time, or an unfamiliar system")}${tog("strain","Stressful","Uncertainty, pressure or conflict")}</div>
      ${c.familiar?`<p class="familiar">${tr("You have done this before, so it costs 1 less.")}</p>`:""}
      <div class="choice">
        <button class="btn primary" data-act="doTask" data-how="self">${tr("Do it myself")}<small>${tr("−{n} tokens",{n:c.cost})}</small></button>
        <button class="btn share" data-act="doTask" data-how="share">${tr("Share it")}<small>${tr("−1 token")}</small></button>
        <button class="btn defer" data-act="doTask" data-how="defer">${tr("Defer it")}<small>${tr("0 today")}</small></button>
      </div>
      <button class="btn ghost" style="width:100%;margin-top:8px" data-act="draftBack">${tr("Pick a different task")}</button>`;
  }
  return sheet(tr("Log a task"),body);
}
