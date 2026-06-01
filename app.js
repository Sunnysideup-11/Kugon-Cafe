/* =========================================================
   KUGON CAFÉ — simplified front-end
   No auth, no cart. Browse + product details + order popup.
   Data can be overridden by admin.html via localStorage 'kugon_data'.
========================================================= */

/* =========================================================
   ⚠️  PASTE YOUR APPS SCRIPT WEB APP URL BELOW
   This makes every visitor automatically fetch the latest
   data from your Google Sheet when they load the page.
   (Without this, only YOUR browser sees admin edits.)
========================================================= */
const APPS_SCRIPT_URL = 'PASTE_YOUR_URL_HERE';
// Example: 'https://script.google.com/macros/s/AKfycby.../exec'

/* ---------- DEFAULT DATA ---------- */
const DEFAULT_PRODUCTS = [
  { id: 'p1', name: 'Espresso', category: 'Espresso', price: 110, color: '#3a1f0f',
    desc: 'Bold, concentrated shot of pure character. Nutty crema, deep finish.',
    long: 'A 30ml shot of pure espresso — the foundation of every coffee on our menu. Pulled from our house blend of Ethiopian and Sumatran beans, expect a thick crema, dark chocolate notes, and a clean, lingering finish. Served in a warmed demitasse cup.',
    notes: ['Dark Chocolate', 'Nutty', 'Caramel'],
    serving: '30 ml · Single shot',
    caffeine: '63 mg' },
  { id: 'p2', name: 'Americano', category: 'Espresso', price: 130, color: '#5a3418',
    desc: 'Espresso lengthened with hot water. Clean, smooth, all-day friendly.',
    long: 'A double shot of espresso poured over hot water — a longer, smoother drink without losing the rich espresso character. Our most-ordered drink for working mornings.',
    notes: ['Smooth', 'Cocoa', 'Roasted Nuts'],
    serving: '240 ml',
    caffeine: '126 mg' },
  { id: 'p3', name: 'Cappuccino', category: 'Milk-Based', price: 160, color: '#a37846',
    desc: 'Equal parts espresso, steamed milk, and airy foam. The classic.',
    long: 'The Italian classic done right — equal thirds of espresso, steamed milk, and dense microfoam. Dusted with a hint of cocoa on request. Best enjoyed before 11am, the way it was meant to be.',
    notes: ['Velvety', 'Balanced', 'Cocoa Hint'],
    serving: '180 ml',
    caffeine: '126 mg' },
  { id: 'p4', name: 'Latte', category: 'Milk-Based', price: 170, color: '#caa169',
    desc: 'Silky steamed milk over a double shot. Comforting, mellow, lovely.',
    long: 'A generous pour of silky steamed milk over a double espresso, finished with a thin layer of microfoam. Latte art comes free. Available with oat, soy, or almond milk (+₱20).',
    notes: ['Creamy', 'Mild', 'Sweet'],
    serving: '300 ml',
    caffeine: '126 mg' },
  { id: 'p5', name: 'Mocha', category: 'Flavored', price: 190, color: '#6b3410',
    desc: 'Dark chocolate, espresso, and steamed milk. Dessert in a cup.',
    long: 'House-made dark chocolate sauce stirred into espresso, topped with steamed milk and a swirl of whipped cream. The grown-up version of the hot chocolate you loved as a kid.',
    notes: ['Dark Chocolate', 'Sweet', 'Decadent'],
    serving: '300 ml',
    caffeine: '126 mg' },
  { id: 'p6', name: 'Caramel Macchiato', category: 'Flavored', price: 200, color: '#b88656',
    desc: 'Vanilla, steamed milk, espresso, and a drizzle of caramel on top.',
    long: 'Vanilla syrup and steamed milk layered with espresso (which "marks" the milk — hence macchiato), then crowned with a generous drizzle of house-made caramel. Sweet, layered, beautiful.',
    notes: ['Caramel', 'Vanilla', 'Sweet'],
    serving: '300 ml',
    caffeine: '126 mg' },
  { id: 'p7', name: 'Cold Brew', category: 'Cold', price: 180, color: '#2a1607',
    desc: 'Steeped for 16 hours. Smooth, low-acid, refreshingly bold.',
    long: 'Coarsely-ground beans steeped in cold filtered water for 16 hours, then strained slow. The result: a remarkably smooth, naturally sweet coffee with up to 70% less acidity than hot-brewed. Served over big ice cubes.',
    notes: ['Smooth', 'Low-Acid', 'Chocolatey'],
    serving: '400 ml',
    caffeine: '200 mg' },
  { id: 'p8', name: 'Vanilla Latte', category: 'Flavored', price: 185, color: '#d4a574',
    desc: 'House-made vanilla syrup, espresso, and velvety steamed milk.',
    long: 'Our standard latte with two pumps of house-made Madagascar vanilla syrup. Warm, comforting, and the most-ordered drink during exam season.',
    notes: ['Vanilla', 'Creamy', 'Sweet'],
    serving: '300 ml',
    caffeine: '126 mg' },
  { id: 'p9', name: 'Iced Americano', category: 'Cold', price: 150, color: '#3a2010',
    desc: 'Espresso poured over ice and cold water. Crisp wake-up call.',
    long: 'A double shot of espresso poured over a tall glass of ice and cold water. Bracingly crisp and unsweetened — the way many baristas drink their coffee.',
    notes: ['Crisp', 'Bold', 'Refreshing'],
    serving: '400 ml',
    caffeine: '126 mg' },
  { id: 'p10', name: 'Flat White', category: 'Milk-Based', price: 175, color: '#9a6f3d',
    desc: 'Micro-foam steamed milk over a ristretto double. Velvet texture.',
    long: 'A ristretto double shot under silky micro-foamed milk — less foam than a latte, more intensity than a cappuccino. The Antipodean way to enjoy espresso.',
    notes: ['Velvet', 'Intense', 'Smooth'],
    serving: '180 ml',
    caffeine: '130 mg' },
  { id: 'p11', name: 'Hazelnut Mocha', category: 'Flavored', price: 210, color: '#7a4a22',
    desc: 'Hazelnut, dark chocolate, espresso, milk. Nutty and decadent.',
    long: 'Toasted hazelnut syrup, house dark chocolate, and a double espresso, finished with steamed milk and whipped cream. Tastes like a warm hug.',
    notes: ['Hazelnut', 'Chocolate', 'Nutty'],
    serving: '300 ml',
    caffeine: '126 mg' },
  { id: 'p12', name: 'Iced Latte', category: 'Cold', price: 175, color: '#e8c89a',
    desc: 'Espresso, cold milk, ice. Smooth and refreshing — no fuss.',
    long: 'A double shot of espresso over cold milk and ice. Simple, refreshing, and quietly perfect on a hot afternoon. Add vanilla, caramel, or hazelnut syrup for +₱20.',
    notes: ['Refreshing', 'Smooth', 'Mild'],
    serving: '400 ml',
    caffeine: '126 mg' },
];

