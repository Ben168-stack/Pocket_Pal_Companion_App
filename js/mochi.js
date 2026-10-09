/* Mochi mascot SVG and its speech lines */
/* ---------- Mochi ---------- */
function mochi(state,{growth=0,scarf=false}={}){
  const ry={bright:62,okay:58,tired:52,asleep:48}[state];
  const cy=118+(62-ry);
  const tint={bright:"#FFFFFF",okay:"#FBFBFD",tired:"#F1F2F7",asleep:"#E9EBF3"}[state];
  let eyes="",mouth="",extra="";
  if(state==="bright"){
    eyes=`<circle cx="76" cy="${cy-8}" r="7" fill="#1F2A44"/><circle cx="124" cy="${cy-8}" r="7" fill="#1F2A44"/><circle cx="78.5" cy="${cy-10.5}" r="2.4" fill="#fff"/><circle cx="126.5" cy="${cy-10.5}" r="2.4" fill="#fff"/>`;
    mouth=`<path d="M90 ${cy+6} q10 11 20 0" stroke="#1F2A44" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    extra=`<path d="M36 ${cy-52} l4 9 9 4 -9 4 -4 9 -4-9 -9-4 9-4z" fill="#F2B33D"/><path d="M166 ${cy-44} l3 6 6 3 -6 3 -3 6 -3-6 -6-3 6-3z" fill="#F2B33D"/>`;
  }else if(state==="okay"){
    eyes=`<circle cx="76" cy="${cy-6}" r="6" fill="#1F2A44"/><circle cx="124" cy="${cy-6}" r="6" fill="#1F2A44"/>`;
    mouth=`<path d="M93 ${cy+7} q7 6 14 0" stroke="#1F2A44" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  }else if(state==="tired"){
    eyes=`<path d="M68 ${cy-6} q8 6 16 0" stroke="#1F2A44" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M116 ${cy-6} q8 6 16 0" stroke="#1F2A44" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    mouth=`<path d="M93 ${cy+9} h14" stroke="#1F2A44" stroke-width="3.5" stroke-linecap="round"/>`;
    extra=`<path d="M154 ${cy-34} q6 10 0 14 q-6 -4 0 -14z" fill="#9CC9F0"/>`;
  }else{
    eyes=`<path d="M68 ${cy-4} q8 -6 16 0" stroke="#1F2A44" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M116 ${cy-4} q8 -6 16 0" stroke="#1F2A44" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    mouth=`<ellipse cx="100" cy="${cy+10}" rx="4" ry="3" fill="#1F2A44"/>`;
    extra=`<text x="146" y="${cy-40}" font-family="Baloo 2" font-weight="800" font-size="22" fill="#7B6CF6">z</text><text x="160" y="${cy-56}" font-family="Baloo 2" font-weight="800" font-size="16" fill="#7B6CF6">z</text>`;
  }
  const top=cy-ry;
  let sprout="";
  if(growth>=1)sprout+=`<path d="M100 ${top+2} v-16" stroke="#4FA86E" stroke-width="4" stroke-linecap="round"/><path d="M100 ${top-10} q-16 -10 -22 2 q12 8 22 -2z" fill="#4FA86E"/>`;
  if(growth>=2)sprout+=`<path d="M100 ${top-12} q16 -12 24 0 q-12 10 -24 0z" fill="#5DB37E"/>`;
  if(growth>=3)sprout+=`<circle cx="100" cy="${top-20}" r="7" fill="#F6A5B8"/><circle cx="100" cy="${top-20}" r="3" fill="#F2B33D"/>`;
  const sc=scarf?`<path d="M38 ${cy+30} q62 26 124 0 v12 q-62 26 -124 0z" fill="#2A9D8F"/><rect x="128" y="${cy+40}" width="14" height="24" rx="4" fill="#2A9D8F" transform="rotate(-8 135 ${cy+52})"/>`:"";
  return `<svg class="mochi" viewBox="0 0 200 190" role="img" aria-label="Mochi looks ${state==="bright"?"energetic":state}">
    <ellipse cx="100" cy="178" rx="70" ry="8" fill="#1F2A44" opacity=".08"/>
    ${sprout}
    <ellipse cx="100" cy="${cy}" rx="82" ry="${ry}" fill="${tint}" stroke="#1F2A44" stroke-width="3"/>
    <ellipse cx="62" cy="${cy+8}" rx="11" ry="7" fill="#F6A5B8" opacity=".75"/><ellipse cx="138" cy="${cy+8}" rx="11" ry="7" fill="#F6A5B8" opacity=".75"/>
    ${eyes}${mouth}${sc}${extra}
  </svg>`;
}
const SAYS={
  bright:"Plenty in the tank today.",
  okay:"We're doing fine. Pace it.",
  tired:"I'm getting tired. Share or Reset before the next big task?",
  asleep:"I've run out. That's your cue to rest too."
};
