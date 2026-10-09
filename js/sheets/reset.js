/* 'Reset' bottom sheet */
function sheetReset(){
  const left=DAILY_CAP-S.recovered;
  const bonus=S.plan==="free"?1:0;
  return sheet("Reset",`<p class="hint">Recovery earns tokens back. You can gain up to ${DAILY_CAP} a day, and ${Math.max(left,0)} are left today.${bonus?" Free & easy adds 1 to each.":""}</p>
    ${RESETS.map(r=>{const g=Math.min(r.gain+bonus,Math.max(left,0));return `<button class="pick" data-act="doReset" data-id="${r.id}" ${left<=0?"disabled":""}><span>${r.name}<span class="sub">${r.ex}</span></span><span class="cost" style="color:var(--reset)">+${g}</span></button>`}).join("")}`);
}
