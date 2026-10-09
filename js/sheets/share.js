/* 'Share it' bottom sheet */
function sheetShare(){
  const t=S.shareFor||{name:"this task"};
  return sheet("Share it",`<p class="hint">Asking for help costs 1 token instead of ${t.fullCost||3}. Pick someone, then send the message.</p>
    ${S.people.map((p,i)=>`<button class="pick" data-act="sharePick" data-i="${i}" aria-pressed="${S.shareTo===i}"><span>${p.name}<span class="sub">${p.role}</span></span></button>`).join("")}
    <div class="msg">Hey, I'm stuck on <b>${t.name.toLowerCase()}</b>. Could you help me with it, or tell me how you handled it? Even 10 minutes would help a lot.</div>
    <button class="btn share" style="width:100%" data-act="shareSend" ${S.shareTo==null?"disabled":""}>Copy message and log share</button>`);
}
