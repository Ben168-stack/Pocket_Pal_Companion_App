/* The mascot: all designs live here. Pick one with MASCOT below. */

/* ============ CHANGE THE MASCOT HERE ============
   "paimon"      Paimon (Genshin Impact fan art, class demo only)
   "kumoko"      Kumoko the spider (So I'm a Spider fan art, class demo only)
   "yellowBunny" yellow cartoon bunny
   "bunny"       round white bunny
   "slime"       the original slime                                  */
const MASCOT="slime";
/* ============================================= === */

const MASCOTS={
  paimon:     {name:{en:"Paimon",zh:"派蒙"},draw:drawPaimon},
  kumoko:     {name:{en:"Kumoko",zh:"蜘蛛子"},draw:drawKumoko},
  yellowBunny:{name:{en:"YellowBunny",zh:"Mochi"},draw:drawYellowBunny},
  bunny:      {name:{en:"Bunny",zh:"Mochi"},draw:drawBunny},
  slime:      {name:{en:"Mochi",zh:"Mochi"},draw:drawSlime}
};
/* Every screen calls mochi(). It draws whichever design is picked above.
   state: "bright" | "okay" | "tired" | "asleep" (picks the face)
   level: tokens left / starting tokens (0 to 1). Designs use it to tire gradually,
          a little more with every token spent. Left out (e.g. Week screen) = typical level. */
function mochi(state,opts={}){return (MASCOTS[MASCOT]||MASCOTS.yellowBunny).draw(state,opts)}
// The mascot's name in the current language. tr() swaps "Mochi" in any text for this.
function mascotName(){const m=MASCOTS[MASCOT]||MASCOTS.yellowBunny;return m.name[LANG]||m.name.en}

const SAYS={
  bright:"Plenty in the tank today.",
  okay:"We're doing fine. Pace it.",
  tired:"I'm getting tired. Share or Reset before the next big task?",
  asleep:"I've run out. That's your cue to rest too."
};

/* ---------- shared helpers ---------- */
const INK="#1F2A44";
// tiredness: 0 = full of energy, 1 = completely out
function tiredness(state,level){
  if(state==="asleep")return 1;
  return level==null?{bright:0,okay:.45,tired:.75}[state]:1-Math.min(1,Math.max(0,level));
}
function mascotLabel(state){return tr("Mochi looks "+(state==="bright"?"energetic":state))}
// weekly growth: sprout, second leaf, then a flower
function sprout(x,top,growth){
  let s="";
  if(growth>=1)s+=`<path d="M${x} ${top+2} v-16" stroke="#4FA86E" stroke-width="4" stroke-linecap="round"/><path d="M${x} ${top-10} q-16 -10 -22 2 q12 8 22 -2z" fill="#4FA86E"/>`;
  if(growth>=2)s+=`<path d="M${x} ${top-12} q16 -12 24 0 q-12 10 -24 0z" fill="#5DB37E"/>`;
  if(growth>=3)s+=`<circle cx="${x}" cy="${top-20}" r="7" fill="#F6A5B8"/><circle cx="${x}" cy="${top-20}" r="3" fill="#F2B33D"/>`;
  return s;
}
const sparkle=(x,y,s=1)=>`<path d="M${x} ${y} l${4*s} ${9*s} ${9*s} ${4*s} ${-9*s} ${4*s} ${-4*s} ${9*s} ${-4*s} ${-9*s} ${-9*s} ${-4*s} ${9*s} ${-4*s}z" fill="#F2B33D"/>`;
const sweat=(x,y)=>`<path d="M${x} ${y} q6 10 0 14 q-6 -4 0 -14z" fill="#9CC9F0"/>`;
const zzz=(x,y)=>`<text x="${x}" y="${y}" font-family="Baloo 2" font-weight="800" font-size="22" fill="#7B6CF6">z</text><text x="${x+14}" y="${y-16}" font-family="Baloo 2" font-weight="800" font-size="16" fill="#7B6CF6">z</text>`;


/* =====================================================================
   PAIMON (fan art, after her official chibi look): big fluffy white hair
   with flared tips, broken gold halo, dark star clip, starry cape.
   She floats high when energetic and sinks as tokens run out: her arm
   lowers, head tilts, and the halo tips over and fades.
   ===================================================================== */
