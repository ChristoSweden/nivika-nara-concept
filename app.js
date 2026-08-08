(() => {
  const icon = (name) => ({
    plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
    user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c.7-4.7 3.4-7 8-7s7.3 2.3 8 7"/></svg>'
  }[name]);

  const listings = [
    {title:'Matbord i massiv ek',category:'Möbler',price:'450 kr',image:'oak-sofa-table-4k.png',type:'Säljes',desc:'Stadigt matbord med plats för fyra. Hämtas enkelt av en granne i samma kvarter.'},
    {title:'Monstera med lerkruka',category:'Växter',price:'Gratis',image:'monstera-4k.png',type:'Skänkes',desc:'Stor och frisk planta som behöver ett nytt hem med mer plats.'},
    {title:'Verktygslåda för hemmafix',category:'Verktyg',price:'Lånas ut',image:'red-toolbox-4k.png',type:'Lånas',desc:'Basverktyg för enklare montering. Lånas ut i upp till tre dagar.'},
    {title:'Två gröna kuddfodral',category:'Inredning',price:'80 kr',image:'green-cushions-4k.png',type:'Säljes',desc:'Tvättade kuddfodral i fint skick, 50 × 50 cm.'},
    {title:'Ekstol, svensk design',category:'Möbler',price:'250 kr',image:'oak-chair-4k.png',type:'Säljes',desc:'Bekväm stol i ljus ek. Några små bruksspår men mycket kvar att ge.'},
    {title:'Picknickkorg i rotting',category:'Fritid',price:'120 kr',image:'wicker-picnic-basket-4k.png',type:'Säljes',desc:'Klassisk korg för utflykten eller smart förvaring hemma.'},
    {title:'Cykel för korta vardagsresor',category:'Fritid',price:'Gratis',image:'courtyard-bike-4k.png',type:'Skänkes',desc:'Äldre cykel i bruksskick. Perfekt för någon i grannskapet som kan ge den lite kärlek.'},
    {title:'Soffbord med förvaring',category:'Möbler',price:'300 kr',image:'oak-sofa-table-4k.png',type:'Säljes',desc:'Praktiskt soffbord med hylla. Enkelt att bära tillsammans inom kvarteret.'}
  ];

  const b = {
      name:'Nivika', symbol:'N', sub:'Fastigheter på småländska', service:'Nära',
      eyebrow:'För hyresgäster i Värnamo', title:'Nära är smart.',
      lead:'En lokal återbruksmarknad för Nivikas verifierade bostadshyresgäster — smidigare stora affärer, mindre onödigt avfall och mer kvarterskänsla.',
      locationLabel:'Nivika · Värnamo',
      areas:['Alla verifierade bostadsfastigheter','Falken 25 · Karlsdal','Annan fastighet från mitt avtal'],
      cardTitle:'Fastighetsgränsen är hård',
      proof:['Endast Nivikas bostadsavtal','Fastighet väljs aldrig som fritext','Ingen port eller lägenhet visas publikt'],
      valueTitle:'Småländsk nytta, digitalt.',
      valueText:'Nivika har sin hemstad och sitt huvudkontor i Värnamo. Konceptet omsätter den lokala positionen i en påtaglig hyresgästfördel: enklare återbruk mellan människor som redan bor nära varandra.',
      stats:[['11','bostadsfastigheter i Värnamo'],['366','lägenheter enligt Nivikas ortssida'],['0 externa','adresser tillåtna'],['1 lokal','pilot att utvärdera']],
      ownerTitle:'Varför det passar Nivika',
      ownerCards:[
        ['Hemstadsfördel','Nivika beskriver Värnamo som sin hemstad. En lokal pilot gör den positionen synlig för bostadshyresgästerna, inte bara i bolagsberättelsen.'],
        ['Återbruk som går att mäta','Följ publicerade objekt, genomförda överlämningar och uppskattat undviket grovavfall — alltid tydligt markerat som pilotdata.'],
        ['Strikt avtal, liten attackyta','Bostadsfastigheten kommer från det aktiva avtalet. Ingen fri adress, offentlig chatthistorik eller betalningsfunktion i första versionen.']
      ],
      sourceNote:'Falken 25 (Brunnsgatan 13) är publicerad av Nivika som bostadsfastighet. Övriga val ska i en riktig pilot komma direkt från Nivikas aktuella avtals- och fastighetsregister, inte från en statisk demolista.'
  };

  const state = {category:'Alla',query:'',area:b.areas[0]};
  const app = document.querySelector('#app');

  app.innerHTML = `
    <div class="concept-bar"><span class="concept-dot"></span><strong>Konceptdemo</strong> — inte en officiell tjänst från ${b.name}</div>
    <header class="site-header">
      <a class="brand-lockup" href="#top" aria-label="${b.service}, startsida"><span class="brand-wordmark">${b.name}<span class="brand-period" aria-hidden="true">.</span></span><span class="brand-divider" aria-hidden="true"></span><span class="brand-product"><span class="brand-name">${b.service}</span><span class="brand-sub">${b.sub}</span></span></a>
      <div class="header-actions"><button class="btn btn-secondary desktop-only" data-open="owner">För fastighetsägaren</button><button class="btn btn-primary" data-open="create">${icon('plus')} <span class="desktop-only">Lägg upp</span></button><button class="btn btn-secondary btn-icon" aria-label="Min profil">${icon('user')}</button></div>
    </header>
    <main id="top">
      <section class="hero"><div class="hero-inner"><div><p class="eyebrow">${b.eyebrow}</p><h1>${b.title}</h1><p class="hero-lead">${b.lead}</p><div class="hero-actions"><a class="btn btn-primary" href="#annonser">Se vad som finns nära</a><button class="btn btn-secondary" data-open="create">Lägg upp en sak</button></div></div><aside class="hero-proof"><div class="proof-kicker">Trygghetsprincip</div><h2>${b.cardTitle}</h2><ul class="proof-list">${b.proof.map(x=>`<li><b aria-hidden="true">✓</b><span>${x}</span></li>`).join('')}</ul></aside></div></section>
      <section class="trust" aria-label="Så skapas trygghet"><div class="trust-inner"><div class="trust-item"><span class="trust-icon">✓</span><div><strong>Verifierad hyresgäst</strong><small>Aktivt avtal hos ${b.name}</small></div></div><div class="trust-item"><span class="trust-icon">⌖</span><div><strong>Nära utan att röja adress</strong><small>Område visas, aldrig lägenhetsnummer</small></div></div><div class="trust-item"><span class="trust-icon">♻</span><div><strong>Enklare lokalt återbruk</strong><small>Särskilt för stora och tunga saker</small></div></div></div></section>
      <section class="market" id="annonser"><div class="section-heading"><div><h2>Finns nära dig</h2><p>Alla annonser och namn är realistiska demoexempel.</p></div><div class="result-count" id="result-count"></div></div>
        <div class="toolbar"><label class="search"><span aria-hidden="true">⌕</span><span class="sr-only">Sök annonser</span><input id="search" class="field" type="search" placeholder="Sök bland saker"></label><label><span class="sr-only">Välj område</span><select id="area" class="select">${b.areas.map(a=>`<option>${a}</option>`).join('')}</select></label><label><span class="sr-only">Sortera</span><select id="sort" class="select"><option>Senast publicerat</option><option>Pris: lägst först</option></select></label></div>
        <div class="chips" aria-label="Kategorier">${['Alla','Möbler','Växter','Verktyg','Inredning','Fritid'].map((c,i)=>`<button class="chip" aria-pressed="${i===0}" data-category="${c}">${c}</button>`).join('')}</div><div class="listing-grid" id="listing-grid"></div>
      </section>
      <section class="value"><div class="value-inner"><div><p class="eyebrow">Affärsvärde i pilotformat</p><h2>${b.valueTitle}</h2><p>${b.valueText}</p><button class="btn btn-primary" data-open="owner">Öppna pilotförslaget</button></div><div><div class="stats">${b.stats.map(s=>`<div class="stat"><strong>${s[0]}</strong><span>${s[1]}</span></div>`).join('')}</div><p class="demo-note">Siffrorna är omfattning eller pilotmål — inte påstådda resultat. Se käll- och avgränsningsnotering i ägarpanelen.</p></div></div></section>
      <section class="how"><h2>Tre enkla steg</h2><div class="steps"><article class="step"><span class="step-num">1</span><h3>Verifiera boendet</h3><p>Hyresavtalet avgör automatiskt vilka fastigheter och områden som är tillgängliga.</p></article><article class="step"><span class="step-num">2</span><h3>Publicera lokalt</h3><p>Välj säljes, skänkes eller lånas. Ingen extern adress kan skrivas in.</p></article><article class="step"><span class="step-num">3</span><h3>Bestäm trygg överlämning</h3><p>Exakt mötesplats delas först när båda vill gå vidare.</p></article></div></section>
    </main>
    <footer><span>© 2026 konceptdemo · Ej ansluten till ${b.name}</span><span>Värnamo</span></footer>
    <div class="modal-backdrop" id="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title"><div class="modal wide"><div class="modal-top"><h2 id="detail-title">Annons</h2><button class="close" aria-label="Stäng">×</button></div><div class="modal-content" id="detail-content"></div></div></div>
    <div class="modal-backdrop" id="create-modal" role="dialog" aria-modal="true" aria-labelledby="create-title"><div class="modal"><div class="modal-top"><h2 id="create-title">Lägg upp en sak</h2><button class="close" aria-label="Stäng">×</button></div><form class="modal-content" id="create-form"><div class="form-grid"><div class="form-group full"><label for="title">Rubrik</label><input class="field" id="title" required maxlength="70" placeholder="Vad vill du sälja, skänka eller låna ut?"></div><div class="form-group"><label for="kind">Typ</label><select class="field" id="kind"><option>Säljes</option><option>Skänkes</option><option>Lånas ut</option></select></div><div class="form-group"><label for="property">Fastighet</label><select class="field" id="property">${b.areas.slice(1).map(a=>`<option>${a}</option>`).join('')}</select></div><div class="form-group full"><label for="description">Beskrivning</label><textarea class="field" id="description" maxlength="400" placeholder="Skick, mått och praktisk information"></textarea><span class="form-hint">Ingen gatuadress, port eller lägenhet visas i annonsen.</span></div></div><div class="form-actions"><button type="button" class="btn btn-secondary cancel">Avbryt</button><button class="btn btn-primary" type="submit">Skapa förhandsvisning</button></div></form></div></div>
    <div class="modal-backdrop" id="owner-modal" role="dialog" aria-modal="true" aria-labelledby="owner-title"><div class="modal wide"><div class="modal-top"><h2 id="owner-title">${b.ownerTitle}</h2><button class="close" aria-label="Stäng">×</button></div><div class="modal-content"><div class="owner-cards">${b.ownerCards.map(c=>`<article class="owner-card"><h3>${c[0]}</h3><p>${c[1]}</p></article>`).join('')}<article class="owner-card"><h3>Datagräns och källa</h3><p>${b.sourceNote}</p></article><article class="owner-card"><h3>Föreslagen pilot</h3><ul><li>8–12 veckor i ett avgränsat Värnamo-bestånd.</li><li>Ingen betalning, ingen publik meddelandehistorik och inga externa användare.</li><li>Mät aktivering, publicerade objekt, genomförda överlämningar, modereringsbehov och hyresgästernas upplevda nytta.</li><li>Juridik, dataskydd, tillgänglighet och integration godkänns innan verkliga uppgifter används.</li></ul></article></div></div></div></div>
    <div class="toast" role="status" aria-live="polite"></div>`;

  const grid = document.querySelector('#listing-grid');
  const count = document.querySelector('#result-count');
  const areaFor = (i) => b.areas[1 + (i % Math.max(1,b.areas.length - 1))];
  const render = () => {
    const q = state.query.trim().toLocaleLowerCase('sv');
    const visible = listings.filter(x => (state.category === 'Alla' || x.category === state.category) && (!q || `${x.title} ${x.category} ${x.type}`.toLocaleLowerCase('sv').includes(q)));
    count.textContent = `${visible.length} demoannonser`;
    grid.innerHTML = visible.length ? visible.map((x,i)=>`<article class="listing-card"><div class="listing-visual" style="background-image:url('assets/${x.image}')"><span class="tag">${x.type}</span><button class="favorite" aria-label="Spara ${x.title}" aria-pressed="false">♡</button></div><div class="listing-body"><div class="listing-meta">${areaFor(i)} · idag</div><h3 class="listing-title">${x.title}</h3><div class="listing-foot"><span class="price">${x.price}</span><button class="open-listing" data-index="${listings.indexOf(x)}">Visa</button></div></div></article>`).join('') : '<div class="empty"><strong>Inga saker matchar just nu.</strong><br>Prova en annan sökning eller kategori.</div>';
  };
  render();

  document.querySelector('#search').addEventListener('input', e=>{state.query=e.target.value;render()});
  document.querySelector('#area').addEventListener('change', e=>{state.area=e.target.value;toast(`Visar ${e.target.value}`)});
  document.querySelectorAll('.chip').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed','false'));btn.setAttribute('aria-pressed','true');state.category=btn.dataset.category;render()}));
  document.addEventListener('click', e=>{
    const fav=e.target.closest('.favorite'); if(fav){const on=fav.getAttribute('aria-pressed')==='true';fav.setAttribute('aria-pressed',String(!on));fav.textContent=on?'♡':'♥';toast(on?'Borttagen från sparade':'Sparad');return}
    const open=e.target.closest('.open-listing'); if(open){showDetail(listings[Number(open.dataset.index)],Number(open.dataset.index));return}
    const trigger=e.target.closest('[data-open]'); if(trigger){openModal(document.querySelector(`#${trigger.dataset.open}-modal`));return}
    if(e.target.classList.contains('modal-backdrop')||e.target.closest('.close')||e.target.closest('.cancel')) closeModals();
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModals()});
  document.querySelector('#create-form').addEventListener('submit',e=>{e.preventDefault();closeModals();toast('Förhandsvisning skapad — inget har publicerats')});

  function showDetail(x,i){
    document.querySelector('#detail-title').textContent=x.title;
    document.querySelector('#detail-content').innerHTML=`<div class="detail-layout"><div class="detail-image" style="background-image:url('assets/${x.image}')"></div><div class="detail"><h3>${x.title}</h3><span class="price">${x.price}</span><p>${x.desc}</p><p><strong>${areaFor(i)}</strong><br><span class="listing-meta">Publicerad idag · verifierat demoavtal</span></p><div class="safety"><strong>Trygg kontakt:</strong> Exakt adress, port och lägenhetsnummer visas aldrig i katalogen.</div><button class="btn btn-primary" id="contact-demo">Skicka intresse</button></div></div>`;
    openModal(document.querySelector('#detail-modal'));
    document.querySelector('#contact-demo').addEventListener('click',()=>toast('Intresse sparat lokalt i demon'));
  }
  function openModal(el){el.classList.add('open');const focus=el.querySelector('button,input,select');if(focus)focus.focus();document.body.style.overflow='hidden'}
  function closeModals(){document.querySelectorAll('.modal-backdrop.open').forEach(x=>x.classList.remove('open'));document.body.style.overflow=''}
  function toast(message){const el=document.querySelector('.toast');el.textContent=message;el.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>el.classList.remove('show'),2200)}
})();
