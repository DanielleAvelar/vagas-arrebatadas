// Mobile menu
const menuToggle = document.getElementById('menu-toggle');
const primaryNav = document.getElementById('primary-nav');
menuToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});
primaryNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  primaryNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

// Active nav link on scroll
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('nav.primary-nav a');
const setActive = () => {
  let current = '';
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) current = sec.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
};
document.addEventListener('scroll', setActive, { passive: true });
setActive();

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Legal modals
function bindModal(openId, overlayId){
  const openEl = document.getElementById(openId);
  const overlay = document.getElementById(overlayId);
  openEl.addEventListener('click', (e) => {
    e.preventDefault();
    overlay.classList.add('open');
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.hasAttribute('data-close')) {
      overlay.classList.remove('open');
    }
  });
}
bindModal('open-privacy', 'privacy-overlay');
bindModal('open-cookies', 'cookies-overlay');
