export const STORAGE_KEY='peakway-boo-haunted-v2';
export const names=['Monster Door Mystery',"Witch’s Potion Lab",'Ghost Train Express'];
export const riddles=[
 {answer:'pumpkin',text:"It's orange. It's round. It has a funny face. What is it?"},
 {answer:'ghost',text:"It's white. It can fly. It says Boo! What is it?"},
 {answer:'spider',text:'It has eight legs. It makes a web. What is it?'},
 {answer:'bat',text:"It's small. It is black. It can fly at night. What is it?"},
 {answer:'witch',text:'She has a magic hat and a broom. Who is she?'}];
export const ingredients=[['green-spider','green','spider'],['orange-pumpkin','orange','pumpkin'],['red-apple','red','apple'],['blue-star','blue','star'],['yellow-star','yellow','star'],['purple-bat','purple','bat'],['blue-spider','blue','spider'],['red-star','red','star']];
export const recipes=[
 {text:'Add two green spiders.',needs:{'green-spider':2}},
 {text:'Add three orange pumpkins.',needs:{'orange-pumpkin':3}},
 {text:'Add one red apple and two blue stars.',needs:{'red-apple':1,'blue-star':2}},
 {text:'Add four yellow stars.',needs:{'yellow-star':4}},
 {text:'Add two purple bats and one green spider.',needs:{'purple-bat':2,'green-spider':1}}];
export const words=['BAT','GHOST','WITCH','SPIDER','PUMPKIN'];
export const fresh=()=>({version:2,earned:[],card:null,screen:'home',mission:0,round:0,muted:false});
export const total=s=>s.earned.length;
export const missionTotal=(s,m)=>s.earned.filter(x=>x.startsWith(m+':')).length;
export function award(s,m,r){const key=`${m}:${r}`;if(!Number.isInteger(m)||m<0||m>2||!Number.isInteger(r)||r<0||r>4||s.earned.includes(key))return false;s.earned.push(key);if(total(s)===15&&!s.card){const n=new Uint32Array(1);globalThis.crypto.getRandomValues(n);s.card='B2-'+String(n[0]%1000000).padStart(6,'0');}return true;}
export function restore(raw){try{const x=JSON.parse(raw);if(x?.version!==2)return fresh();const s=fresh();s.earned=[...new Set((Array.isArray(x.earned)?x.earned:[]).filter(k=>/^[0-2]:[0-4]$/.test(k)))];s.card=total(s)===15&&/^B2-\d{6}$/.test(x.card)?x.card:null;s.muted=!!x.muted;s.mission=Number.isInteger(x.mission)&&x.mission>=0&&x.mission<3?x.mission:0;s.round=Number.isInteger(x.round)&&x.round>=0&&x.round<5?x.round:0;s.screen=['home','mission','complete','reward'].includes(x.screen)?x.screen:'home';if(s.screen==='reward'&&total(s)<15)s.screen='home';if(s.screen==='complete'&&missionTotal(s,s.mission)<5)s.screen='home';return s;}catch{return fresh();}}
export function shuffle(list){const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function addIngredient(recipe,added,id){if(!recipe.needs[id]||(added[id]||0)>=recipe.needs[id])return {accepted:false,complete:false};added[id]=(added[id]||0)+1;return {accepted:true,complete:Object.entries(recipe.needs).every(([k,n])=>added[k]===n)};}
