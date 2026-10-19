window.NestoraUtils=(()=>{
 const money=value=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(value);
 const image=(id,width=800)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;
 return {money,image};
})();