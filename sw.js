const C='vehicle-archive-v12',A=['./','index.html','manifest.json','icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;if(new URL(r.url).origin!==location.origin)return;
if(r.mode==='navigate'){e.respondWith(fetch('index.html',{cache:'no-cache'}).then(n=>{if(n&&n.ok){const cp=n.clone();caches.open(C).then(c=>c.put('index.html',cp))}return n}).catch(()=>caches.match('index.html')));return}
e.respondWith(caches.match(r,{ignoreSearch:true}).then(c=>{const f=fetch(r,{cache:'no-cache'}).then(n=>{if(n&&n.ok){const cp=n.clone();caches.open(C).then(x=>x.put(r,cp))}return n}).catch(()=>c);return c||f}))});
