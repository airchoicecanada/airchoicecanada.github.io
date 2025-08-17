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
  const resultEl = document.getElementById('mpResult');
  const btn = document.getElementById('lookupBtn');
  const input = document.getElementById('pc');

  const pcRegex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;

  // i18n helper (uses your html.show-fr flag)
  const t = (en, fr) => document.documentElement.classList.contains('show-fr') ? fr : en;

  const normalizePC = v => (v || '').toUpperCase().replace(/\s+/g,''); // “K1A0B1”
  const prettyPC = v => v.replace(/^([A-Z]\d[A-Z])(\d[A-Z]\d)$/, '$1 $2'); // “K1A 0B1”

  const pickMP = list => (list || []).find(r =>
    /house of commons/i.test(r.representative_set_name || '') ||
    /(member of parliament|^mp$)/i.test(r.elected_office || '')
  ) || null;

  async function lookupByPostcode(pc) {
    const url = `https://represent.opennorth.ca/postcodes/${encodeURIComponent(pc)}/`;
    const res = await fetch(url, { headers: { 'Accept':'application/json' }});
    if (!res.ok) throw new Error('postcode lookup failed');
    const data = await res.json();

    const reps = []
      .concat(data.representatives_centroid || [])
      .concat(data.representatives_concordance || []);

    let mp = pickMP(reps);

    // Fallback: resolve by point (lat,lng) straight to House of Commons set
    if (!mp && data.centroid && Array.isArray(data.centroid.coordinates)) {
      const [lng, lat] = data.centroid.coordinates;
      const pointUrl = `https://represent.opennorth.ca/representatives/house-of-commons/?point=${lat},${lng}`;
      const r2 = await fetch(pointUrl, { headers: { 'Accept':'application/json' }});
      if (r2.ok) {
        const j2 = await r2.json();
        mp = pickMP(j2.objects);
      }
    }
    return { mp, pcPretty: prettyPC(pc) };
  }

  function render(mp, pcPretty){
    if (!mp) {
      resultEl.hidden = false;
      resultEl.innerHTML = `
        <div class="notice error">
          ${t("We couldn’t find the MP for that postal code. Please check the code or use the House of Commons search.",
               "Nous n’avons pas trouvé le député pour ce code postal. Veuillez vérifier le code ou utiliser la recherche de la Chambre des communes.")}
          <br><a href="https://www.ourcommons.ca/members/en" target="_blank" rel="noopener">
            ${t("Search on ourcommons.ca","Chercher sur ourcommons.ca")}
          </a>
        </div>`;
      return;
    }

    const subjectEN = "Support a codeshare-only exemption for secondary Canadian cities";
    const subjectFR = "Appuyer une dérogation conditionnelle au partage de code pour les villes secondaires";
    const bodyEN = `Dear ${mp.name ? "MP " + mp.name : "Member of Parliament"},%0D%0A%0D%0A`
      + `As a constituent (${pcPretty}), I’m asking you to support a narrow, codeshare-only exemption in Canada’s Air Transport Agreements. `
      + `It would allow foreign airlines to exceed bilateral caps only when flying to designated Canadian secondary cities `
      + `under a mandatory codeshare with a Canadian carrier. This improves affordability and keeps long-haul traffic in Canada.%0D%0A%0D%0A`
      + `Thank you for your attention.`;
    const bodyFR = `Bonjour ${mp.name ? "Monsieur/Madame " + mp.name : "député(e)"},%0D%0A%0D%0A`
      + `À titre d’électeur (${pcPretty}), je vous demande d’appuyer une dérogation ciblée et conditionnelle au partage de code `
      + `dans les accords de transport aérien du Canada. Elle permettrait des dessertes au-delà des plafonds bilatéraux uniqu



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
