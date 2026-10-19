window.NestoraComponents=(()=>{
 const {money,image}=window.NestoraUtils;

 function productCard(product){
  const {state}=window.NestoraStore;
  const saved=state.wishlist.includes(product.id);
  return `<article class="product-card"><div class="product-image-wrap"><a href="#/product/${product.id}" aria-label="View ${product.name}"><img loading="lazy" src="${image(product.image,650)}" alt="${product.name}" onerror="this.style.opacity='.25'"></a>${product.new?'<span class="product-tag">New</span>':''}<button class="wishlist-toggle ${saved?'active':''}" aria-label="Toggle wishlist: ${product.name}" aria-pressed="${saved}" data-action="wishlist" data-id="${product.id}"><svg viewBox="0 0 24 24"><path d="M20.5 8.8c0 4.1-8.5 10-8.5 10s-8.5-5.9-8.5-10a4.4 4.4 0 0 1 8.5-1.6 4.4 4.4 0 0 1 8.5 1.6Z"/></svg></button>${product.stock?`<button class="quick-add" data-action="add" data-id="${product.id}">Quick add · ${money(product.price)}</button>`:'<button class="quick-add" disabled>Currently unavailable</button>'}</div><div class="product-meta"><div class="product-category">${product.category}</div><a href="#/product/${product.id}" class="product-name">${product.name}</a><div class="product-price">${product.oldPrice?`<span class="old-price">${money(product.oldPrice)}</span><span class="sale-price">${money(product.price)}</span>`:money(product.price)}</div></div></article>`;
 }

 function productGrid(items){
  return items.length?`<div class="product-grid">${items.map(productCard).join('')}</div>`:`<div class="empty-state"><h2>Nothing here just yet</h2><p>Try changing your filters or explore the whole collection.</p><a class="button button-primary button-small" href="#/shop">Shop all</a></div>`;
 }

 return {productCard,productGrid};
})();