---
title: Thanks
permalink: /thanks/
layout: default
---
<section class="section">
  <div class="lang-en">
    <h1>Thank you</h1>
    <p>Your message was sent. We’ll be in touch if we’d like to feature your story.</p>
    <p><a class="btn" href="{{ '/' | relative_url }}">Back to homepage</a></p>
  </div>
  <div class="lang-fr">
    <h1>Merci</h1>
    <p>Votre message a été envoyé. Nous vous contacterons si nous souhaitons citer votre histoire.</p>
    <p><a class="btn" href="{{ '/' | relative_url }}">Retour à l’accueil</a></p>
  </div>
</section>
<script>
  (function(){try{const u=new URL(window.location.href);const l=(u.searchParams.get('lang')||'').toLowerCase();if(l==='fr'||l==='en'){document.documentElement.classList.toggle('show-fr', l==='fr');document.documentElement.setAttribute('lang', l);} }catch(e){}})();
</script>
