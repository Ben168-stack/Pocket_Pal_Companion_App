/* People screen */
function screenPeople(){
  return `<div class="screen">
    <div class="dayhead"><h1>${tr("Your people")}</h1></div>
    <p class="hint">${tr("The people you can share tasks with. Set them up now, so asking for help later is one tap.")}</p>
    ${S.people.map(p=>`<div class="person"><div class="avatar">${tr(p.name)[0]}</div><div><b>${tr(p.name)}</b><span>${tr(p.role)}</span></div></div>`).join("")}
    <div class="card"><h3>${tr("Add someone")}</h3><input type="text" data-act="newPerson" placeholder="${tr("Name, e.g. Lab partner")}" aria-label="${tr("New person's name")}"><button class="btn share" style="width:100%;margin-top:8px" data-act="addPerson">${tr("Add person")}</button></div>
    <div class="section-title">${tr("Message templates")}</div>
    <div class="msg">${tr("Hey, I'm stuck on [task]. Could you help me with it, or tell me how you handled it?")}</div>
    <div class="msg">${tr("I've got a lot on this week. Could we move [task] to next week?")}</div>
  </div>`;
}