const DEFAULT_DATA = {
  products: DEFAULT_PRODUCTS,
  contact: {
    address: 'Macabulos Dr,<br/>Tarlac City, Tarlac<br/>Philippines',
    addressShort: 'Macabulos Dr, Tarlac City',
    hours: 'Mon–Fri · 10:00am – 12:00am<br/>Sat–Sun · 8:00am – 10:00pm',
    phone: '+63 2 123 4567',
    phoneHref: 'tel:+6321234567',
    email: 'hello@kugoncafe.com',
    mapLat: 15.4758729,
    mapLng: 120.585398,
    mapZoom: 17,
  },
  orderLinks: {
    foodpanda: 'https://www.foodpanda.ph/',
    grab: 'https://food.grab.com/ph/en/',
    facebook: 'https://www.facebook.com/',
  },
  todaysPour: {
    name: 'Ethiopia Yirgacheffe',
    notes: 'Floral · Citrus · Honey',
    price: '₱180',
  },
  team: [
    { id: 't1', name: 'Emmanuel Perez', role: 'Head Barista · Q-grader', image: 'images/Emmanuel.jpg' },
    { id: 't2', name: 'Santi Seguin',   role: 'Roaster · Bean buyer',    image: 'images/Santi.jpg' },
    { id: 't3', name: 'Aira Alcantara', role: 'Pastry chef',             image: 'images/Aira.jpg' },
    { id: 't4', name: 'Raffi Mendoza',  role: 'Owner · Daydreamer',      image: 'images/Raffi.jpg' },
  ],
  sheets: { appsScriptUrl: '' },
};

