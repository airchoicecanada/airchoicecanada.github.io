(function(){
  const form=document.querySelector('form[data-airchoice-form]');
  if(!form) return;
  const endpoint='{{ site.formspree_endpoint }}';
  function show(type,msg){
    const n = form.querySelector('.notice') || document.createElement('div');
    n.className='notice '+type; n.textContent=msg;
    (form.querySelector('.form-messages')||form).prepend(n);
  }
  form.addEventListener('submit', async (e)=>{
    if(endpoint.trim()==="") return; // no endpoint set: allow normal post
    e.preventDefault();
    try{
      const res = await fetch(endpoint,{
        method:'POST',
        headers:{'Accept':'application/json'},
        body: new FormData(form)
      });
      if(res.ok){
        show('success', form.dataset.msgOk || 'Thanks — your story was sent.');
        try{
          const isFr=document.documentElement.classList.contains('show-fr');
          window.location.href='/thanks/?lang='+(isFr?'fr':'en');
        }catch(e){}
        form.reset();
      } else {
        show('error', form.dataset.msgErr || 'Sorry, something went wrong. Please try again later.');
      }
    }catch(err){
      show('error', form.dataset.msgErr || 'Network error — please try again.');
    }
  });
})();
