const V='kalki-v3',BASE='/kalki-hema-priya-portfolio/';
const CORE=['','offline.html','404.html','style.css','script.js','favicon.svg','favicon.ico','assets/icons/favicon-32.png','assets/icons/apple-touch-icon.png','assets/icons/icon-192.png','assets/icons/icon-512.png','assets/profile.jpg','assets/projects/manufacturing.svg','assets/projects/quality.svg','assets/projects/ai-assistant.svg','assets/projects/employee.svg'].map(f=>BASE+f);
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r).then(m=>m||caches.match(BASE+'offline.html'))));return;
  }
  if(new URL(r.url).origin===location.origin){
    e.respondWith(caches.match(r).then(m=>{const net=fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));return res}).catch(()=>m);return m||net}));
  }
});
