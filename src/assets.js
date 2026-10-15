import {sprites,sprite} from './sprites.js';
// User-provided sheets remain intact; each object is independently rendered.
// Known PNGs load directly, avoiding placeholder flashes on every interaction.
const supplied=new Set(['doors-background','potion-lab-background','train-station-background','cauldron']);
export const assetBase=new URL('../public/assets/',import.meta.url);
const cache=new Map();
export function resolveAsset(name){if(name==='castle-background')name='train-station-background';if(supplied.has(name))return Promise.resolve(new URL(name+'.png',assetBase).href);if(!cache.has(name))cache.set(name,new Promise(resolve=>{const image=new Image();image.onload=()=>resolve(new URL(name+'.png',assetBase).href);image.onerror=()=>resolve(new URL(name+'.svg',assetBase).href);image.src=new URL(name+'.png',assetBase).href;}));return cache.get(name);}
export function art(name,cls='',alt=''){if(sprites[name])return sprite(name,cls,alt);if(name==='castle-background')name='train-station-background';return `<img class="art ${cls}" data-asset="${name}" src="${new URL(name+(supplied.has(name)?'.png':'.svg'),assetBase).href}" alt="${alt}" draggable="false">`;}
export function hydrateAssets(root){root.querySelectorAll('[data-asset]').forEach(async img=>{const src=await resolveAsset(img.dataset.asset);if(img.isConnected)img.src=src;});}
export async function loadArt(name){const image=new Image();image.src=await resolveAsset(name);await image.decode();return image;}
