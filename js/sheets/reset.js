/* 'Reset' bottom sheet */
function sheetReset(){
  const left=DAILY_CAP-S.recovered;
  const bonus=S.plan==="free"?1:0;
  const pick=r=>{const g=Math.min(r.gain+bonus,Math.max(left,0));return `<button class="pick" data-act="doReset" data-id="${r.id}" ${left<=0?"disabled":""}><span>${r.when?`<span class="when">${tr(r.when)}</span>`:""}${tr(r.name)}<span class="sub">${tr(r.ex)}</span></span><span class="cost" style="color:var(--reset)">+${g}</span></button>`};
  return sheet(tr("Reset"),`<p class="hint">${tr("Recovery earns tokens back. You can gain up to {cap} a day, and {left} are left today.",{cap:DAILY_CAP,left:Math.max(left,0)})}${bonus?" "+tr("Free & easy adds 1 to each."):""}</p>
    <div class="section-title">${tr("This week in hall")}</div>
    ${RESETS.filter(r=>r.hall).map(pick).join("")}
    <div class="section-title">${tr("Anytime")}</div>
    ${RESETS.filter(r=>!r.hall).map(pick).join("")}`);
}
