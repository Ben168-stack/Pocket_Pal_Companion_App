/* 'Student support' bottom sheet (from the heavy-week card on Today) */
function supportMessage(){return tr("Hi, I'm a first-year student and the last few weeks have been heavy. Could I book a time to talk to someone?")}
function sheetSupport(){
  return sheet(tr("Student support"),`<p class="hint">${tr("NTU counselling and wellbeing. Free and confidential for students.")}</p>
    <div class="card"><p>${tr("You don't need to be in crisis to book a chat. Lots of students talk to someone in their first weeks.")}</p></div>
    <div class="msg">${supportMessage()}</div>
    <button class="btn share" style="width:100%" data-act="supportCopy">${tr("Copy message")}</button>
    <p class="hint" style="margin-top:12px">${tr("If you ever feel unsafe, call 995 or SOS on 1767 (24 hours).")}</p>`);
}
