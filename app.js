// ==========================================================
// Tassula ry – app.js
// Sivuston ainoa JavaScript-tiedosto. Ladataan jokaisen sivun
// headissa deferillä, joten koko sivu on valmis, kun tämä ajetaan.
//
// Järjestys:
// 1. Eläinten tiedot
// 2. Apufunktiot
// 3. Etusivu: kolme kotia odottavaa eläintä
// 4. Eläinsivu: lajisuodatin, järjestysvalikko (popover) ja tilarivi
// 5. Yhteystiedot: adoptiokysely, tarkistus, valmis-ilmoitus ja tallennus selaimeen
//
// Jokainen osa tarkistaa ensin, onko sen elementti tällä sivulla.
// Jos ei ole, osa ei tee mitään.
// ==========================================================

'use strict';


// ---------- 1. Eläinten tiedot ----------
// Päivitä eläimet tähän.
// status: 'available' = kotia odottava, 'adopted' = adoptoitu.
// Adoptoituja ei näytetä korteissa eikä lomakkeen eläinvalikossa.
// arrived: päivä, jona eläin tuli Tassulaan (vvvv-kk-pp).
// Kaikki nykyiset eläimet ovat esimerkkejä.

const animals = [
  {
    id: 'misu',
    name: 'Misu',
    species: 'cat',
    label: 'Kissa',
    status: 'available',
    arrived: '2026-08-20',
    image: 'images/misu.jpg',
    alt: 'Oranssi kissa katsoo sivulle ulkona. Kuvituskuva.',
    story: 'Misu on rauhallinen ja ihmisrakas kissa. Sen unelmien arjessa on tilaa kiireettömille hetkille ja omalle pehmeälle lepopaikalle.',
  },
  {
    id: 'rekku',
    name: 'Rekku',
    species: 'dog',
    label: 'Koira',
    status: 'available',
    arrived: '2026-10-02',
    image: 'images/rekku.jpg',
    alt: 'Vaalea koira katsoo tarkkaavaisena kameraan. Kuvituskuva.',
    story: 'Rekku on energinen koira aktiiviseen kotiin. Yhteiset ulkoiluhetket ja mukava tekeminen voisivat olla sen uuden arjen kohokohtia.',
  },
  {
    id: 'paju',
    name: 'Paju',
    species: 'other',
    label: 'Kani',
    status: 'available',
    arrived: '2026-06-11',
    image: 'images/paju.jpg',
    alt: 'Pörröinen harmaa kani vaalealla taustalla. Kuvituskuva.',
    story: 'Paju on tämän sivuston esimerkkikani. Sen tarina muistuttaa, että pienikin eläin tarvitsee tilaa, lajille sopivaa hoitoa ja turvallista seuraa.',
  },
  {
    id: 'onni',
    name: 'Onni',
    species: 'cat',
    label: 'Kissa',
    status: 'adopted',
    arrived: '2026-05-01',
    image: 'images/misu.jpg',
    alt: 'Kissan kuvituskuva.',
    story: 'Adoptoitu esimerkkieläin, joka ei näy kotia odottavien listalla.',
  },
];

// Vain kotia odottavat eläimet näytetään sivuilla.
const available = animals.filter((animal) => animal.status === 'available');


// ---------- 2. Apufunktiot ----------

// Luo elementin ja asettaa sille tekstin ja luokan.
// textContent on turvallinen: tekstiä ei koskaan tulkita HTML:nä.
function make(tag, text, className) {
  const element = document.createElement(tag);
  if (text) element.textContent = text;
  if (className) element.className = className;
  return element;
}

// Kuukaudet muodossa "elokuussa", jotta lause on oikeaa suomea.
const monthsIn = [
  'tammikuussa', 'helmikuussa', 'maaliskuussa', 'huhtikuussa',
  'toukokuussa', 'kesäkuussa', 'heinäkuussa', 'elokuussa',
  'syyskuussa', 'lokakuussa', 'marraskuussa', 'joulukuussa',
];