/* ---------- DATA LOADER (defaults + localStorage overrides) ---------- */
function loadData() {
  try {
    const stored = JSON.parse(localStorage.getItem('kugon_data') || '{}');
    return {
      products: stored.products || DEFAULT_DATA.products,
      contact: { ...DEFAULT_DATA.contact, ...(stored.contact || {}) },
      orderLinks: { ...DEFAULT_DATA.orderLinks, ...(stored.orderLinks || {}) },
      todaysPour: { ...DEFAULT_DATA.todaysPour, ...(stored.todaysPour || {}) },
      team: (stored.team && stored.team.length) ? stored.team : DEFAULT_DATA.team,
      sheets: { ...DEFAULT_DATA.sheets, ...(stored.sheets || {}) },
    };
  } catch {
    return DEFAULT_DATA;
  }
}

let DATA = loadData();
let PRODUCTS = DATA.products;

/* ---------- Apply editable data to the DOM ---------- */
function applyDataToDom() {
  // Contact section
  const addrEl = document.getElementById('contactAddress');
  if (addrEl) addrEl.innerHTML = DATA.contact.address;
  const hoursEl = document.getElementById('contactHours');
  if (hoursEl) hoursEl.innerHTML = DATA.contact.hours;
  const phoneEl = document.getElementById('contactPhone');
  if (phoneEl) {
    phoneEl.textContent = DATA.contact.phone;
    phoneEl.href = DATA.contact.phoneHref || ('tel:' + DATA.contact.phone.replace(/\s/g, ''));
  }
  const emailEl = document.getElementById('contactEmail');
  if (emailEl) {
    emailEl.textContent = DATA.contact.email;
    emailEl.href = 'mailto:' + DATA.contact.email;
  }
  // Footer
  const fAddr = document.getElementById('footerAddress');
  if (fAddr) fAddr.textContent = DATA.contact.addressShort;
  const fPhone = document.getElementById('footerPhone');
  if (fPhone) fPhone.textContent = DATA.contact.phone;
  const fEmail = document.getElementById('footerEmail');
  if (fEmail) fEmail.textContent = DATA.contact.email;
  // Map iframe
  const mapEl = document.getElementById('contactMap');
  if (mapEl) {
    const iframe = mapEl.querySelector('iframe');
    if (iframe) {
      const { mapLat, mapLng, mapZoom } = DATA.contact;
      iframe.src = `https://maps.google.com/maps?q=${mapLat},${mapLng}&z=${mapZoom || 17}&output=embed`;
    }
  }
  // Order platform links
  document.querySelectorAll('a.platform-btn--foodpanda').forEach(a => a.href = DATA.orderLinks.foodpanda);
  document.querySelectorAll('a.platform-btn--grab').forEach(a => a.href = DATA.orderLinks.grab);
  document.querySelectorAll('a.platform-btn--facebook').forEach(a => a.href = DATA.orderLinks.facebook);
  // Today's Pour (hero card)
  if (DATA.todaysPour) {
    const pName = document.getElementById('pourName');
    const pNotes = document.getElementById('pourNotes');
    const pPrice = document.getElementById('pourPrice');
    if (pName) pName.textContent = DATA.todaysPour.name || '';
    if (pNotes) pNotes.textContent = DATA.todaysPour.notes || '';
    if (pPrice) pPrice.textContent = DATA.todaysPour.price || '';
  }
  // Team — "The humans behind the bar"
  const teamGrid = document.getElementById('teamGrid');
  if (teamGrid && DATA.team && DATA.team.length > 0) {
    teamGrid.innerHTML = DATA.team.map(t => {
      const safeName = t.name.replace(/"/g, '&quot;');
      const initials = t.name.split(/\s+/).filter(Boolean).slice(0, 2).map(s => s[0]).join('').toUpperCase();
      const photo = t.image
        ? `<img class="team-card__avatar" src="${t.image}" alt="${safeName}" onerror="this.outerHTML='<div class=&quot;team-card__avatar team-card__avatar--placeholder&quot;>${initials}</div>'" />`
        : `<div class="team-card__avatar team-card__avatar--placeholder">${initials}</div>`;
      return `<article class="team-card">
        ${photo}
        <h4>${t.name}</h4>
        <p>${t.role}</p>
      </article>`;
    }).join('');
  }
}

/* ---------- THEME ---------- */
const savedTheme = localStorage.getItem('hb_theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
document.getElementById('themeToggle').addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('hb_theme', next);
});

