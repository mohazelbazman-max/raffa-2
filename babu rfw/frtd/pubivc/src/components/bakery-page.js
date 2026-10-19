window.BakeryPage=(()=>{
 const products=[...window.BakeryProducts.featured,...window.BakeryProducts.gallery];
 const {money,image}=window.NestoraUtils;
 const storageKey='bakey-cart';
 let cart=readCart();

 function readCart(){try{return JSON.parse(localStorage.getItem(storageKey))||{}}catch{return {}}}
 function count(){return Object.values(cart).reduce((sum,quantity)=>sum+quantity,0)}
 function persist(){localStorage.setItem(storageKey,JSON.stringify(cart));updateCount()}
 function updateCount(){
  const badge=document.querySelector('.bakery-cart-count'),button=document.querySelector('.bakery-cart-trigger');
  if(badge)badge.textContent=String(count());
  if(button)button.setAttribute('aria-label',`Open bakery bag, ${count()} item${count()===1?'':'s'}`);
 }
 function card(product,compact=false){
  return `<article class="bakery-card ${compact?'bakery-card-compact':''}"><div class="bakery-product-image"><img src="${image(product.image,compact?650:900)}" alt="${product.alt}" width="900" height="760" loading="lazy"></div><div class="bakery-product-info"><p class="bakery-product-kicker">${compact?'From the oven':'Bakey favorite'}</p><h3>${product.name}</h3><p class="bakery-product-description">${product.description}</p><div class="bakery-product-buy"><span class="bakery-price">${money(product.price)}</span><button class="bakery-add-button" type="button" data-bakery-action="add" data-id="${product.id}"><span>${compact?'Add':'Add to Cart'}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button></div></div></article>`;
 }
 function cartMarkup(){
  const entries=Object.entries(cart).map(([id,quantity])=>({product:products.find(item=>item.id===id),quantity})).filter(item=>item.product);
  const subtotal=entries.reduce((sum,item)=>sum+item.product.price*item.quantity,0);
  return `<div class="bakery-cart-backdrop" data-bakery-action="cart-close"><aside class="bakery-cart-drawer" role="dialog" aria-modal="true" aria-labelledby="bakery-cart-title"><div class="bakery-drawer-heading"><div><p class="bakery-eyebrow">A little something good</p><h2 id="bakery-cart-title">Your bag <span>(${count()})</span></h2></div><button class="bakery-drawer-close" type="button" aria-label="Close bakery bag" data-bakery-action="cart-close">×</button></div>${entries.length?`<div class="bakery-cart-items">${entries.map(({product,quantity})=>`<article class="bakery-cart-item"><img src="${image(product.image,220)}" alt="${product.alt}" width="72" height="72"><div><h3>${product.name}</h3><span>${money(product.price)} each</span><div class="bakery-quantity"><button type="button" aria-label="Remove one ${product.name}" data-bakery-action="quantity" data-id="${product.id}" data-delta="-1">−</button><span>${quantity}</span><button type="button" aria-label="Add one ${product.name}" data-bakery-action="quantity" data-id="${product.id}" data-delta="1">+</button></div></div><strong>${money(product.price*quantity)}</strong></article>`).join('')}</div><div class="bakery-cart-summary"><div><span>Subtotal</span><strong>${money(subtotal)}</strong></div><p>Frontend demo only. No checkout or payment is connected.</p><button type="button" class="bakery-button bakery-button-primary" data-bakery-action="cart-demo">Continue to checkout</button></div>`:`<div class="bakery-cart-empty"><span aria-hidden="true">B.</span><h3>Your bag is waiting.</h3><p>Pick something fresh from the oven.</p><button class="bakery-button bakery-button-primary" type="button" data-bakery-action="cart-close">Explore the menu</button></div>`}</aside></div>`;
 }
 function render(){
  return `<div class="bakery-page" id="bakery-top"><header class="bakery-header"><a class="bakery-wordmark" href="#/bakery" data-bakery-action="top" aria-label="Bakey home"><span class="bakery-monogram">B</span><span>Bakey<span>.</span></span></a><button class="bakery-menu-toggle" type="button" aria-label="Open bakery navigation" aria-expanded="false" data-bakery-action="menu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button><nav class="bakery-nav" aria-label="Bakery navigation"><a href="#bakery-top" data-bakery-action="top">Home</a><a href="#bakery-featured" data-bakery-action="anchor">Recipes</a><a href="#bakery-features" data-bakery-action="anchor">Features</a><a href="#bakery-about" data-bakery-action="anchor">About</a><a href="#bakery-menu" data-bakery-action="anchor">Menu</a><a href="#bakery-contact" data-bakery-action="anchor">Contact</a></nav><div class="bakery-header-actions"><a class="bakery-return-link" href="#/" aria-label="Return to Nestora home">Nestora home <span aria-hidden="true">↗</span></a><button class="bakery-cart-trigger" type="button" aria-label="Open bakery bag, 0 items" data-bakery-action="cart-open"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg><span class="bakery-cart-count">0</span></button></div></header><div class="bakery-main"><section class="bakery-hero" aria-labelledby="bakery-title"><div class="bakery-hero-copy"><p class="bakery-eyebrow">Crafted with passion</p><h1 id="bakery-title"><span>FREE LUXURY</span><span>BAKERY</span></h1><p class="bakery-hero-description">Discover artisan breads and handcrafted pastries, freshly baked with carefully selected ingredients and a passion for exceptional flavor.</p><div class="bakery-hero-actions"><a class="bakery-button bakery-button-primary" href="#bakery-menu" data-bakery-action="anchor">Order Now <span aria-hidden="true">↗</span></a><a class="bakery-button bakery-button-secondary" href="#bakery-about" data-bakery-action="anchor">Learn More</a></div><p class="bakery-hero-note"><span aria-hidden="true">✳</span> Thoughtfully made. Best enjoyed slowly.</p></div><figure class="bakery-hero-visual"><img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=85" alt="Rustic artisan bread surrounded by flour and natural linen" width="1400" height="1100" fetchpriority="high"><figcaption>Small batch · Naturally leavened</figcaption></figure><span class="bakery-hero-index" aria-hidden="true">01 / FRESH FROM THE OVEN</span></section><div class="bakery-craft-strip" id="bakery-features"><span>Long fermentation</span><i>·</i><span>Carefully shaped</span><i>·</i><span>Baked with intention</span></div><section class="bakery-section" id="bakery-featured"><header class="bakery-section-heading"><p class="bakery-eyebrow">A few of our favorites</p><h2>Featured Products</h2><p>Freshly baked favorites, crafted with care.</p></header><div class="bakery-featured-grid">${window.BakeryProducts.featured.map(product=>card(product)).join('')}</div></section><section class="bakery-about" id="bakery-about"><span class="bakery-about-mark" aria-hidden="true">B.</span><div><p class="bakery-eyebrow">Good things take time</p><h2>A little patience.<br>A lot of flavor.</h2><p>We believe the best bakes begin long before they reach the oven. Carefully mixed, slowly rested, and shaped by hand, every batch is made to be savored.</p></div><a href="#bakery-menu" data-bakery-action="anchor">See what’s baking <span aria-hidden="true">→</span></a></section><section class="bakery-section bakery-gallery-section" id="bakery-menu"><header class="bakery-section-heading"><p class="bakery-eyebrow">Daily bread &amp; more</p><h2>Our Baking</h2><p>A little something fresh from the oven.</p></header><div class="bakery-gallery-grid">${window.BakeryProducts.gallery.map(product=>card(product,true)).join('')}</div></section></div><footer class="bakery-footer" id="bakery-contact"><div class="bakery-footer-grid"><section><a class="bakery-wordmark" href="#/bakery" data-bakery-action="top"><span class="bakery-monogram">B</span><span>Bakey<span>.</span></span></a><p>Slow mornings, warm bread, and the simple joy of something freshly baked.</p><div class="bakery-socials" aria-label="Social accounts not configured"><span title="Instagram account not configured">◎</span><span title="Facebook account not configured">f</span><span title="Pinterest account not configured">p</span></div><small>Social profiles not configured.</small></section><nav aria-label="Bakery explore"><h2>Explore</h2><a href="#bakery-top" data-bakery-action="top">Home</a><a href="#bakery-menu" data-bakery-action="anchor">Our Menu</a><a href="#bakery-featured" data-bakery-action="anchor">Recipes</a><a href="#bakery-featured" data-bakery-action="anchor">Featured Products</a><a href="#/" aria-label="Back to Nestora">Nestora</a></nav><nav aria-label="Bakery information"><h2>Information</h2><a href="#bakery-about" data-bakery-action="anchor">About Us</a><a href="#bakery-contact" data-bakery-action="anchor">Contact</a><a href="#bakery-contact" data-bakery-action="anchor">Frequently Asked Questions</a><a href="#bakery-privacy">Privacy Policy</a></nav><section><h2>A fresh note, now and then.</h2><p>Bakery news and seasonal bakes, delivered occasionally.</p><form class="bakery-newsletter"><label class="visually-hidden" for="bakery-email">Email address</label><div><input id="bakery-email" name="email" type="email" placeholder="Your email address" autocomplete="email" required><button type="submit" aria-label="Subscribe">→</button></div><p class="bakery-feedback" role="status" aria-live="polite"></p></form></section></div><div class="bakery-footer-bottom" id="bakery-privacy"><span>© ${new Date().getFullYear()} Bakey. Sample menu and prices for demonstration.</span><span>Privacy · This demo does not save newsletter submissions.</span></div></footer><div class="bakery-cart-root"></div><div class="bakery-toast-region" aria-live="polite" aria-atomic="true"></div></div>`;
 }
 function openCart(){const root=document.querySelector('.bakery-cart-root');if(!root)return;root.innerHTML=cartMarkup();document.body.classList.add('bakery-cart-open');root.querySelector('.bakery-drawer-close')?.focus()}
 function closeCart(){const root=document.querySelector('.bakery-cart-root');if(root)root.innerHTML='';document.body.classList.remove('bakery-cart-open')}
 function toast(message){const root=document.querySelector('.bakery-toast-region');if(!root)return;root.innerHTML=`<div class="bakery-toast">${message}</div>`;setTimeout(()=>{root.innerHTML=''},2300)}
 function initialize(){
  cart=readCart();
  const nav=document.querySelector('.bakery-nav');
  if(nav&&!nav.querySelector('.bakery-mobile-home')){
   const link=document.createElement('a');link.className='bakery-mobile-home';link.href='#/';link.textContent='Nestora home';nav.append(link);
  }
  const mobileHome=document.querySelector('.bakery-mobile-home');
  if(mobileHome)mobileHome.hidden=window.innerWidth>900;
  updateCount();
 }
 window.addEventListener('resize',()=>{const link=document.querySelector('.bakery-mobile-home');if(link)link.hidden=window.innerWidth>900});
 document.addEventListener('click',event=>{
  const control=event.target.closest('[data-bakery-action]');if(!control)return;
  const action=control.dataset.bakeryAction;
  if(action==='anchor'||action==='top'){
   event.preventDefault();
   if(action==='top')window.scrollTo({top:0,behavior:'smooth'});else document.querySelector(control.getAttribute('href'))?.scrollIntoView({behavior:'smooth',block:'start'});
   document.querySelector('.bakery-nav')?.classList.remove('bakery-nav-open');document.querySelector('.bakery-menu-toggle')?.setAttribute('aria-expanded','false');
  }
  if(action==='menu'){const nav=document.querySelector('.bakery-nav'),open=nav.classList.toggle('bakery-nav-open');control.setAttribute('aria-expanded',String(open));control.setAttribute('aria-label',open?'Close bakery navigation':'Open bakery navigation')}
  if(action==='add'){const product=products.find(item=>item.id===control.dataset.id);cart[product.id]=(cart[product.id]||0)+1;persist();toast(`${product.name} added to your bag.`)}
  if(action==='cart-open')openCart();
  if(action==='cart-close'){if(control.classList.contains('bakery-cart-backdrop')&&event.target!==control)return;closeCart()}
  if(action==='quantity'){const id=control.dataset.id,next=(cart[id]||0)+Number(control.dataset.delta);if(next<1)delete cart[id];else cart[id]=next;persist();openCart()}
  if(action==='cart-demo')toast('Demo only: checkout is not connected.');
 });
 document.addEventListener('keydown',event=>{if(event.key==='Escape')closeCart()});
 window.addEventListener('hashchange',()=>{if(!location.hash.startsWith('#/bakery'))closeCart()});
 document.addEventListener('click',event=>{
  const privacy=event.target.closest('.bakery-page a[href="#bakery-privacy"]');
  if(!privacy)return;
  event.preventDefault();document.querySelector('#bakery-privacy')?.scrollIntoView({behavior:'smooth',block:'start'});
 });
 document.addEventListener('submit',event=>{
  if(!event.target.matches('.bakery-newsletter'))return;
  event.preventDefault();const input=event.target.querySelector('input'),feedback=event.target.querySelector('.bakery-feedback');
  if(!input.checkValidity()){input.reportValidity();return}
  feedback.textContent='Thanks. This demo has not saved or sent your email.';event.target.reset();
 });
 return {render,initialize};
})();