function drawPaimon(state,{growth=0,scarf=false,level}={}){
  const f=tiredness(state,level);
  const LINE="#3A3040",HAIR="#FAFAFC",SHADE="#E3E5EF",SKIN="#FFEEE5",NAVY="#252C52",
        GOLD="#EBC88C",GOLD_D="#B98A48",EYE="#1C2244",EYE_L="#3F5A9A",CHEEK="#FFAE96";
  const lift=16*(1-f);                 // how high she floats
  const tilt=-8*f;                     // head droops to one side
  const armL=118-108*f,armR=35-25*f;   // left arm: raised when happy, hanging when tired
  const ln=(w=2.2)=>`stroke="${LINE}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const stroke=(w,c=LINE)=>`stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"`;

  /* halo: a broken gold ring with a cross-shaped ornament at the front */
  const halo=`<g transform="rotate(${(-6+20*f).toFixed(1)} 100 30)" opacity="${(1-.45*f).toFixed(2)}">
      <ellipse cx="100" cy="30" rx="34" ry="9" fill="none" stroke="${GOLD_D}" stroke-width="7.5" stroke-dasharray="31 16 200"/>
      <ellipse cx="100" cy="30" rx="34" ry="9" fill="none" stroke="${GOLD}" stroke-width="5" stroke-dasharray="31 16 200"/>
      <path d="M100 4 V40 M93 14 H107 M90 24 H110 M95 31 L100 26 L105 31" ${stroke(5.5,GOLD_D)}/>
      <path d="M100 4 V40 M93 14 H107 M90 24 H110 M95 31 L100 26 L105 31" ${stroke(3,GOLD)}/></g>`;

  /* hair: fluffy bob that flares out into points at both sides */
  const hairBack=`
    <path d="M50 138 Q40 122 39 106 Q31 106 20 102 Q29 92 34 84 Q40 46 100 42 Q160 44 166 74 Q172 82 180 86 Q172 96 165 99 Q167 126 158 142 Q149 152 139 147 L131 128 L69 128 Z" fill="${HAIR}" ${ln()}/>
    <path d="M41 108 Q44 128 52 137 Q60 128 61 110Z M162 100 Q161 128 152 143 Q143 133 141 108Z" fill="${SHADE}"/>
    <path d="M64 56 Q56 72 58 92 M138 52 Q150 66 150 86" ${stroke(1.3,"#B9BDCC")}/>`;
  const face=`
    <ellipse cx="100" cy="118" rx="38" ry="30" fill="${SKIN}"/>
    <ellipse cx="100" cy="100" rx="34" ry="9" fill="#F6D9CD" opacity=".7"/>`;
  // bangs: side-swept strands, one dipping between the eyes, plus locks framing the face
  const edge="M54 98 Q56 120 61 137 Q66 118 68 102 Q74 100 78 106 Q80 96 85 90 Q86 102 90 114 Q92 98 96 90 Q100 96 104 100 Q106 92 110 86 Q120 98 129 111 Q130 100 132 96 Q132 120 138 143 Q145 120 146 96";
  const bangs=`<path d="${edge} L146 64 L54 64Z" fill="${HAIR}"/><path d="${edge}" fill="none" ${ln()}/>
    <path d="M84 70 Q80 82 84 92 M104 66 Q108 80 106 92" ${stroke(1.2,"#C3C7D4")}/>`;
  // her clip: a long dark four-pointed star
  const clip=`<g transform="translate(10 3)"><path d="M114 58 Q117 73 129 70 Q119 78 121 98 Q114 81 108 78 Q115 74 114 58Z" fill="${NAVY}" ${ln(1.6)}/>
    <path d="M114 58 Q117 73 129 70 Q118 76 115 78Z" fill="#4A5582"/></g>`;

  /* face details */
  const ey=124,EL=81,ER=119;
  const lash=(x,side)=>`<path d="M${x-10} ${ey-7} Q${x} ${ey-16} ${x+10} ${ey-8}" ${stroke(3.4)}/>
      <path d="M${side<0?x-10:x+10} ${side<0?ey-7:ey-8} l${side*4} -2.5" ${stroke(2.4)}/>`;
  const openEye=(x,side)=>`
      <ellipse cx="${x}" cy="${ey}" rx="9" ry="11.5" fill="${EYE}"/>
      <ellipse cx="${x}" cy="${ey+4}" rx="7" ry="6.5" fill="${EYE_L}"/>
      <circle cx="${x-3}" cy="${ey-4.5}" r="3.2" fill="#fff"/><circle cx="${x+3.5}" cy="${ey+4.5}" r="1.5" fill="#fff"/>
      <circle cx="${x+1}" cy="${ey+1}" r=".8" fill="#fff" opacity=".9"/><circle cx="${x-4}" cy="${ey+5}" r=".7" fill="#fff" opacity=".8"/>
      ${lash(x,side)}`;
  const closedEye=(x,side)=>`<path d="M${x-10} ${ey+1} Q${x} ${ey-8} ${x+10} ${ey+1}" ${stroke(3.4)}/><path d="M${side<0?x-10:x+10} ${ey+1} l${side*4} 1" ${stroke(2.4)}/>`;
  const sleepEye=(x)=>`<path d="M${x-10} ${ey-1} Q${x} ${ey+7} ${x+10} ${ey-1}" ${stroke(3.2)}/>`;
  const cheek=x=>`<ellipse cx="${x}" cy="137" rx="9" ry="5" fill="${CHEEK}" opacity=".5"/><path d="M${x-4} 139 l2 -4 M${x} 139 l2 -4 M${x+4} 139 l2 -4" ${stroke(1,"#F0876C")}/>`;
  let eyes="",mouth="",extra="";
  if(state==="bright"){
    // a cheeky wink, like her official chibi art
    eyes=openEye(EL,-1)+closedEye(ER,1);
    mouth=`<path d="M90 136 Q95 134 100 137 Q105 134 110 136 Q109 151 100 151 Q91 151 90 136Z" fill="#A8443F" ${ln(2)}/><path d="M93 146 Q100 141 107 146 Q104 150 100 150 Q96 150 93 146Z" fill="#F29A90"/>`;
    extra=sparkle(18,104)+sparkle(30,124,.55)+sparkle(170,118,.6);
  }else if(state==="okay"){
    eyes=openEye(EL,-1)+openEye(ER,1);
    mouth=`<path d="M93 138 q3.5 4 7 0 q3.5 4 7 0" ${stroke(2.2)}/>`;
  }else if(state==="tired"){
    // heavy eyelids cover the top of each eye
    const lid=x=>`<path d="M${x-9.5} ${ey+1} A9.5 12 0 0 1 ${x+9.5} ${ey+1}Z" fill="${SKIN}"/><path d="M${x-10} ${ey+1} Q${x} ${ey-2} ${x+10} ${ey+1}" ${stroke(3.2)}/>`;
    eyes=openEye(EL,-1)+openEye(ER,1)+lid(EL)+lid(ER);
    mouth=`<path d="M94 140 q3 -2.5 6 0 q3 2.5 6 0" ${stroke(2)}/>`;
    extra=sweat(150,100);
  }else{
    eyes=sleepEye(EL)+sleepEye(ER);
    // snoozing: tiny mouth and a sleep bubble
    mouth=`<ellipse cx="100" cy="141" rx="2.6" ry="2.2" fill="#A8443F"/><circle cx="112" cy="134" r="5.5" fill="#D9ECFF" opacity=".8" stroke="#9CC4EC" stroke-width="1"/><circle cx="110.5" cy="132.5" r="1.4" fill="#fff"/>`;
    extra=zzz(152,52);
  }
  const details=`${cheek(68)}${cheek(132)}<circle cx="100" cy="132" r=".9" fill="${LINE}"/>`;

  /* body: starry cape, ruffled collar, white tunic with jagged gold hem, white-and-gold boots */
  const collar=scarf?"#2A9D8F":NAVY;   // the collar turns teal once she's earned the sharing scarf
  const body=`
    <path d="M86 152 Q58 178 66 210 Q86 198 100 194 Q118 200 142 210 Q148 178 116 152Z" fill="${NAVY}" ${ln()}/>
    <path d="M74 196 L82 186 L90 192 M124 194 L130 186" ${stroke(.8,"#9FB4E8")}/>
    <circle cx="74" cy="196" r="1.8" fill="#fff"/><circle cx="82" cy="186" r="1.2" fill="#fff"/><circle cx="90" cy="192" r="1.4" fill="#fff"/><circle cx="130" cy="186" r="1.8" fill="#fff"/><circle cx="124" cy="194" r="1.1" fill="#fff"/>
    <rect x="87" y="178" width="11" height="20" rx="5" fill="#fff" ${ln()}/>
    <rect x="104" y="176" width="11" height="17" rx="5" fill="#fff" ${ln()} transform="rotate(-24 109 178)"/>
    <path d="M86 194 L99 194 L100 204 Q93 207 85 204Z" fill="#F4F1EC" ${ln()}/><path d="M86 194 L89 198 L92.5 194 L96 198 L99 194" fill="${GOLD}" ${ln(1.4)}/>
    <g transform="rotate(-24 109 178)"><path d="M103 190 L116 190 L117 200 Q110 203 102 200Z" fill="#F4F1EC" ${ln()}/><path d="M103 190 L106 194 L109.5 190 L113 194 L116 190" fill="${GOLD}" ${ln(1.4)}/></g>
    <path d="M85 150 Q100 155 115 150 L122 180 Q100 186 78 180Z" fill="#fff" ${ln()}/>
    <path d="M77 178 L81 187 L86 181 L91 189 L96 182 L100 190 L104 182 L109 189 L114 181 L119 187 L123 178 Q100 184 77 178Z" fill="${GOLD}" ${ln(1.6)}/>
    <path d="M96 162 Q100 158 104 162 Q100 168 96 162Z M100 166 v5" fill="${GOLD}" ${stroke(1.2,GOLD_D)}/>
    <path d="M78 147 Q100 156 122 147 L124 157 Q118 152 113 159 Q107 153 101 161 Q95 153 89 159 Q83 152 76 157Z" fill="${collar}" ${ln(1.8)}/>`;
  // bell sleeve with a big gold cuff and a little hand
  const arm=(x,a)=>`<g transform="rotate(${a.toFixed(1)} ${x} 154)">
      <path d="M${x-5} 154 L${x+5} 154 L${x+6} 170 L${x-6} 170Z" fill="#fff" ${ln()}/>
      <path d="M${x-6} 168 L${x+6} 168 L${x+8.5} 180 L${x-8.5} 180Z" fill="${GOLD}" ${ln()}/>
      <circle cx="${x}" cy="184" r="4.6" fill="${SKIN}" ${ln(1.8)}/></g>`;

  return `<svg class="mochi" viewBox="-12 -12 224 234" role="img" aria-label="${mascotLabel(state)}">
    <ellipse cx="100" cy="216" rx="${(28+14*f).toFixed(1)}" ry="5" fill="${INK}" opacity="${(.06+.06*f).toFixed(2)}"/>
    <g transform="translate(0 ${(-lift).toFixed(1)})">
      ${body}${arm(116,-armR)}
      <g transform="rotate(${tilt.toFixed(1)} 100 152)">${halo}${hairBack}${face}${eyes}${details}${mouth}${bangs}${clip}${sprout(144,53,growth)}</g>
      ${arm(84,armL)}
      ${extra}
    </g>
  </svg>`;
}