/* ---------- TOASTS ---------- */
const toasts = document.getElementById('toasts');
function toast(msg, kind = '') {
  const el = document.createElement('div');
  el.className = `toast ${kind ? 'toast--' + kind : ''}`;
  el.textContent = msg;
  toasts.appendChild(el);
  setTimeout(() => el.remove(), 3100);
}

/* ---------- ROUTER ---------- */
const filter = { search: '', category: 'all', sort: 'default' };

function setRoute(name) {
  document.querySelectorAll('.route').forEach(r => r.classList.toggle('is-active', r.dataset.page === name));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('is-active', l.dataset.route === name));
  window.scrollTo({ top: 0, behavior: 'instant' });
  closeMobileMenu();
  if (name === 'menu') renderMenu();
}

document.body.addEventListener('click', e => {
  const r = e.target.closest('[data-route]');
  if (r) {
    e.preventDefault();
    setRoute(r.dataset.route);
  }
});

/* ---------- NAV ---------- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 12);
}, { passive: true });

const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav__links');
mobileBtn.addEventListener('click', () => navLinks.classList.toggle('is-open'));
function closeMobileMenu() { navLinks.classList.remove('is-open'); }

/* ---------- HELPERS ---------- */
function shade(hex, percent) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (n >> 16) + percent));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + percent));
  const b = Math.max(0, Math.min(255, (n & 0xff) + percent));
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

function cupSvg(color) {
  const id = color.slice(1);
  return `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="b${id}" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#f8efe1"/>
          <stop offset="100%" stop-color="#e8d8b8"/>
        </linearGradient>
      </defs>
      <path d="M28 42 Q28 36 34 36 L86 36 Q92 36 92 42 L86 92 Q84 102 74 102 L46 102 Q36 102 34 92 Z" fill="url(#b${id})" stroke="#3a1f0f" stroke-width="1.5"/>
      <path d="M92 50 Q108 52 108 66 Q108 80 92 82" fill="none" stroke="#3a1f0f" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="60" cy="46" rx="28" ry="6" fill="${color}"/>
      <circle cx="60" cy="46" r="3" fill="#f4e4cb" opacity=".7"/>
    </svg>`;
}

function cupSvgLarge(color) {
  const id = color.slice(1) + 'L';
  return `
    <svg viewBox="0 0 240 280" width="100%" height="100%">
      <defs>
        <linearGradient id="bL${id}" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#f8efe1"/>
          <stop offset="100%" stop-color="#e8d8b8"/>
        </linearGradient>
        <linearGradient id="brew${id}" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="${shade(color, 20)}"/>
          <stop offset="100%" stop-color="${color}"/>
        </linearGradient>
      </defs>
      <ellipse cx="120" cy="248" rx="110" ry="14" fill="#2a1607" opacity=".15"/>
      <ellipse cx="120" cy="240" rx="95" ry="12" fill="#3a2010" opacity=".4"/>
      <path d="M40 90 Q40 80 50 80 L190 80 Q200 80 200 90 L185 220 Q183 240 165 240 L75 240 Q57 240 55 220 Z" fill="url(#bL${id})" stroke="#2a1607" stroke-width="2"/>
      <path d="M200 110 Q235 115 235 150 Q235 185 200 190" fill="none" stroke="#2a1607" stroke-width="6" stroke-linecap="round"/>
      <ellipse cx="120" cy="92" rx="78" ry="12" fill="url(#brew${id})"/>
      <ellipse cx="120" cy="90" rx="60" ry="6" fill="#f4e4cb" opacity=".5"/>
      <circle cx="120" cy="92" r="5" fill="#f4e4cb" opacity=".8"/>
    </svg>`;
}

