import {sprites,sprite} from './sprites.js';
// User-provided sheets remain intact; each object is independently rendered.
// Known PNGs load directly, avoiding placeholder flashes on every interaction.
const supplied=new Set(['doors-background','potion-lab-background','train-station-background','cauldron','boo','locomotive','magic-chest-closed','reward-card-background','home-menu']);
export const assetBase=new URL('../public/assets/',import.meta.url);
const cache=new Map();
export function resolveAsset(name){if(name==='castle-background')name='train-station-background';if(supplied.has(name))return Promise.resolve(new URL(name+'.png',assetBase).href);if(!cache.has(name))cache.set(name,new Promise(resolve=>{const image=new Image();image.onload=()=>resolve(new URL(name+'.png',assetBase).href);image.onerror=()=>resolve(new URL(name+'.svg',assetBase).href);image.src=new URL(name+'.png',assetBase).href;}));return cache.get(name);}
export function art(name,cls='',alt=''){if(name==='ghost')name='boo';if(name==='chocolate-coin')return `<svg class="art ${cls}" viewBox="0 0 300 300" aria-hidden="true"><circle cx="150" cy="150" r="140" fill="#e7ac3b" stroke="#9d5d16" stroke-width="8"/><circle cx="150" cy="150" r="121" fill="#ffd573" stroke="#fff0af" stroke-width="5"/><image href="${new URL('boo.png',assetBase).href}" x="40" y="34" width="220" height="220"/></svg>`;if(sprites[name])return sprite(name,cls,alt);if(name==='castle-background')name='train-station-background';return `<img class="art ${cls}" data-asset="${name}" src="${new URL(name+(supplied.has(name)?'.png':'.svg'),assetBase).href}" alt="${alt}" draggable="false">`;}
export function hydrateAssets(root){root.querySelectorAll('[data-asset]').forEach(async img=>{const src=await resolveAsset(img.dataset.asset);if(img.isConnected)img.src=src;});}
export async function loadArt(name){const image=new Image();image.src=await resolveAsset(name);await image.decode();return image;}