// '2026-08-20' → 'Saapui Tassulaan elokuussa 2026'
function arrivedText(date) {
  const [year, month] = date.split('-');
  return `Saapui Tassulaan ${monthsIn[Number(month) - 1]} ${year}`;
}

// Järjestysvaihtoehdot. compare kertoo sort()-metodille, kumpi eläin tulee ensin.
const sortOptions = {
  waiting: {
    label: 'pisimpään odottaneet ensin',
    compare: (a, b) => a.arrived.localeCompare(b.arrived),
  },
  name: {
    label: 'nimen mukaan (A–Ö)',
    compare: (a, b) => a.name.localeCompare(b.name, 'fi'),
  },
};

// Piirtää eläinkortit annettuun elementtiin.
// heading on 'h2' tai 'h3', jotta otsikkotasot pysyvät järjestyksessä.
function renderAnimals(target, list, heading) {
  target.replaceChildren();

  for (const animal of list) {
    const card = make('article', '', 'animal-card');

    const img = make('img');
    img.src = animal.image;
    img.alt = animal.alt;
    img.width = 600;
    img.height = 600;
    img.loading = 'lazy';

    const body = make('div', '', 'card-body');
    const link = make('a', `Kysy eläimestä: ${animal.name} →`, 'text-link');
    link.href = `contact.html?animal=${encodeURIComponent(animal.id)}`;

    body.append(
      make('p', `${animal.label} · esimerkkieläin`, 'species'),
      make(heading, animal.name),
      make('p', animal.story, 'story'),
      make('p', arrivedText(animal.arrived), 'arrived'),
      link,
    );
    card.append(img, body);
    target.append(card);
  }
}


// ---------- 3. Etusivu ----------

function setupPreview() {
  const preview = document.querySelector('#animal-preview');
  if (!preview) return;

  // Pisimpään odottaneet ensin, kuten eläinsivullakin.
  const firstThree = [...available].sort(sortOptions.waiting.compare).slice(0, 3);
  renderAnimals(preview, firstThree, 'h3');
}


// ---------- 4. Eläinsivu ----------

function setupListing() {
  const list = document.querySelector('#animal-list');
  if (!list) return;

  const filters = document.querySelector('#filters');
  const sortBox = document.querySelector('#sort');
  const sortMenu = document.querySelector('#sort-menu');
  const sortToggle = document.querySelector('.sort-toggle');
  const sortLabel = document.querySelector('#sort-label');
  const status = document.querySelector('#result-count');
  const emptyState = document.querySelector('#empty-state');

  let sortBy = 'waiting';

  // Suodata, järjestä, piirrä kortit ja kerro tilarivillä, montako näytetään.
  function update() {
    const species = filters.querySelector('input:checked').value;
    const shown = available
      .filter((animal) => species === 'all' || animal.species === species)
      .sort(sortOptions[sortBy].compare);

    renderAnimals(list, shown, 'h2');
    status.textContent = `Näytetään ${shown.length} / ${available.length} kotia odottavaa eläintä, ${sortOptions[sortBy].label}.`;
    emptyState.hidden = shown.length > 0;
  }

  // Lajisuodatin: yksi change-kuuntelija koko ryhmälle.
  filters.addEventListener('change', update);

  // Järjestysvalikko: popover avautuu ja sulkeutuu HTML:n popovertarget-
  // attribuutilla ilman JavaScriptiä. Tässä kuunnellaan vain valintaa.
  // Yksi kuuntelija koko valikolle (delegointi).
  sortMenu.addEventListener('click', (event) => {
    const button = event.target.closest('[data-sort]');
    if (!button) return;

    sortBy = button.dataset.sort;
    for (const option of sortMenu.querySelectorAll('[data-sort]')) {
      option.setAttribute('aria-pressed', String(option === button));
    }
    sortLabel.textContent = sortOptions[sortBy].label;
    sortMenu.hidePopover();   // sulkee valikon, fokus palaa Järjestys-painikkeeseen
    update();
  });

  // Kerro ruudunlukijalle, onko valikko auki (aria-expanded).
  sortMenu.addEventListener('toggle', (event) => {
    sortToggle.setAttribute('aria-expanded', String(event.newState === 'open'));
  });

  // Suodatin ja järjestys näytetään vasta, kun JavaScript toimii.
  filters.hidden = false;
  sortBox.hidden = false;
  update();
}


