window.NestoraStore=(()=>{
const readStored=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
const state={cart:readStored('nestora-cart',{}),wishlist:readStored('nestora-wishlist',[]),collection:0,season:0,filters:{category:'',available:false,min:'',max:''}};

function updateCounts(){
 document.querySelector('.cart-count').textContent=Object.values(state.cart).reduce((sum,qty)=>sum+qty,0);
 document.querySelector('.wishlist-count').textContent=state.wishlist.length;
 document.querySelectorAll('.wishlist-toggle[data-id]').forEach(button=>{
  const saved=state.wishlist.includes(button.dataset.id);
  button.classList.toggle('active',saved);
  button.setAttribute('aria-pressed',String(saved));
 });
}

function persist(){
 localStorage.setItem('nestora-cart',JSON.stringify(state.cart));
 localStorage.setItem('nestora-wishlist',JSON.stringify(state.wishlist));
 updateCounts();
}

return {state,persist,updateCounts};
})();