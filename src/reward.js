import {loadArt} from './assets.js';
export const CARD_KEY='peakway-boo-haunted-v2-card-png';
export async function createCard(number){
 const c=document.createElement('canvas');c.width=1000;c.height=720;const ctx=c.getContext('2d');
 const [bg,boo,coin]=await Promise.all(['reward-card-background','boo','chocolate-coin'].map(loadArt));
 ctx.drawImage(bg,0,0,1000,720);ctx.textAlign='center';ctx.fillStyle='#644786';ctx.font='bold 22px Trebuchet MS, sans-serif';ctx.fillText('PEAKWAY ENGLISH STUDIO',500,65);ctx.font='18px Trebuchet MS, sans-serif';ctx.fillText('AUTUMN MAGIC FEST 2026',500,100);ctx.font='bold 43px Georgia, serif';ctx.fillText("BOO’S CASTLE CHAMPION",500,164);ctx.drawImage(boo,335,174,330,330);ctx.drawImage(coin,540,357,110,110);ctx.font='bold 24px Trebuchet MS, sans-serif';ctx.fillText('MISSION COMPLETED!',500,520);ctx.font='bold 28px Trebuchet MS, sans-serif';ctx.fillStyle='#99602f';ctx.fillText('15 / 15 CHOCOLATE COINS',500,567);ctx.fillStyle='#644786';ctx.font='bold 22px Trebuchet MS, sans-serif';ctx.fillText('REWARD CARD № '+number,500,630);ctx.font='18px Trebuchet MS, sans-serif';ctx.fillText('A little courage. A little magic. A brilliant you.',500,673);
 const png=c.toDataURL('image/png');try{localStorage.setItem(CARD_KEY,JSON.stringify({number,png}));}catch{}return png;
}
export async function getCard(number){try{const cached=JSON.parse(localStorage.getItem(CARD_KEY));if(cached?.number===number&&cached.png?.startsWith('data:image/png;base64,'))return cached.png;}catch{}return createCard(number);}
