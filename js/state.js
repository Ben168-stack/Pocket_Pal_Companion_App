/* App state (S): defaults, load/save to localStorage */
let S;
function fresh(){
  return {plan:"steady",pendingPlan:null,customStart:10,pendingCustom:null,raises:0,
    startTokens:10,tokens:10,day:0,week:1,slept:null,recovered:0,
    log:[],later:[],days:[],seen:{},growth:0,sharesTotal:0,
    people:[{name:"Hall friend",role:"Lives two floors down"},{name:"Course mate",role:"Same EEE lab group"},{name:"Senior",role:"Year 2, been through it"},{name:"Student support",role:"NTU counselling and wellbeing"}],
    view:"today",sheet:null,draft:null,shareFor:null,ifThen:"",toast:null};
}
function load(){try{const v=localStorage.getItem("loadout");if(v)return Object.assign(fresh(),JSON.parse(v))}catch(e){}return fresh()}
function save(){try{localStorage.setItem("loadout",JSON.stringify({...S,toast:null}))}catch(e){}}
S=load();
