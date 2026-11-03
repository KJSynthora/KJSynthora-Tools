const WA = "919866304224"; // your WhatsApp number: country code + number
const grid = document.getElementById("grid");
const bar = document.getElementById("filters");
let items = [], active = "all";
function esc(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function render(){
  const list = items.filter(p => active === "all" || p.category === active);
  grid.innerHTML = list.length ? list.map(p => {
    const msg = encodeURIComponent("Hi KNR Optical, I'm interested in " + p.name + " (" + p.id + ")");
    const pic = p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '">' : '<div class="ph">Photo coming soon</div>';
    return '<article class="card">' + pic + '<div class="body"><h3>' + esc(p.name) + '</h3><p class="price">₹' + p.price.toLocaleString("en-IN") + '</p>' +
      (p.inStock ? '<a class="btn" href="https://wa.me/' + WA + '?text=' + msg + '">Enquire on WhatsApp</a>' : '<p>Out of stock</p>') + '</div></article>';
  }).join("") : "<p>No products in this category yet.</p>";
}
fetch("data/products.json").then(r => r.json()).then(d => {
  items = d;
  const cats = ["all", ...new Set(d.map(p => p.category))];
  bar.innerHTML = cats.map(c => '<button aria-pressed="' + (c === active) + '" data-c="' + c + '">' + (c === "all" ? "All" : c[0].toUpperCase() + c.slice(1)) + '</button>').join("");
  bar.onclick = e => { const c = e.target.dataset.c; if (!c) return; active = c; [...bar.children].forEach(b => b.setAttribute("aria-pressed", b.dataset.c === c)); render(); };
  render();
}).catch(() => { grid.innerHTML = "<p>Catalog could not load. Please call us instead.</p>"; });

