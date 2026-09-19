const CACHE='kalamat-v7-paraphrases';
const CORE=['./','./index.html?v=7','./manifest.json?v=7','./icon-192.png?v=7','./icon-512.png?v=7','./apple-touch-icon.png?v=7'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(u.hostname.includes('supabase.co')||u.hostname.includes('jsdelivr.net'))return;if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match('./index.html?v=7')));return;}e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
