/* 'Share it' bottom sheet */
// The help-request message. html=true bolds the task name for showing on screen.
function shareMessage(task,html){
  const name=tr(task.name).toLowerCase();
  return tr("Hey, I'm stuck on {task}. Could you help me with it, or tell me how you handled it? Even 10 minutes would help a lot.",{task:html?`<b>${name}</b>`:name});
}
function sheetShare(){
  const t=S.shareFor||{name:"this task"};
  return sheet(tr("Share it"),`<p class="hint">${tr("Asking for help costs 1 token instead of {n}. Pick someone, then send the message.",{n:t.fullCost||3})}</p>
    ${S.people.map((p,i)=>`<button class="pick" data-act="sharePick" data-i="${i}" aria-pressed="${S.shareTo===i}"><span>${tr(p.name)}<span class="sub">${tr(p.role)}</span></span></button>`).join("")}
    <div class="msg">${shareMessage(t,true)}</div>
    ${S.tokens<1?`<div class="card alert"><p>${tr("You need 1 token to share. Do a Reset first.")}</p></div>`:""}
    <button class="btn share" style="width:100%" data-act="shareSend" ${S.shareTo==null||S.tokens<1?"disabled":""}>${tr("Copy message and log share")}</button>`);
}
