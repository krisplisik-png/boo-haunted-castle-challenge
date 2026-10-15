// Original user artwork stays intact. SVG viewBoxes select independent objects.
// Coordinates refer to the original PNG resolution, not the viewport size.
const sheets={characters:['characters-sheet.png',1448,1086],ingredients:['ingredients-sheet.png',1448,1086],doors:['doors-sheet.png',1448,1086],menu:['castle-menu.png',1672,941]};
export const sprites={};
let sequence=0;
function define(name,sheet,rect){sprites[name]={sheet:sheets[sheet],rect};}
[['pumpkin',[36,80,450,460]],['ghost',[495,65,450,475]],['spider',[943,175,495,365]],['bat',[80,540,665,430]],['witch',[760,535,660,480]]].forEach(([name,rect])=>define(name,'characters',rect));
[['green-spider',[20,155,485,385]],['orange-pumpkin',[505,65,490,480]],['red-apple',[1000,115,440,430]],['blue-star',[17,575,425,415]],['yellow-star',[450,580,410,410]],['purple-bat',[820,585,628,415]]].forEach(([name,rect])=>define(name,'ingredients',rect));
define('blue-spider','ingredients',[20,155,485,385]);
define('red-star','ingredients',[450,580,410,410]);
[['pumpkin',[15,0,480,550]],['ghost',[495,0,470,550]],['spider',[965,0,475,550]],['bat',[252,535,475,548]],['witch',[727,535,478,548]]].forEach(([name,rect])=>define('door-'+name,'doors',rect));
define('mission1-card','menu',[309,385,292,190]);
define('mission2-card','menu',[696,385,285,190]);
define('mission3-card','menu',[1072,385,290,190]);
// Each word uses its own supplied sheet; duplicate letters retain tile identity.
for(const word of ['BAT','GHOST','WITCH','SPIDER','PUMPKIN']){
 const sheet=['train-'+word.toLowerCase()+'.png',2172,724];
 const n=word.length,top=word==='BAT'?150:word==='PUMPKIN'?219:185;
 const bottom=word==='BAT'?615:word==='PUMPKIN'?504:535;
 for(let i=0;i<n;i++)sprites[`wagon-${word}-${i}`]={sheet,rect:[i*2172/n,top,2172/n,bottom-top]};
}
export function sprite(name,cls='',alt=''){
 const {sheet:[file,width,height],rect}=sprites[name];
 const clip='sprite-clip-'+(++sequence),[x,y,w,h]=rect;
 const clipHeight=['door-pumpkin','door-ghost','door-spider'].includes(name)?534:h;
 const label=alt?`role="img" aria-label="${alt}"`:'aria-hidden="true"';
 return `<svg class="art sprite ${cls}" data-sprite="${name}" viewBox="${rect.join(' ')}" preserveAspectRatio="xMidYMid ${name.startsWith('mission')?'slice':'meet'}" overflow="hidden" ${label}><defs><clipPath id="${clip}"><rect x="${x}" y="${y}" width="${w}" height="${clipHeight}"/></clipPath></defs><image clip-path="url(#${clip})" href="${new URL('../public/assets/'+file,import.meta.url).href}" width="${width}" height="${height}"/></svg>`;
}
