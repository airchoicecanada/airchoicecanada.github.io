(function(){
  document.documentElement.classList.remove('no-js');
  const KEY='airchoice.lang';
  function setLang(lang){
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.classList.toggle('show-fr', lang==='fr');
    document.querySelectorAll('.lang-btn').forEach(b=>{
      b.setAttribute('aria-pressed', b.dataset.setLang===lang ? 'true' : 'false');
    });
    try{ localStorage.setItem(KEY, lang);}catch(e){}
  }
  const saved=(localStorage.getItem(KEY)||'').toLowerCase();
  const pref=(navigator.language||'en').toLowerCase().startsWith('fr')?'fr':'en';
  setLang(saved==='fr' || saved==='en' ? saved : pref);
  document.addEventListener('click', (e)=>{
    const btn=e.target.closest('[data-set-lang]'); if(!btn) return;
    e.preventDefault();
    setLang(btn.dataset.setLang);
  });
})();