/* =====================================================================
   YELLOW BUNNY: big head, long ears, buck teeth, cream belly.
   With every token spent the ears droop, arms drop, head tilts, fur fades.
   ===================================================================== */
function drawYellowBunny(state,{growth=0,scarf=false,level}={}){
  const LINE="#E39B17",CREAM="#FFF6D6",PINK="#F6A5B8",MOUTH="#6B1218";
  const FUR={bright:"#FFEC5C",okay:"#FCEA7E",tired:"#EFE3A6",asleep:"#E3DDC6"}[state];
  const f=tiredness(state,level);
  const droop=4+92*Math.pow(f,1.5);   // ear angle: 4 = upright, 96 = flopped sideways
  const arm=34-30*f;                   // arm angle: 34 = lifted happily, 4 = hanging
  const tilt=-7*f;                     // head leans over as it tires
  const hy=110+5*f;                    // head centre sinks a little
  const out=`stroke="${LINE}" stroke-width="3"`;
  const ink=w=>`stroke="${INK}" stroke-width="${w}" fill="none" stroke-linecap="round"`;

  const limb=(x,a)=>`<ellipse cx="${x}" cy="168" rx="8" ry="17" fill="${FUR}" ${out} transform="rotate(${a.toFixed(1)} ${x} 154)"/>`;
  const body=`
    <circle cx="131" cy="192" r="9" fill="${CREAM}" ${out}/>
    ${limb(72,arm)}${limb(128,-arm)}
    <ellipse cx="100" cy="178" rx="32" ry="28" fill="${FUR}" ${out}/>
    <ellipse cx="100" cy="183" rx="18" ry="20" fill="${CREAM}"/>
    <ellipse cx="85" cy="206" rx="13" ry="7" fill="${FUR}" ${out}/><ellipse cx="115" cy="206" rx="13" ry="7" fill="${FUR}" ${out}/>`;

  const spread=3*f;
  const ear=(x,a)=>`<g transform="rotate(${a.toFixed(1)} ${x} ${hy-32})">
      <ellipse cx="${x}" cy="${hy-66}" rx="15" ry="38" fill="${FUR}" ${out}/>
      <ellipse cx="${x}" cy="${hy-62}" rx="7.5" ry="27" fill="${CREAM}"/></g>`;
  const ears=ear(84-spread,-droop)+ear(116+spread,droop+(f>.15?8*f:0)); // right ear is a bit floppier

  const ey=hy-6,my=hy+20;
  const white=x=>`<ellipse cx="${x}" cy="${ey}" rx="11" ry="14" fill="#fff" stroke="${INK}" stroke-width="2.5"/>`;
  const teeth=(y,h)=>`<rect x="94" y="${y}" width="6" height="${h}" rx="1.5" fill="#fff" stroke="${INK}" stroke-width="1.5"/><rect x="100" y="${y}" width="6" height="${h}" rx="1.5" fill="#fff" stroke="${INK}" stroke-width="1.5"/>`;
  let eyes="",mouth="",extra="";
  if(state==="bright"){
    eyes=white(80)+white(120)+`<ellipse cx="82" cy="${ey-1}" rx="6" ry="8" fill="${INK}"/><ellipse cx="118" cy="${ey-1}" rx="6" ry="8" fill="${INK}"/><circle cx="84" cy="${ey-4}" r="2.2" fill="#fff"/><circle cx="120" cy="${ey-4}" r="2.2" fill="#fff"/>`;
    mouth=`<path d="M77 ${my-4} Q100 ${my} 123 ${my-4} Q119 ${my+21} 100 ${my+21} Q81 ${my+21} 77 ${my-4}Z" fill="${MOUTH}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
      <ellipse cx="100" cy="${my+16}" rx="10" ry="4" fill="#C9505A"/>${teeth(my-3,9)}`;
    extra=sparkle(26,54)+sparkle(172,72,.7);
  }else if(state==="okay"){
    eyes=white(80)+white(120)+`<ellipse cx="81" cy="${ey+1}" rx="5" ry="6.5" fill="${INK}"/><ellipse cx="119" cy="${ey+1}" rx="5" ry="6.5" fill="${INK}"/>`;
    mouth=`${teeth(my+3,7)}<path d="M85 ${my} q15 11 30 0" ${ink(3)}/>`;
  }else if(state==="tired"){
    const lid=x=>`<path d="M${x-11} ${ey+1} A11 14 0 0 1 ${x+11} ${ey+1}Z" fill="${FUR}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;
    eyes=white(80)+white(120)+`<circle cx="81" cy="${ey+5}" r="4.5" fill="${INK}"/><circle cx="119" cy="${ey+5}" r="4.5" fill="${INK}"/>`+lid(80)+lid(120);
    mouth=`${teeth(my+4,5)}<path d="M90 ${my+4} q10 -2 20 0" ${ink(3)}/>`;
    extra=sweat(150,hy-34);
  }else{
    eyes=`<path d="M70 ${ey} q10 8 20 0 M110 ${ey} q10 8 20 0" ${ink(3.5)}/>`;
    mouth=`<ellipse cx="100" cy="${my+7}" rx="4" ry="3.5" fill="${MOUTH}"/>`;
    extra=zzz(150,hy-58);
  }
  const nose=`<ellipse cx="100" cy="${hy+9}" rx="5.5" ry="4" fill="${PINK}" stroke="${INK}" stroke-width="1.8"/>`;
  const sc=scarf?`<path d="M66 150 q34 12 68 0 v10 q-34 12 -68 0z" fill="#2A9D8F"/><rect x="113" y="157" width="12" height="20" rx="4" fill="#2A9D8F" transform="rotate(-10 119 167)"/>`:"";

  return `<svg class="mochi" viewBox="-12 0 224 222" role="img" aria-label="${mascotLabel(state)}">
    <ellipse cx="100" cy="213" rx="52" ry="6" fill="${INK}" opacity=".08"/>
    ${body}
    <g transform="rotate(${tilt.toFixed(1)} 100 150)">
      ${ears}${sprout(100,hy-42,growth)}
      <ellipse cx="100" cy="${hy}" rx="50" ry="42" fill="${FUR}" ${out}/>
      <circle cx="61" cy="${hy+12}" r="9" fill="${PINK}" opacity=".85"/><circle cx="139" cy="${hy+12}" r="9" fill="${PINK}" opacity=".85"/>
      ${eyes}${nose}${mouth}
    </g>
    ${sc}${extra}
  </svg>`;
}


/* =====================================================================
   ROUND WHITE BUNNY: ears droop and body slumps with every token spent.
   ===================================================================== */
function drawBunny(state,{growth=0,scarf=false,level}={}){
  const PINK="#F6A5B8";
  const f=tiredness(state,level);
  const droop=4+92*Math.pow(f,1.5);
  const ry=54-8*f;                               // body gets squashier as it tires
  const cy=172-ry,top=cy-ry,fy=cy-4;             // body centre, head top, face line
  const tint={bright:"#FFFFFF",okay:"#FBFBFD",tired:"#F1F2F7",asleep:"#E9EBF3"}[state];
  const line=`stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"`;

  const ear=(x,angle)=>`<g transform="rotate(${angle.toFixed(1)} ${x} ${top+12})">
      <ellipse cx="${x}" cy="${top-18}" rx="14" ry="33" fill="${tint}" stroke="${INK}" stroke-width="3"/>
      <ellipse cx="${x}" cy="${top-16}" rx="6.5" ry="22" fill="${PINK}" opacity=".8"/></g>`;
  const spread=10*f;
  const ears=ear(80-spread,-droop)+ear(120+spread,droop+(f>.15?8*f:0));

  const nose=`<ellipse cx="100" cy="${fy+7}" rx="4.5" ry="3.2" fill="${PINK}" stroke="${INK}" stroke-width="1.5"/>`;
  let eyes="",mouth="",extra="";
  if(state==="bright"){
    eyes=`<circle cx="80" cy="${fy-4}" r="7" fill="${INK}"/><circle cx="120" cy="${fy-4}" r="7" fill="${INK}"/><circle cx="82.5" cy="${fy-6.5}" r="2.4" fill="#fff"/><circle cx="122.5" cy="${fy-6.5}" r="2.4" fill="#fff"/>`;
    mouth=`<path d="M91 ${fy+12} q4.5 6 9 0 q4.5 6 9 0" ${line}/>`;
    extra=sparkle(30,top+6)+sparkle(168,top+18,.7);
  }else if(state==="okay"){
    eyes=`<circle cx="80" cy="${fy-3}" r="6" fill="${INK}"/><circle cx="120" cy="${fy-3}" r="6" fill="${INK}"/>`;
    mouth=`<path d="M93 ${fy+12} q3.5 4 7 0 q3.5 4 7 0" ${line}/>`;
  }else if(state==="tired"){
    eyes=`<path d="M74 ${fy-2} a6 6 0 0 0 12 0z" fill="${INK}"/><path d="M114 ${fy-2} a6 6 0 0 0 12 0z" fill="${INK}"/><path d="M71 ${fy} q8 -5 17 -2 M112 ${fy-2} q9 -3 17 2" ${line}/>`;
    mouth=`<path d="M95 ${fy+13} h10" ${line}/>`;
    extra=sweat(148,fy-22);
  }else{
    eyes=`<path d="M73 ${fy-2} q7 6 14 0 M113 ${fy-2} q7 6 14 0" ${line}/>`;
    mouth=`<ellipse cx="100" cy="${fy+14}" rx="3" ry="2.5" fill="${INK}"/>`;
    extra=zzz(150,top-6);
  }
  const sc=scarf?`<path d="M36 ${cy+14} q64 22 128 0 v11 q-64 22 -128 0z" fill="#2A9D8F"/><rect x="124" y="${cy+24}" width="13" height="22" rx="4" fill="#2A9D8F" transform="rotate(-8 130 ${cy+35})"/>`:"";

  return `<svg class="mochi" viewBox="0 0 200 190" role="img" aria-label="${mascotLabel(state)}">
    <ellipse cx="100" cy="178" rx="70" ry="8" fill="${INK}" opacity=".08"/>
    ${ears}${sprout(100,top,growth)}
    <circle cx="168" cy="${cy+18}" r="11" fill="${tint}" stroke="${INK}" stroke-width="3"/>
    <ellipse cx="100" cy="${cy}" rx="72" ry="${ry}" fill="${tint}" stroke="${INK}" stroke-width="3"/>
    <ellipse cx="74" cy="170" rx="14" ry="7" fill="${tint}" stroke="${INK}" stroke-width="3"/><ellipse cx="126" cy="170" rx="14" ry="7" fill="${tint}" stroke="${INK}" stroke-width="3"/>
    <ellipse cx="64" cy="${fy+9}" rx="10" ry="6" fill="${PINK}" opacity=".75"/><ellipse cx="136" cy="${fy+9}" rx="10" ry="6" fill="${PINK}" opacity=".75"/>
    ${eyes}${nose}${mouth}${sc}${extra}
  </svg>`;
}


/* =====================================================================
   SLIME (the original design): four fixed poses, one per energy state.
   ===================================================================== */
function drawSlime(state,{growth=0,scarf=false}={}){
  const ry={bright:62,okay:58,tired:52,asleep:48}[state];
  const cy=118+(62-ry);
  const tint={bright:"#FFFFFF",okay:"#FBFBFD",tired:"#F1F2F7",asleep:"#E9EBF3"}[state];
  let eyes="",mouth="",extra="";
  if(state==="bright"){
    eyes=`<circle cx="76" cy="${cy-8}" r="7" fill="${INK}"/><circle cx="124" cy="${cy-8}" r="7" fill="${INK}"/><circle cx="78.5" cy="${cy-10.5}" r="2.4" fill="#fff"/><circle cx="126.5" cy="${cy-10.5}" r="2.4" fill="#fff"/>`;
    mouth=`<path d="M90 ${cy+6} q10 11 20 0" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    extra=sparkle(36,cy-52)+sparkle(166,cy-44,.7);
  }else if(state==="okay"){
    eyes=`<circle cx="76" cy="${cy-6}" r="6" fill="${INK}"/><circle cx="124" cy="${cy-6}" r="6" fill="${INK}"/>`;
    mouth=`<path d="M93 ${cy+7} q7 6 14 0" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  }else if(state==="tired"){
    eyes=`<path d="M68 ${cy-6} q8 6 16 0" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M116 ${cy-6} q8 6 16 0" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    mouth=`<path d="M93 ${cy+9} h14" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`;
    extra=sweat(154,cy-34);
  }else{
    eyes=`<path d="M68 ${cy-4} q8 -6 16 0" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M116 ${cy-4} q8 -6 16 0" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    mouth=`<ellipse cx="100" cy="${cy+10}" rx="4" ry="3" fill="${INK}"/>`;
    extra=zzz(146,cy-40);
  }
  const sc=scarf?`<path d="M38 ${cy+30} q62 26 124 0 v12 q-62 26 -124 0z" fill="#2A9D8F"/><rect x="128" y="${cy+40}" width="14" height="24" rx="4" fill="#2A9D8F" transform="rotate(-8 135 ${cy+52})"/>`:"";
  return `<svg class="mochi" viewBox="0 0 200 190" role="img" aria-label="${mascotLabel(state)}">
    <ellipse cx="100" cy="178" rx="70" ry="8" fill="${INK}" opacity=".08"/>
    ${sprout(100,cy-ry,growth)}
    <ellipse cx="100" cy="${cy}" rx="82" ry="${ry}" fill="${tint}" stroke="${INK}" stroke-width="3"/>
    <ellipse cx="62" cy="${cy+8}" rx="11" ry="7" fill="#F6A5B8" opacity=".75"/><ellipse cx="138" cy="${cy+8}" rx="11" ry="7" fill="#F6A5B8" opacity=".75"/>
    ${eyes}${mouth}${sc}${extra}
  </svg>`;
}


/* =====================================================================
   KUMOKO (fan art): a round spotted spider with big pink eyes.
   As tokens run out her body sinks, her eight legs splay outward,
   and her raised front arms droop down to her sides.
   ===================================================================== */
function drawKumoko(state,{growth=0,scarf=false,level}={}){
  const f=tiredness(state,level);
  const LINE="#2E2E36",WHITE="#F4F4F6",SPOT="#5C5C66",DARK="#45454F",PINK="#F08CB0",EYE="#E8508F",EYE_D="#9E1F57";
  const drop=14*f;                     // body sinks toward the ground
  const hy=112+drop;                   // head centre
  const tilt=-6*f;                     // head tilts as she tires
  const stroke=(w,c=LINE)=>`stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
  const ln=(w=2.6)=>`stroke="${LINE}" stroke-width="${w}" stroke-linejoin="round"`;
  const clipId="kab"+Math.random().toString(36).slice(2,8);   // unique per drawing

  /* abdomen: big round body with dark spots (clipped to the body outline) */
  const acy=84+drop*.6,arx=76,ary=64-5*f;
  const spots=[[100,acy-ary+4,15],[54,acy-ary+20,13],[146,acy-ary+20,13],[26,acy+4,14],[174,acy+4,14],[76,acy-24,7],[124,acy-24,7]]
    .map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${SPOT}"/>`).join("");
  const abdomen=`<defs><clipPath id="${clipId}"><ellipse cx="100" cy="${acy}" rx="${arx}" ry="${ary}"/></clipPath></defs>
    <ellipse cx="100" cy="${acy}" rx="${arx}" ry="${ary}" fill="#E9E9ED"/>
    <g clip-path="url(#${clipId})">${spots}</g>
    <ellipse cx="100" cy="${acy}" rx="${arx}" ry="${ary}" fill="none" ${ln(3)}/>`;

  /* legs: 4 a side, white with a pink band at the hip and dark lower half.
     Feet stay on the ground; knees drop and spread out as she tires. */
  const leg=(s,i)=>{
    const hx=100+s*(12+i*4),hyy=hy+16+i*3;
    const kx=100+s*(36+i*14+8*f),ky=hy-8+i*11+16*f;
    const fx=100+s*(30+i*16+12*f),fy=180;
    const mx=(kx+fx)/2,my=(ky+fy)/2;
    const px=hx+(kx-hx)*.45,py=hyy+(ky-hyy)*.45;
    const path=`M${hx} ${hyy} L${kx.toFixed(1)} ${ky.toFixed(1)} L${fx.toFixed(1)} ${fy}`;
    return `<path d="${path}" ${stroke(11)}/><path d="${path}" ${stroke(6.5,"#E2E2E8")}/>
      <path d="M${hx} ${hyy} L${px.toFixed(1)} ${py.toFixed(1)}" ${stroke(6.5,PINK)}/>
      <path d="M${mx.toFixed(1)} ${my.toFixed(1)} L${fx.toFixed(1)} ${fy}" ${stroke(6.5,DARK)}/>`;
  };
  // back legs first so the front pair overlaps them
  const legs=[3,2,1,0].map(i=>leg(-1,i)+leg(1,i)).join("");

  /* front arms (pedipalps): raised like ears when happy, drooping when tired */
  const arm=s=>{
    const bx=100+s*13,by=hy-22;
    const path=`M${bx} ${by} L${bx+s*13} ${by-30} L${bx+s*4} ${by-42}`;
    return `<g transform="rotate(${(s*78*f).toFixed(1)} ${bx} ${by})">
      <path d="${path}" ${stroke(10)}/><path d="${path}" ${stroke(5.5,"#F8F8FA")}/>
      <path d="M${bx+s*8.5} ${by-20} L${bx+s*13} ${by-30} L${bx+s*4} ${by-42}" ${stroke(5.5,PINK)}/></g>`;
  };

  /* head: white face framed by a jagged dark crown */
  let crown="";
  for(let k=0;k<=12;k++){
    const a=Math.PI*(1+k/12),r=k%2?50:38;
    crown+=`${k?"L":"M"}${(100+r*Math.cos(a)).toFixed(1)} ${(hy+r*Math.sin(a)).toFixed(1)} `;
  }
  const head=`
    <path d="${crown}Z" fill="${DARK}" ${ln(2.2)}/>
    <ellipse cx="100" cy="${hy+20}" rx="27" ry="9" fill="${DARK}"/>
    <path d="M66 ${hy+4} Q64 ${hy-30} 100 ${hy-32} Q136 ${hy-30} 134 ${hy+4} Q132 ${hy+24} 100 ${hy+26} Q68 ${hy+24} 66 ${hy+4}Z" fill="${WHITE}" ${ln(2.6)}/>
    <circle cx="91" cy="${hy-15}" r="2.3" fill="${EYE_D}"/><circle cx="97" cy="${hy-19}" r="2.3" fill="${EYE_D}"/><circle cx="103" cy="${hy-19}" r="2.3" fill="${EYE_D}"/><circle cx="109" cy="${hy-15}" r="2.3" fill="${EYE_D}"/>
    <circle cx="73" cy="${hy+1}" r="2.2" fill="${PINK}" stroke="${EYE_D}" stroke-width="1"/><circle cx="127" cy="${hy+1}" r="2.2" fill="${PINK}" stroke="${EYE_D}" stroke-width="1"/>
    <ellipse cx="78" cy="${hy+13}" rx="5.5" ry="3" fill="${PINK}" opacity=".55"/><ellipse cx="122" cy="${hy+13}" rx="5.5" ry="3" fill="${PINK}" opacity=".55"/>`;

  /* face */
  const ey=hy+2,EL=88,ER=112;
  const openEye=(x,side)=>`
      <ellipse cx="${x}" cy="${ey}" rx="8" ry="10" fill="#fff" stroke="${LINE}" stroke-width="1.6"/>
      <ellipse cx="${x}" cy="${ey+1}" rx="6.2" ry="8.4" fill="${EYE}"/>
      <ellipse cx="${x}" cy="${ey+2}" rx="3.2" ry="4.6" fill="${EYE_D}"/>
      <circle cx="${x-2.4}" cy="${ey-3.5}" r="2.4" fill="#fff"/><circle cx="${x+2.4}" cy="${ey+4.5}" r="1.2" fill="#fff"/>
      <path d="M${x-9} ${ey-6} Q${x} ${ey-13} ${x+9} ${ey-6}" ${stroke(3)}/><path d="M${x+side*9} ${ey-6} l${side*3} -2" ${stroke(2)}/>`;
  let eyes="",mouth="",extra="";
  const fangs=`<path d="M94 ${hy+19} L97 ${hy+23} M106 ${hy+19} L103 ${hy+23}" ${stroke(2)}/>`;
  if(state==="bright"){
    eyes=openEye(EL,-1)+openEye(ER,1);
    mouth=`<path d="M95 ${hy+15} q2.5 3 5 0 q2.5 3 5 0" ${stroke(2)}/>`+fangs;
    extra=sparkle(18,38)+sparkle(172,52,.7);
  }else if(state==="okay"){
    eyes=openEye(EL,-1)+openEye(ER,1);
    mouth=`<path d="M97 ${hy+16} l3 2 3 -2" ${stroke(2)}/>`+fangs;
  }else if(state==="tired"){
    const lid=x=>`<path d="M${x-8.5} ${ey+1} A8.5 10.5 0 0 1 ${x+8.5} ${ey+1}Z" fill="${WHITE}"/><path d="M${x-9} ${ey+1} Q${x} ${ey-2} ${x+9} ${ey+1}" ${stroke(2.8)}/>`;
    eyes=openEye(EL,-1)+openEye(ER,1)+lid(EL)+lid(ER);
    mouth=`<path d="M95 ${hy+17} q2.5 -2 5 0 q2.5 2 5 0" ${stroke(1.8)}/>`+fangs;
    extra=sweat(140,hy-30);
  }else{
    eyes=`<path d="M${EL-8} ${ey} q8 6 16 0 M${ER-8} ${ey} q8 6 16 0" ${stroke(2.8)}/>`;
    mouth=`<ellipse cx="100" cy="${hy+17}" rx="2" ry="1.8" fill="${EYE_D}"/>`;
    extra=zzz(150,hy-46);
  }

  const sc=scarf?`<path d="M72 ${hy+20} q28 12 56 0 v7 q-28 12 -56 0z" fill="#2A9D8F"/><rect x="114" y="${hy+26}" width="10" height="15" rx="3" fill="#2A9D8F" transform="rotate(-12 119 ${hy+33})"/>`:"";

  return `<svg class="mochi" viewBox="-6 -6 212 200" role="img" aria-label="${mascotLabel(state)}">
    <ellipse cx="100" cy="182" rx="${(84+8*f).toFixed(1)}" ry="7" fill="${INK}" opacity=".08"/>
    ${abdomen}${sprout(100,acy-ary+2,growth)}
    ${legs}
    <g transform="rotate(${tilt.toFixed(1)} 100 ${hy+20})">${arm(-1)}${arm(1)}${head}${eyes}${mouth}</g>
    ${sc}${extra}
  </svg>`;
}
