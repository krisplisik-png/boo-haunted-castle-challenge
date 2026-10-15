import {mkdir,cp,writeFile} from 'node:fs/promises';
await mkdir('dist',{recursive:true});for(const p of ['index.html','src','public'])await cp(p,`dist/${p}`,{recursive:true});await writeFile('dist/.nojekyll','');console.log('Static GitHub Pages build ready: dist/');