/* ---------- PRODUCT CARD ---------- */
function productCard(p) {
  const visual = p.image
    ? `<img src="${p.image}" class="product-card__photo" alt="${p.name}" loading="lazy" />`
    : cupSvg(p.color);
  return `
    <article class="product-card" data-product="${p.id}">
      <div class="product-card__img ${p.image ? 'has-image' : ''}" style="--c1:${p.color};--c2:${shade(p.color, -30)}">
        ${visual}
        <span class="product-card__cat">${p.category}</span>
      </div>
      <h3 class="product-card__name">${p.name}</h3>
      <p class="product-card__desc">${p.desc}</p>
      <div class="product-card__foot">
        <span class="product-card__price">₱${p.price}</span>
        <span class="view-btn">
          View
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </div>
    </article>`;
}

/* ---------- FEATURED ---------- */
function renderFeatured() {
  const featured = PRODUCTS.slice(0, 4);
  document.getElementById('featuredGrid').innerHTML = featured.map(p => productCard(p)).join('');
}

/* ---------- MENU ---------- */
function renderCategoryChips() {
  const chipsEl = document.getElementById('categoryChips');
  if (!chipsEl) return;
  // Get unique categories from current PRODUCTS, preserving order of first appearance
  const cats = [];
  PRODUCTS.forEach(p => { if (!cats.includes(p.category)) cats.push(p.category); });
  chipsEl.innerHTML =
    `<button class="chip ${filter.category === 'all' ? 'is-active' : ''}" data-cat="all">All</button>` +
    cats.map(c => `<button class="chip ${filter.category === c ? 'is-active' : ''}" data-cat="${c}">${c}</button>`).join('');
}

function renderMenu() {
  renderCategoryChips();
  const grid = document.getElementById('menuGrid');
  const empty = document.getElementById('menuEmpty');
  let list = [...PRODUCTS];

  if (filter.category !== 'all') {
    list = list.filter(p => p.category === filter.category);
  }
  if (filter.search) {
    const q = filter.search.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  }
  if (filter.sort === 'price-asc') list.sort((a, b) => a.price - b.price);
  if (filter.sort === 'price-desc') list.sort((a, b) => b.price - a.price);
  if (filter.sort === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name));

  grid.innerHTML = list.map(p => productCard(p)).join('');
  empty.hidden = list.length > 0;
}

document.getElementById('menuSearch').addEventListener('input', e => {
  filter.search = e.target.value;
  renderMenu();
});

document.getElementById('categoryChips').addEventListener('click', e => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  document.querySelectorAll('#categoryChips .chip').forEach(c => c.classList.remove('is-active'));
  chip.classList.add('is-active');
  filter.category = chip.dataset.cat;
  renderMenu();
});

document.getElementById('sortSelect').addEventListener('change', e => {
  filter.sort = e.target.value;
  renderMenu();
});

