/* Demo helpers: Jane's sample week and the Figma screen gallery */
function sampleWeek(){
  S=fresh();S.growth=1;S.sharesTotal=2;S.seen={admin:1};
  S.days=[
    {spent:7,recovered:2,shared:0,over:false,slept:"good",resets:1},
    {spent:12,recovered:1,shared:0,over:true,slept:"poor",resets:1},
    {spent:6,recovered:3,shared:1,over:false,slept:"ok",resets:2},
    {spent:8,recovered:2,shared:1,over:false,slept:"good",resets:1},
    {spent:5,recovered:4,shared:0,over:false,slept:"good",resets:2},
    {spent:2,recovered:3,shared:0,over:false,slept:"good",resets:1}
  ];
  S.day=6;S.slept="good";S.tokens=11;S.recovered=1;
  S.log=[{name:"Meal or chat with a friend",kind:"reset",delta:1},{name:"Slept 7h or more",kind:"sleep",delta:2}];
  S.view="week";S.ifThen="If I have two deadlines, I'll share the admin";
  toast("Sample week loaded");
}

/* ---------- gallery for Figma ---------- */
function showGallery(){
  const keep=JSON.parse(JSON.stringify(S));
  const frames=[
    ["1 Today, morning",()=>{S=fresh()}],
    ["2 Today, energetic",()=>{S=fresh();S.slept="good";S.tokens=11;S.startTokens=10;S.log=[{name:"Routine errand",kind:"self",delta:-1},{name:"Slept 7h or more",kind:"sleep",delta:2}]}],
    ["3 Today, tired",()=>{S=fresh();S.slept="ok";S.tokens=3;S.sharesTotal=1;S.log=[{name:"Academic deadline",kind:"self",delta:-3},{name:"Unfamiliar admin",kind:"self",delta:-3},{name:"Routine errand",kind:"self",delta:-1}]}],
    ["4 Today, over budget",()=>{S=fresh();S.slept="poor";S.tokens=-2;S.days=[{spent:6,recovered:2,shared:1,over:false,slept:"good",resets:1}];S.day=1;S.log=[{name:"First lab report",kind:"self",delta:-4},{name:"Unfamiliar admin",kind:"self",delta:-3},{name:"Academic deadline",kind:"self",delta:-3},{name:"Slept under 6h",kind:"sleep",delta:-2}]}],
    ["5 Log a task",()=>{S=fresh();S.slept="ok";S.seen={admin:1};S.sheet="log"}],
    ["6 Rate a task",()=>{S=fresh();S.slept="ok";S.sheet="log";S.draft={...TASKS[2]}}],
    ["7 Share it",()=>{S=fresh();S.slept="ok";S.sheet="share";S.shareFor={...TASKS[0],fullCost:3};S.shareTo=0}],
    ["8 Reset",()=>{S=fresh();S.slept="ok";S.tokens=4;S.sheet="reset"}],
    ["9 Week review",()=>{sampleWeek();S.toast=null}],
    ["10 Plan",()=>{S=fresh();S.pendingPlan="crunch";S.view="plan"}],
    ["11 People",()=>{S=fresh();S.view="people"}]
  ];
  const g=document.getElementById("gallery");
  g.innerHTML=`<div style="width:100%;text-align:center"><button class="btn primary" style="display:inline-flex" data-act="exitGallery">Back to prototype</button></div>`+
    frames.map(([label,setup])=>{setup();S.toast=null;return `<div class="frame"><div class="frame-label">${label}</div><div class="phone">${phoneHTML()}</div></div>`}).join("");
  S=keep;S.toast=null;
  document.body.classList.add("gallery");g.hidden=false;window.scrollTo(0,0);
}
document.addEventListener("click",e=>{
  if(e.target.closest('[data-act="exitGallery"]')){document.body.classList.remove("gallery");document.getElementById("gallery").hidden=true;render()}
},true);
