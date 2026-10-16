import {loadArt} from './assets.js';
export const CARD_KEY='peakway-boo-haunted-v2-card-png';
const ART_VERSION=3;
export async function createCard(number){
 const bg=await loadArt('reward-card-background');
 const c=document.createElement('canvas');c.width=bg.naturalWidth;c.height=bg.naturalHeight;
 const ctx=c.getContext('2d');ctx.drawImage(bg,0,0);
 ctx.fillStyle='#592a23';ctx.font='bold 33px Georgia, serif';ctx.textAlign='left';
 ctx.fillText(number,c.width*.49,c.height*.924,c.width*.19);
 const png=c.toDataURL('image/png');try{localStorage.setItem(CARD_KEY,JSON.stringify({number,png,artVersion:ART_VERSION}));}catch{}
 return png;
}
export async function getCard(number){try{const cached=JSON.parse(localStorage.getItem(CARD_KEY));if(cached?.number===number&&cached.artVersion===ART_VERSION&&cached.png?.startsWith('data:image/png;base64,'))return cached.png;}catch{}return createCard(number);}
