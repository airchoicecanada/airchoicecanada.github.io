---
title: Email Your MP
permalink: /email-your-mp/
---

<section class="section">
  <div class="lang-en">
    <h1>Email Your Member of Parliament</h1>
    <p>Enter your postal code to find your MP and email them about the <em>Secondary City Exemption</em>.</p>
  </div>
  <div class="lang-fr">
    <h1>Écrivez à votre député</h1>
    <p>Entrez votre code postal pour trouver votre député et lui écrire au sujet de l’<em>exemption pour les villes secondaires</em>.</p>
  </div>

  <form class="mp-lookup" onsubmit="return false;">
    <label for="pc" class="sr-only">Postal code / Code postal</label>
    <input id="pc" name="pc" placeholder="A1A 1A1" inputmode="text" autocomplete="postal-code" maxlength="7">
    <button type="button" class="btn primary" id="lookupBtn">
      <span class="lang-en">Find My MP</span>
      <span class="lang-fr">Trouver mon député</span>
    </button>
  </form>

  <div id="mpResult" class="mp-result" hidden></div>
</section>

<script>
(function(){
  // Use the dedicated representatives endpoint
  const API = "https://represent.opennorth.ca/representatives/?format=json&postal_code=";

  const resultEl = document.getElementById('mpResult');
  const btn = document.getElementById('lookupBtn');
  const input = document.getElementById('pc');

  // Canadian postal code pattern
  const pcRegex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;

  function t(en, fr){
    const isFr = document.documentElement.classList.contains('show-fr');
    return isFr ? fr : en;
  }

  function normalizePC(v){
    return (v || "").toUpperCase().replace(/\s+/g, "");
  }

  function pickMP(list){
    // Prefer House of Commons / federal MP
    return (list || []).find(r =>
      /house of commons/i.test(r.representative_set_name || "") ||
      /(member of parliament|mp)/i.test(r.elected_office || "")
    ) || null;
  }

  function renderMP(mp, prettyPC){
    if(!mp){
      resultEl.hidden = false;
      resultEl.innerHTML = `
        <div class="notice error">
          ${t("We couldn’t find the MP for that postal code. Please check the code or use the House of Commons search.",
              "Nous n’avons pas trouvé le député pour ce code postal. Veuillez vérifier le code ou utiliser la recherche de la Chambre des communes.")}
          <br>
          <a href="https://www.ourcommons.ca/members/en" target="_blank" rel="noopener">
            ${t("Search on ourcommons.ca","Chercher sur ourcommons.ca")}
          </a>
        </div>`;
      return;
    }

    const subjectEN = "Support a codeshare-only exemption for secondary Canadian cities";
    const subjectFR = "Appuyer une dérogation conditionnelle au partage de code pour les villes secondaires";

    const bodyEN = `Dear ${mp.name ? "MP " + mp.name : "Member of Parliament"},%0D%0A%0D%0A` +
`As a constituent (${prettyPC}), I’m asking you to support a narrow, codeshare-only exemption in Canada’s Air Transport Agreements. ` +
`It would allow foreign airlines to exceed bilateral caps only when flying to designated Canadian secondary cities ` +
`under a mandatory codeshare with a Canadian carrier. This improves affordability and keeps long-haul traffic in Canada. %0D%0A%0D%0A` +
`Thank you for your attention.`;

    const bodyFR = `Bonjour ${mp.name ? "Monsieur/Madame " + mp.name : "député(e)"},%0D%0A%0D%0A` +
`À titre d’électeur (${prettyPC}), je vous demande d’appuyer une dérogation ciblée et conditionnelle au partage de code ` +
`dans les accords de transport aérien du Canada. Elle permettrait des dessertes au-delà des plafonds bilatéraux uniquement vers des villes secondaires ` +
`désignées, lorsque les vols sont exploités en partage de code avec une compagnie canadienne. %0D%0A%0D%0A` +
`Merci de votre attention.`;

    const isFr = document.documentElement.classList.contains('show-fr');
    const subject = encodeURIComponent(isFr ? subjectFR : subjectEN);
    const body = isFr ? bodyFR : bodyEN;

    const mailto = `mailto:${encodeURIComponent(mp.email || "")}?subject=${subject}&body=${body}`;

    resultEl.hidden = false;
    resultEl.innerHTML = `
      <div class="mp-card">
        <div class="mp-main">
          <h3>${mp.name || t("Member of Parliament","Député(e)")}</h3>
          <p>
            ${mp.party ? `<strong>${mp.party}</strong> · ` : ""}${mp.district || ""}
            ${mp.email ? `<br><a href="mailto:${mp.email}">${mp.email}</a>` : ""}
            ${mp.phone ? `<br>${mp.phone}` : ""}
            ${mp.url ? `<br><a href="${mp.url}" target="_blank" rel="noopener">${t("Website","Site web")}</a>` : ""}
          </p>
        </div>
        <div class="mp-actions">
          ${mp.email ? `
            <a class="btn primary" href="${mailto}">
              ${t("Compose Email","Écrire un courriel")}
            </a>` : `
            <div class="notice">
              ${t("No email found. Use the website link above or call the constituency office.",
                   "Aucun courriel trouvé. Utilisez le site web ci-dessus ou téléphonez au bureau de circonscription.")}
            </div>`}
        </div>
      </div>`;
  }

  btn.addEventListener('click', async () => {
    const raw = input.value.trim();
    if (!pcRegex.test(raw)) {
      resultEl.hidden = false;
      resultEl.innerHTML = `<div class="notice error">${t("Please enter a valid Canadian postal code (e.g., K1A 0B1).",
                                                           "Veuillez entrer un code postal canadien valide (p. ex. K1A 0B1).")}</div>`;
      return;
    }

    const pc = normalizePC(raw);                 // e.g., K1A0B1 (no space)
    const url = API + encodeURIComponent(pc);    // https://…/representatives/?postal_code=K1A0B1

    resultEl.hidden = false;
    resultEl.innerHTML = `<div class="notice">${t("Looking up your MP…","Recherche de votre député…")}</div>`;

    try{
      const res = await fetch(url, { headers: { "Accept": "application/json" } });
      const json = await res.json();
      const mp = pickMP(json && json.objects);
      renderMP(mp, pc.replace(/^([A-Z]\d[A-Z])(\d[A-Z]\d)$/, '$1 $2'));
    }catch(err){
      console.error(err);
      renderMP(null);
    }
  });
})();
</script>


<style>
/* Minimal styles to look good with your theme */
.mp-lookup { display:flex; gap:.5rem; flex-wrap:wrap; margin:.5rem 0 1rem }
.mp-lookup input { width:14ch; text-transform:uppercase; font-weight:600; letter-spacing:.05em }
.notice { padding:.75rem 1rem; background:#f5f5f5; border-radius:.5rem; }
.notice.error { background:#ffe9e9; }
.mp-card { display:grid; gap:1rem; grid-template-columns: 1fr auto; align-items:center; padding:1rem; border:1px solid #e5e5e5; border-radius:.75rem; }
@media (max-width:700px){ .mp-card{ grid-template-columns: 1fr; } }
.btn.primary { text-decoration:none; }
.sr-only { position:absolute; left:-9999px; width:1px; height:1px; overflow:hidden; }
</style>