/* ---------- PRODUCT DETAIL ---------- */
function openProductDetail(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const el = document.getElementById('productDetail');
  const visual = p.image
    ? `<img src="${p.image}" class="product-detail__photo" alt="${p.name}" />`
    : cupSvgLarge(p.color);
  el.innerHTML = `
    <div class="product-detail__visual ${p.image ? 'has-image' : ''}" style="--c1:${p.color};--c2:${shade(p.color, -40)}">
      ${visual}
      <span class="product-card__cat">${p.category}</span>
    </div>
    <div class="product-detail__body">
      <h2 class="product-detail__name">${p.name}</h2>
      <div class="product-detail__price">₱${p.price}</div>
      <p class="product-detail__long">${p.long}</p>

      <div class="product-detail__notes">
        <div class="product-detail__label">Flavor Notes</div>
        <div class="notes-row">
          ${p.notes.map(n => `<span class="note-pill">${n}</span>`).join('')}
        </div>
      </div>

      <div class="product-detail__specs">
        <div>
          <div class="product-detail__label">Serving</div>
          <div class="product-detail__value">${p.serving}</div>
        </div>
        <div>
          <div class="product-detail__label">Caffeine</div>
          <div class="product-detail__value">${p.caffeine}</div>
        </div>
        <div>
          <div class="product-detail__label">Category</div>
          <div class="product-detail__value">${p.category}</div>
        </div>
      </div>

      <button class="btn btn--primary btn--full" data-open-order>
        Order Now
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </button>
    </div>`;
  openModal('productDetailModal');
}

// Click product card → detail
document.body.addEventListener('click', e => {
  const card = e.target.closest('[data-product]');
  if (card) {
    openProductDetail(card.dataset.product);
  }
});

/* ---------- ORDER MODAL ---------- */
// Any element with [data-open-order] opens the order platforms modal
document.body.addEventListener('click', e => {
  const trigger = e.target.closest('[data-open-order]');
  if (trigger) {
    e.preventDefault();
    // If product detail is open, close it first so order modal sits cleanly on top
    closeModal('productDetailModal');
    openModal('orderModal');
  }
});

/* ---------- MODAL helpers ---------- */
function openModal(id) {
  document.getElementById(id).classList.add('is-open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('is-open');
  // Restore body scroll if no modal still open
  if (!document.querySelector('.modal.is-open')) {
    document.body.style.overflow = '';
  }
}
document.querySelectorAll('[data-close-modal]').forEach(b => {
  b.addEventListener('click', e => closeModal(e.target.closest('.modal').id));
});
document.querySelectorAll('.modal').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) closeModal(m.id); });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.is-open').forEach(m => closeModal(m.id));
  }
});

/* ---------- CONTACT FORM ---------- */
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  toast('Message sent — we\'ll be in touch ☕', 'success');
  e.target.reset();
});

/* ---------- SHEETS SYNC (optional, fetches latest from Apps Script on page load) ---------- */
async function trySyncFromSheets() {
  // Prefer the baked-in constant; fall back to localStorage (admin-configured)
  const url = (APPS_SCRIPT_URL && APPS_SCRIPT_URL !== 'PASTE_YOUR_URL_HERE')
    ? APPS_SCRIPT_URL
    : (DATA.sheets && DATA.sheets.appsScriptUrl);
  if (!url) return;
  try {
    const res = await fetch(`${url}?action=getAll`, { method: 'GET' });
    if (!res.ok) throw new Error('Fetch failed: ' + res.status);
    const json = await res.json();
    if (!json.ok || !json.data) return;
    const remote = json.data;
    if (remote.products && remote.products.length > 0) {
      const merged = {
        ...DATA,
        products: remote.products,
        contact: { ...DATA.contact, ...(remote.contact || {}) },
        orderLinks: { ...DATA.orderLinks, ...(remote.orderLinks || {}) },
        team: (remote.team && remote.team.length) ? remote.team : DATA.team,
      };
      localStorage.setItem('kugon_data', JSON.stringify({
        ...JSON.parse(localStorage.getItem('kugon_data') || '{}'),
        products: merged.products,
        contact: merged.contact,
        orderLinks: merged.orderLinks,
        team: merged.team,
      }));
      DATA = loadData();
      PRODUCTS = DATA.products;
      applyDataToDom();
      renderFeatured();
      if (document.querySelector('.route--menu.is-active')) renderMenu();
      console.log('Synced data from Google Sheets');
    }
  } catch (err) {
    console.warn('Sheets sync skipped:', err.message);
  }
}

/* ---------- INIT ---------- */
applyDataToDom();
renderFeatured();
trySyncFromSheets();