// ---------- 5. Yhteystiedot: adoptiokysely ----------

// Keskeneräinen kysely tallennetaan selaimen localStorageen tällä nimellä.
const storageKey = 'tassula-adoptiokysely';

// localStorage voi heittää virheen (esim. yksityisessä selaustilassa),
// joten jokainen käsittely on try…catchin sisällä. Lomake toimii silti.
function loadDraft() {
  try {
    return JSON.parse(localStorage.getItem(storageKey));
  } catch {
    return null;
  }
}

function saveDraft(data) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(data));
  } catch {
    // Tallennus ei onnistunut. Kirjoitettu teksti on yhä lomakkeella.
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(storageKey);
  } catch {
    // Ei tallennettua kyselyä poistettavaksi.
  }
}

// Virheilmoitus yhdelle kentälle. Tyhjä merkkijono = kenttä on kunnossa.
const requiredMessages = {
  name: 'Kirjoita nimesi.',
  email: 'Kirjoita sähköpostiosoitteesi.',
  animal: 'Valitse eläin tai yleinen adoptiokysely.',
  message: 'Kerro kodistasi ja arjestasi vähintään 20 merkillä.',
};

function errorFor(field) {
  const value = field.value.trim();

  if (!value) return requiredMessages[field.id];
  if (field.id === 'email' && field.validity.typeMismatch) {
    return 'Tarkista sähköpostiosoite, esimerkiksi nimi@esimerkki.fi.';
  }
  if (field.id === 'message' && value.length < 20) {
    return 'Kirjoita vähintään 20 merkkiä kodistasi ja arjestasi.';
  }
  if (field.maxLength > 0 && value.length > field.maxLength) {
    return `Lyhennä vastaus enintään ${field.maxLength} merkkiin.`;
  }
  if (field.id === 'animal' && value !== 'general' && !available.some((a) => a.id === value)) {
    return 'Valitse listalta kotia odottava eläin tai yleinen kysely.';
  }
  return '';
}

