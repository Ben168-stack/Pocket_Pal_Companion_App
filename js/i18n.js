/* Language switching. tr("English text") returns the text in the current language.
   Translations live in js/lang/zh.js. Anything not found there is shown in English. */
const LANGS={zh:typeof ZH!=="undefined"?ZH:{}};
let LANG=(()=>{try{return localStorage.getItem("loadout-lang")||"en"}catch(e){return"en"}})();
const missing=new Set();

function tr(key,vars){
  let s=key;
  if(LANG!=="en"){
    const hit=LANGS[LANG]&&LANGS[LANG][key];
    if(hit!=null)s=hit;
    else if(!missing.has(key)){missing.add(key);console.warn(`[${LANG}] missing translation:`,key)}
  }
  if(vars)s=s.replace(/\{(\w+)\}/g,(m,k)=>k in vars?vars[k]:m);
  return s;
}
// Short day label for the Week chart: "M" in English, "一" in Chinese
function shortDay(day){return LANG==="zh"?tr(day).slice(-1):day[0]}

function setLang(l){
  LANG=l;
  try{localStorage.setItem("loadout-lang",l)}catch(e){}
  applyStaticLang();
}
// Translates fixed HTML outside the phone (elements with data-i18n="English text")
function applyStaticLang(){
  document.documentElement.lang=LANG==="zh"?"zh-Hans":"en";
  document.querySelectorAll("[data-i18n]").forEach(el=>{el.textContent=tr(el.dataset.i18n)});
}
applyStaticLang();
