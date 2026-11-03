const WA="919866304224"; // WhatsApp number: country code + number
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const inr=n=>"₹"+n.toLocaleString("en-IN");
function glasses(shape,c){const L={round:'<circle cx="62" cy="52" r="32"/><circle cx="158" cy="52" r="32"/>',square:'<rect x="28" y="22" width="68" height="58" rx="10"/><rect x="124" y="22" width="68" height="58" rx="10"/>',rect:'<rect x="26" y="28" width="72" height="46" rx="7"/><rect x="122" y="28" width="72" height="46" rx="7"/>',aviator:'<path d="M28 30h68q2 34-22 46-30 6-46-46z"/><path d="M192 30h-68q-2 34 22 46 30 6 46-46z"/>',cat:'<path d="M26 34q40-14 72 0l-4 34q-30 14-62 0z"/><path d="M194 34q-40-14-72 0l4 34q30 14 62 0z"/>',hex:'<path d="M46 24h34l20 28-20 28H46L28 52z"/><path d="M140 24h34l18 28-18 28h-34l-20-28z"/>',brow:'<path d="M26 30h72v26q0 22-36 22T26 56z"/><path d="M194 30h-72v26q0 22 36 22t36-22z"/><path d="M24 28h76M120 28h76" stroke-width="9"/>',rimless:'<rect x="30" y="26" width="64" height="52" rx="26" stroke-dasharray="3 5"/><rect x="126" y="26" width="64" height="52" rx="26" stroke-dasharray="3 5"/>'}[shape]||'';
return `<svg viewBox="0 0 220 104" role="img" aria-label="${shape} frame" fill="rgba(255,255,255,.55)" stroke="${c}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">${L}<path d="M98 46q12-9 24 0M26 46L8 40M194 46l18-6" fill="none"/></svg>`}
let cart=[];try{cart=JSON.parse(localStorage.getItem("knrcart")||"[]")}catch(e){}
function save(){try{localStorage.setItem("knrcart",JSON.stringify(cart))}catch(e){}paint()}
function add(p){const x=cart.find(i=>i.id===p.id);x?x.q++:cart.push({id:p.id,name:p.name,price:p.price,q:1});save();$("#drawer").classList.add("open")}
function paint(){$("#cc").textContent=cart.reduce((a,i)=>a+i.q,0);const t=cart.reduce((a,i)=>a+i.q*i.price,0);
$("#items").innerHTML=cart.length?cart.map(i=>`<div class="row"><div><b>${esc(i.name)}</b><br>${inr(i.price)} × ${i.q}</div><div><button class="btn alt sm" data-d="${i.id}" aria-label="Remove one ${esc(i.name)}">−</button></div></div>`).join(""):"<p>Your cart is empty. Add a frame to get started.</p>";
$("#total").textContent=inr(t);const m=encodeURIComponent("Hi KNR Optical, I'd like to order:\n"+cart.map(i=>`${i.name} (${i.id}) × ${i.q} = ${inr(i.q*i.price)}`).join("\n")+"\nTotal: "+inr(t));
$("#order").href=`https://wa.me/${WA}?text=${m}`;$("#order").style.display=cart.length?"block":"none"}
document.body.insertAdjacentHTML("beforeend",`<aside class="drawer" id="drawer" aria-label="Cart"><header><div class="wrap"><h3>Your cart</h3><button class="x" id="cx" aria-label="Close cart">×</button></div></header><div class="items" id="items"></div><footer><p><b>Total: <span id="total"></span></b></p><a class="btn" id="order" href="#">Place order on WhatsApp</a><p class="meta">We confirm stock and payment details on WhatsApp.</p></footer></aside>`);
$("#cx").onclick=()=>$("#drawer").classList.remove("open");$("#cartbtn").onclick=()=>$("#drawer").classList.add("open");
$("#items").onclick=e=>{const id=e.target.dataset.d;if(!id)return;const x=cart.find(i=>i.id===id);if(x&&--x.q<1)cart=cart.filter(i=>i!==x);save()};
paint();
function card(p){return `<article class="card"><div class="pic">${p.image?`<img src="${esc(p.image)}" alt="${esc(p.name)}" style="width:100%">`:glasses(p.shape,p.hex)}</div><div class="body"><h3>${esc(p.name)}</h3><p class="meta">${esc(p.material)} · ${esc(p.color)}</p><p class="price"><b>${inr(p.price)}</b><s>${inr(p.mrp)}</s></p><button class="btn sm" data-a="${p.id}">Add to cart</button></div></article>`}
const holder=$("#grid");
if(holder){fetch("data/products.json").then(r=>r.json()).then(d=>{const feat=holder.dataset.featured;let list=feat?d.slice(0,+feat):d,act="all";
const bar=$("#filters");const draw=()=>{const l=list.filter(p=>act==="all"||p.shape===act||p.category===act);holder.innerHTML=l.length?l.map(card).join(""):"<p>No frames in this style yet.</p>"};
if(bar){const names={round:"Round",rect:"Rectangle",square:"Square",hex:"Hexagon",cat:"Cat-eye",aviator:"Aviator",brow:"Browline",rimless:"Rimless",kids:"Kids"};const k=["all",...new Set(d.map(p=>p.category==="kids"?"kids":p.shape))];
bar.innerHTML=k.map(c=>`<button aria-pressed="${c===act}" data-c="${c}">${c==="all"?"All styles":names[c]}</button>`).join("");
bar.onclick=e=>{const c=e.target.dataset.c;if(!c)return;act=c;[...bar.children].forEach(b=>b.setAttribute("aria-pressed",b.dataset.c===c));draw()}}
holder.onclick=e=>{const id=e.target.dataset.a;if(id)add(d.find(p=>p.id===id))};draw()}).catch(()=>{holder.innerHTML="<p>Catalog could not load. Please call us instead.</p>"})}
