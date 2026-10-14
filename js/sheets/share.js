/* 'Share it' bottom sheet */
// The help-request message. html=true bolds the task name for showing on screen.
// No task (opened from the Running low card) gives a general check-in message instead.
function shareMessage(task,html){
  if(!task)return tr("Hey, it's been a heavy day. Do you have 10 minutes to chat, or could we grab a meal this week?");
  const name=tr(task.name).toLowerCase();
  return tr("Hey, I'm stuck on {task}. Could you help me with it, or tell me how you handled it? Even 10 minutes would help a lot.",{task:html?`<b>${name}</b>`:name});
}
function sheetShare(){
  const t=S.shareFor;
  const hint=t?tr("Asking for help costs 1 token instead of {n}. Pick someone, then send the message.",{n:t.fullCost||3}):tr("A check-in costs 1 token. Talking it through often makes the next task lighter.");
  return sheet(tr(t?"Share it":"Check in"),`<p class="hint">${hint}</p>
    ${peopleInOrder().map(([p,i])=>`<button class="pick${p.type==="buddy"?" rec":""}" data-act="sharePick" data-i="${i}" aria-pressed="${S.shareTo===i}"><span>${personName(p)}${p.type==="buddy"?` <span class="badge">${tr("Recommended")}</span>`:""}<span class="sub">${tr(p.role)}</span></span></button>`).join("")}
    <div class="msg">${shareMessage(t,true)}</div>
    ${S.tokens<1?`<div class="card alert"><p>${tr("You need 1 token to share. Do a Reset first.")}</p></div>`:""}
    <button class="btn share" style="width:100%" data-act="shareSend" ${S.shareTo==null||S.tokens<1?"disabled":""}>${tr("Copy message and log share")}</button>`);
}
