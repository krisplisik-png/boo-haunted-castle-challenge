// PNGs override individual SVG placeholders automatically. No game logic changes needed.
export const assetBase=new URL('../public/assets/',import.meta.url);
const cache=new Map();
export function resolveAsset(name){if(!cache.has(name))cache.set(name,new Promise(resolve=>{const image=new Image();image.onload=()=>resolve(new URL(name+'.png',assetBase).href);image.onerror=()=>resolve(new URL(name+'.svg',assetBase).href);image.src=new URL(name+'.png',assetBase).href;}));return cache.get(name);}
export function art(name,cls='',alt=''){return `<img class="art ${cls}" data-asset="${name}" src="${new URL(name+'.svg',assetBase).href}" alt="${alt}" draggable="false">`;}
export function hydrateAssets(root){root.querySelectorAll('[data-asset]').forEach(async img=>{const src=await resolveAsset(img.dataset.asset);if(img.isConnected)img.src=src;});}
export async function loadArt(name){const image=new Image();image.src=await resolveAsset(name);await image.decode();return image;}
