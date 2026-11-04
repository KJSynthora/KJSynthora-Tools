(function(){
 const c=window.KNR_CONFIG||{};
 const nav=`<div class="topbar">Eye tests · Frames & lenses · Vijayawada · Open daily 10 AM–10 PM</div>
 <header class="site-header"><div class="container nav-wrap">
 <a class="logo" href="index.html" aria-label="KNR Optical home"><img src="images/knr-optical-logo.svg" alt="KNR Optical" class="site-logo"></a>
 <nav class="nav-links" id="navLinks"><a href="index.html">Home</a><a href="shop.html">Eyeglasses</a><a href="shop.html?category=Sunglasses">Sunglasses</a><a href="shop.html?category=Contact%20Lenses">Contact lenses</a><a href="brands.html">Brands</a><a href="services.html">Eye care</a><a href="wholesale.html">Wholesale</a><a href="warehouse.html">Warehouse supply</a><a href="about.html">About</a><a href="contact.html">Contact</a></nav>
 <div class="nav-actions"><a class="btn btn-small btn-outline" href="cart.html">Cart <span class="cart-count" data-cart-count>0</span></a><button class="menu-toggle" id="menuToggle" aria-label="Open menu">☰</button></div>
 </div></header>`;
 const footer=`<footer class="footer"><div class="container"><div class="footer-grid">
 <div><a class="logo" href="index.html" aria-label="KNR Optical home"><img src="images/knr-optical-logo.svg" alt="KNR Optical" class="site-logo"></a><p>See clearly. Look brilliant. Your neighbourhood destination for eyewear, lenses and eye-care assistance in Vijayawada.</p></div>
 <div><h4>Explore</h4><div class="footer-links"><a href="shop.html">Shop eyewear</a><a href="shop.html?category=Contact%20Lenses">Contact lenses</a><a href="brands.html">Brands</a><a href="services.html">Eye care</a><a href="wholesale.html">Wholesale</a><a href="warehouse.html">Warehouse supply</a></div></div>
 <div><h4>Help</h4><div class="footer-links"><a href="faq.html">FAQs</a><a href="contact.html">Contact us</a><a href="privacy.html">Privacy policy</a><a href="terms.html">Terms</a><a href="returns.html">Returns</a></div></div>
 <div><h4>Visit our store</h4><p>${c.address||""}</p><p>${c.hours||""}<br>${c.phoneDisplay||""}</p><a class="btn btn-small btn-gold" href="${c.mapsUrl||"#"}" target="_blank" rel="noopener">Get directions ↗</a></div>
 </div><div class="footer-bottom"><span>© ${new Date().getFullYear()} KNR Optical. All rights reserved.</span><span>Vijayawada, Andhra Pradesh</span></div></div></footer>
 <a class="whatsapp-float" href="#" data-whatsapp-general>◉ Chat on WhatsApp</a>`;
 document.addEventListener("DOMContentLoaded",()=>{
   document.body.insertAdjacentHTML("afterbegin",nav);
   document.body.insertAdjacentHTML("beforeend",footer);
   const toggle=document.getElementById("menuToggle"),links=document.getElementById("navLinks");
   toggle?.addEventListener("click",()=>links.classList.toggle("open"));
   document.querySelectorAll("[data-whatsapp-general]").forEach(a=>a.href=window.KNR.whatsapp("Hello KNR Optical! I would like to enquire about your eyewear and services."));
   window.KNR.updateCartCount();
 });
})();
