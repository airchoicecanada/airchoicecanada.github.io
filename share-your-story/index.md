---
title: Share Your Story
permalink: /share-your-story/
---

<div class="lang-en">
  <h1>Share Your Story</h1>
  <p>Tell us how limited long-haul options affect you or your organization. With permission, we may include short quotes in our advocacy.</p>

  <form action="https://api.web3forms.com/submit" method="POST">
    <!-- Web3Forms required -->
    <input type="hidden" name="access_key" value="a4ae7e02-d462-4468-9b0c-0107aa77c634">
    <input type="hidden" name="subject" value="AirChoice — Story submission (EN)">
    <!-- Use absolute redirect so it works on GitHub Pages -->
    <input type="hidden" name="redirect" value="{{ site.url }}{{ site.baseurl }}/thanks/?lang=en">
    <!-- Optional helpful metadata -->
    <input type="hidden" name="from_name" value="AirChoice Website">

    <!-- Honeypot (spam protection) -->
    <input type="checkbox" name="botcheck" tabindex="-1" autocomplete="off" style="display:none">

    <div class="row">
      <div>
        <label for="name-en">Name</label>
        <input id="name-en" name="name" autocomplete="name" required>
      </div>
      <div>
        <label for="email-en">Email</label>
        <input id="email-en" name="email" type="email" autocomplete="email" required>
      </div>
    </div>

    <label for="city-en">City</label>
    <input id="city-en" name="city" autocomplete="address-level2">

    <label for="subject-en">Subject</label>
    <input id="subject-en" name="topic" placeholder="e.g., Halifax to Middle East connections">

    <label for="message-en">Story / Message</label>
    <textarea id="message-en" name="message" required></textarea>

    <label>
      <input type="checkbox" name="permission" value="yes"> I give permission to publicly quote a short excerpt.
    </label>

    <button class="btn primary" type="submit">Send</button>
  </form>
</div>

<div class="lang-fr">
  <h1>Racontez votre histoire</h1>
  <p>Expliquez comment les options long-courriers limitées vous touchent, vous ou votre organisme. Avec votre permission, nous pourrions citer de courts extraits.</p>

  <form action="https://api.web3forms.com/submit" method="POST">
    <!-- Web3Forms required -->
    <input type="hidden" name="access_key" value="a4ae7e02-d462-4468-9b0c-0107aa77c634">
    <input type="hidden" name="subject" value="AirChoice — Témoignage (FR)">
    <!-- Absolute redirect (FR) -->
    <input type="hidden" name="redirect" value="{{ site.url }}{{ site.baseurl }}/thanks/?lang=fr">
    <input type="hidden" name="from_name" value="AirChoice Website">

    <!-- Honeypot -->
    <input type="checkbox" name="botcheck" tabindex="-1" autocomplete="off" style="display:none">

    <div class="row">
      <div>
        <label for="name-fr">Nom</label>
        <input id="name-fr" name="name" autocomplete="name" required>
      </div>
      <div>
        <label for="email-fr">Courriel</label>
        <input id="email-fr" name="email" type="email" autocomplete="email" required>
      </div>
    </div>

    <label for="city-fr">Ville</label>
    <input id="city-fr" name="city" autocomplete="address-level2">

    <label for="subject-fr">Objet</label>
    <input id="subject-fr" name="topic" placeholder="p. ex. : Halifax vers le Moyen-Orient">

    <label for="message-fr">Votre histoire / Message</label>
    <textarea id="message-fr" name="message" required></textarea>

    <label>
      <input type="checkbox" name="permission" value="yes"> J’autorise la citation publique d’un court extrait.
    </label>

    <button class="btn primary" type="submit">Envoyer</button>
  </form>
</div>
