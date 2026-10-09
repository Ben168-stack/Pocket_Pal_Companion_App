/* People screen */
function screenPeople(){
  return `<div class="screen">
    <div class="dayhead"><h1>Your people</h1></div>
    <p class="hint">The people you can share tasks with. Set them up now, so asking for help later is one tap.</p>
    ${S.people.map(p=>`<div class="person"><div class="avatar">${p.name[0]}</div><div><b>${p.name}</b><span>${p.role}</span></div></div>`).join("")}
    <div class="card"><h3>Add someone</h3><input type="text" data-act="newPerson" placeholder="Name, e.g. Lab partner" aria-label="New person's name"><button class="btn share" style="width:100%;margin-top:8px" data-act="addPerson">Add person</button></div>
    <div class="section-title">Message templates</div>
    <div class="msg">Hey, I'm stuck on [task]. Could you help me with it, or tell me how you handled it?</div>
    <div class="msg">I've got a lot on this week. Could we move [task] to next week?</div>
  </div>`;
}
