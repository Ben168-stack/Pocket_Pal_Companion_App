/* Fixed content: day names, plans, task types, reset activities */
const DAYS=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const PLANS={
  steady:{name:"Steady",start:10,note:"Standard costs and recovery. For normal weeks."},
  crunch:{name:"Crunch week",start:12,note:"Two extra tokens, but one Reset a day is required. Ends after 7 days."},
  free:{name:"Free & easy",start:10,note:"Every Reset gives 1 extra token. For recess and light weeks."},
  custom:{name:"Custom",start:10,note:"Choose your own daily tokens between 8 and 14."}
};
const TASKS=[
  {id:"admin",name:"Unfamiliar admin",ex:"Bank, visa or hall office",time:0,unfamiliar:1,strain:1},
  {id:"deadline",name:"Academic deadline",ex:"Assignment or quiz",time:1,unfamiliar:0,strain:1},
  {id:"lab",name:"First lab report",ex:"A new kind of assignment",time:1,unfamiliar:1,strain:1},
  {id:"health",name:"Healthcare visit",ex:"Seeing a doctor on campus",time:0,unfamiliar:1,strain:1},
  {id:"social",name:"Difficult conversation",ex:"Group conflict, awkward talk",time:0,unfamiliar:0,strain:1},
  {id:"errand",name:"Routine errand",ex:"Laundry, groceries",time:0,unfamiliar:0,strain:0}
];
const RESETS=[
  {id:"move",name:"Walk, swim or gym",ex:"20 minutes counts",gain:1},
  {id:"friend",name:"Meal or chat with a friend",ex:"In person or a call home",gain:1},
  {id:"hobby",name:"Something you enjoy",ex:"15 minutes, no studying",gain:1},
  {id:"off",name:"Proper break",ex:"Half a day with nothing logged",gain:3}
];
const DAILY_CAP=4;
