/* App state (S): defaults, load/save to localStorage */
let S;
// type marks the First Six Weeks supports: buddy (pinned first), circle, support. People you add have no type.
function defaultPeople(){
  return [{name:"Wei Ming",role:"Year 2 EEE",type:"buddy"},{name:"Your circle",role:"Fortnightly small group",type:"circle"},{name:"Student support",role:"NTU counselling and wellbeing",type:"support"}];
}
function fresh(){
  return {plan:"steady",pendingPlan:null,customStart:10,pendingCustom:null,raises:0,
    startTokens:10,tokens:10,day:0,week:1,slept:null,recovered:0,
    log:[],later:[],days:[],seen:{},growth:0,sharesTotal:0,
    people:defaultPeople(),calmDismissed:null,
    view:"today",sheet:null,draft:null,shareFor:null,ifThen:"",toast:null};
}
// Saved under "pocketpal". Older saves under "loadout" still load (and get re-saved under the new key).
function load(){try{const v=localStorage.getItem("pocketpal")||localStorage.getItem("loadout");if(v){const s=Object.assign(fresh(),JSON.parse(v));s.tokens=Math.max(0,s.tokens);
  // saves from before the buddy existed: swap the old default people for the new ones, keep anyone the user added
  if(!s.people.some(p=>p.type==="buddy"))s.people=[...defaultPeople(),...s.people.filter(p=>p.role==="Added by you")];
  return s}}catch(e){}return fresh()}
function save(){try{localStorage.setItem("pocketpal",JSON.stringify({...S,toast:null}))}catch(e){}}
S=load();
