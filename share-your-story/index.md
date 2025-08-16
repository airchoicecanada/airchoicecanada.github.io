---
title: Share Your Story
permalink: /share-your-story/
---
<div class="lang-en">
  <h1>Share Your Story</h1>
  <p>Tell us how limited long‑haul options affect you or your organization. With permission, we may include short quotes in our advocacy.</p>
</div>
<div class="lang-fr">
  <h1>Racontez votre histoire</h1>
  <p>Expliquez‑nous comment les options long‑courriers limitées vous touchent, vous ou votre organisme. Avec votre permission, nous pourrions citer de courts extraits.</p>
</div>

<form
  data-airchoice-form
  method="POST"
  action="{{ site.formspree_endpoint }}"
  data-endpoint="{{ site.formspree_endpoint }}"
  data-msg-ok="Thanks — your story was sent. / Merci — votre message a été envoyé.">

  <p class="help">This form submits to Formspree. Set <code>formspree_endpoint</code> in <code>_config.yml</code> to your endpoint (e.g., <code>https://formspree.io/f/XXXXXXXX</code>).</p>
  <div class="row">
    <div>
      <label for="name">Name / Nom</label>
      <input id="name" name="name" required>
    </div>
    <div>
      <label for="email">Email</label>
      <input id="email" name="email" type="email" required>
    </div>
  </div>
  <label for="city">City</label>
  <input id="city" name="city">
  <label for="subject">Subject</label>
  <input id="subject" name="subject" placeholder="e.g., Halifax to Middle East connections">
  <label for="message">Story / Message</label>
  <textarea id="message" name="message" required></textarea>
  <label><input type="checkbox" name="permission" value="yes"> I give permission to publicly quote a short excerpt. / J’autorise une courte citation publique.</label>
  <input type="hidden" name="_subject" value="AirChoice story submission">
  <div class="form-messages" aria-live="polite"></div>
  <button class="btn primary" type="submit">Send / Envoyer</button>
</form>