function setupForm() {
  const form = document.querySelector('#adoption-form');
  if (!form) return;

  const select = document.querySelector('#animal');
  const fields = ['name', 'email', 'animal', 'message'].map((id) => document.getElementById(id));
  const errorBox = document.querySelector('#error-summary');
  const errorList = errorBox.querySelector('ul');
  const success = document.querySelector('#success');
  const formStatus = document.querySelector('#form-status');
  const draftStatus = document.querySelector('#draft-status');

  // Selaimen omat virhekuplat pois, mutta vain kun JavaScript on käynnissä.
  // Omat virheilmoitukset kertovat kaikki ongelmat kerralla ja suomeksi.
  form.noValidate = true;

  // Eläinvalikkoon vain kotia odottavat eläimet.
  for (const animal of available) {
    const option = make('option', `${animal.name} (${animal.label.toLowerCase()}, esimerkki)`);
    option.value = animal.id;
    select.append(option);
  }

  // Palauta keskeneräinen kysely, jos sellainen on tallennettu.
  // form.elements[name] löytää kentän sen name-attribuutin perusteella.
  const draft = loadDraft();
  if (draft) {
    for (const [name, value] of Object.entries(draft)) {
      const field = form.elements[name];
      if (field && typeof value === 'string') field.value = value;
    }
    // Jos tallennettu eläin on ehditty adoptoida, sitä ei voi enää valita.
    if (select.value !== draft.animal) select.value = '';
    draftStatus.textContent = 'Jatkat aiemmin aloittamaasi kyselyä. Tiedot on tallennettu vain tähän selaimeen.';
  }

  // Eläinkortin "Kysy eläimestä" -linkki valitsee eläimen valmiiksi.
  const requested = new URLSearchParams(location.search).get('animal');
  if (available.some((a) => a.id === requested)) select.value = requested;

  // Lomake on HTML:ssä pois käytöstä, kunnes JavaScript on ladattu.
  document.querySelector('#form-fields').disabled = false;

  // Näytä virhe kentän alla ja merkitse kenttä virheelliseksi.
  // aria-describedby (HTML:ssä) kytkee virhetekstin kenttään ruudunlukijalle.
  function showError(field, message) {
    const hint = document.getElementById(`${field.id}-error`);
    hint.textContent = message;
    hint.hidden = false;
    field.setAttribute('aria-invalid', 'true');
  }

  // Poista kentän virhe, myös virheyhteenvedosta.
  function clearError(field) {
    const hint = document.getElementById(`${field.id}-error`);
    hint.textContent = '';
    hint.hidden = true;
    field.removeAttribute('aria-invalid');
    errorList.querySelector(`a[href="#${field.id}"]`)?.parentElement.remove();
    if (errorList.children.length === 0) errorBox.hidden = true;
  }

  // Valmis-ilmoitus ja yhteenveto pois, kun lomaketta muutetaan.
  function hideReady() {
    success.hidden = true;
    formStatus.textContent = '';
  }

  // Yksi input-kuuntelija koko lomakkeelle (delegointi), kaksi tehtävää:
  // 1) poista virhe heti, kun kenttä on korjattu (uusia virheitä ei näytetä kesken kirjoittamisen)
  // 2) tallenna luonnos selaimeen, ettei kirjoitettu katoa
  form.addEventListener('input', (event) => {
    const field = event.target;
    if (field.getAttribute('aria-invalid') === 'true' && errorFor(field) === '') {
      clearError(field);
    }
    if (!success.hidden) hideReady();

    const data = Object.fromEntries(new FormData(form));
    const hasText = Object.values(data).some((value) => value.trim() !== '');
    if (hasText) saveDraft(data);
    else clearDraft();
  });

  // Tarkista kaikki kentät. Mitään ei lähetetä mihinkään.
  form.addEventListener('submit', (event) => {
    event.preventDefault();   // älä lähetä, älä lataa sivua uudelleen
    hideReady();
    errorList.replaceChildren();

    let firstInvalid = null;
    for (const field of fields) {
      field.value = field.value.trim();
      const message = errorFor(field);
      if (!message) {
        clearError(field);
        continue;
      }
      showError(field, message);
      firstInvalid ??= field;

      // Virheyhteenvedon linkki vie suoraan virheelliseen kenttään.
      const link = make('a', message);
      link.href = `#${field.id}`;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        field.focus();
      });
      const item = make('li');
      item.append(link);
      errorList.append(item);
    }

    if (firstInvalid) {
      errorBox.hidden = false;
      firstInvalid.focus();   // fokus ensimmäiseen virheelliseen kenttään
      return;
    }

    // Kaikki kunnossa: näytä yhteenveto ja kerro tilarivillä, että kysely on valmis.
    // Tilarivillä on role="status", joten ruudunlukija lukee sen ääneen.
    const data = Object.fromEntries(new FormData(form));
    const animalText = select.options[select.selectedIndex].text;
    const summary = document.querySelector('#summary-data');
    summary.replaceChildren(
      make('dt', 'Nimi'), make('dd', data.name),
      make('dt', 'Sähköposti'), make('dd', data.email),
      make('dt', 'Kiinnostava eläin'), make('dd', animalText),
      make('dt', 'Koti ja arki'), make('dd', data.message),
    );
    success.hidden = false;
    formStatus.textContent = `Kiitos, ${data.name}! Adoptiokyselysi on valmis, ja sen yhteenveto on alla. Kyselyä ei ole vielä välitetty Tassulalle.`;
  });

  // Tyhjennä lomake ja selaimeen tallennettu kysely.
  document.querySelector('#clear-form').addEventListener('click', () => {
    clearDraft();
    form.reset();
    for (const field of fields) clearError(field);
    hideReady();
    draftStatus.textContent = 'Lomake tyhjennetty. Tähän selaimeen ei ole enää tallennettu kyselyä.';
    fields[0].focus();
  });
}


// ---------- Käynnistys ----------

setupPreview();
setupListing();
setupForm();
