const menuButton=document.getElementById('menuButton');const nav=document.getElementById('navlinks');menuButton.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(opened));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));
const sections=[...document.querySelectorAll('main section[id]')];const navLinks=[...nav.querySelectorAll('a')];if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id));}}},{rootMargin:'-25% 0px -65% 0px'});sections.forEach(section=>observer.observe(section));}


// Animasi konten (bukan navigasi): kartu dan poin refleksi muncul bertahap saat masuk viewport.
(() => {
  const selector = [
    '.hero > div', '.hero-panel', '.profile-strip', '.profile-steps > div',
    '.stats > .stat', '.section-head', '.card', '.timeline > .card',
    '#lk1 .lms-promptline', '#lk1 .grid > *',
    '.reflection-intro', '.reflection-grid > .reflection-card',
    '.reflection-detail .fourc-item', '.reflection-detail .artifact-evidence', '.detail-list > .detail',
    '.competency-grid > .competency-card', '.competency-source',
    '.seminar-course-card', '.seminar-timeline > article', '.seminar-reflection-card',
    '.bridge-panel', '.bridge-list > .bridge-item',
    '.lms-rubricline', '.lk4-lms-map', '.lk4-map-grid > article',
    '.gallery > figure', '.roadmap > .road', '#lk4 .highlight', '#lk4 .quote',
    '.cycle > div', '.prompt-grid > div', '.path > .path-row', '.chips > .chip', '.tagrow > .tag',
    '.fourc-mini > span', '.seminar-steps > div', '.highlight', '.quote'
  ].join(',');
  const targets = [...document.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!targets.length || reduceMotion) return;
  if (!('IntersectionObserver' in window)) return;

  // Atur jeda per kelompok agar setiap baris terasa bertahap, bukan seluruh halaman sekaligus.
  const siblingsSeen = new Map();
  targets.forEach((el) => {
    el.classList.add('content-reveal');
    const parent = el.parentElement;
    const index = siblingsSeen.get(parent) || 0;
    siblingsSeen.set(parent, index + 1);
    el.style.setProperty('--content-delay', `${Math.min(index * 65, 260)}ms`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.08 });

  const observeIfVisible = (el) => {
    // Elemen di dalam <details> tertutup baru dianimasikan ketika detail dibuka.
    const closedDetails = el.closest('details:not([open])');
    if (closedDetails) return;
    observer.observe(el);
  };
  targets.forEach(observeIfVisible);

  document.querySelectorAll('details').forEach((details) => {
    details.addEventListener('toggle', () => {
      if (!details.open) return;
      const hiddenTargets = details.querySelectorAll('.content-reveal:not(.is-visible)');
      hiddenTargets.forEach((el, index) => {
        // Tambahkan kembali ke observer, lalu paksa reveal jika sudah berada di layar.
        observer.observe(el);
        if (el.getBoundingClientRect().top < window.innerHeight) {
          window.setTimeout(() => el.classList.add('is-visible'), Math.min(index * 40, 240));
        }
      });
    });
  });
})();
