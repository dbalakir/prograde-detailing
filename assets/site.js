// Section parts rise in once as they enter the viewport.
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
document.querySelectorAll('.rise').forEach((el) => io.observe(el));

// Recent jobs: pointing at or focusing a name shows its photo in the frame.
document.querySelectorAll('.index').forEach((root) => {
  const rows = [...root.querySelectorAll('a[data-shot]')];
  const shots = [...root.querySelectorAll('.frame img')];
  const show = (row) => {
    rows.forEach((r) => r.classList.toggle('is-active', r === row));
    shots.forEach((img) => img.classList.toggle('is-active', img.dataset.shot === row.dataset.shot));
  };
  rows.forEach((row) => {
    row.addEventListener('pointerenter', () => show(row));
    row.addEventListener('focus', () => show(row));
  });
});

// Showcase tabs: switch the photo and the text.
document.querySelectorAll('[data-tabs]').forEach((root) => {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const select = (tab) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    root.querySelectorAll('.plate img').forEach((img) => img.classList.toggle('is-active', img.dataset.tab === tab.id));
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      const next = tabs[(i + d + tabs.length) % tabs.length];
      next.focus();
      select(next);
    });
  });
});

// The phone action bar steps aside once the booking card is on screen; the card has the same actions.
// It also stays hidden on the first screen, where the hero already shows them.
const onScreen = new Set();
const barIo = new IntersectionObserver((entries) => {
  entries.forEach((e) => (e.isIntersecting ? onScreen.add(e.target) : onScreen.delete(e.target)));
  document.body.classList.toggle('bar-off', onScreen.size > 0);
}, { threshold: 0, rootMargin: '0px 0px 80px 0px' });
document.querySelectorAll('.hero-actions, #book').forEach((el) => barIo.observe(el));

document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

// Phone menu: the toggle opens the nav as a full-screen panel.
const header = document.querySelector('.site-header');
const toggle = header && header.querySelector('.menu-toggle');
if (toggle) {
  const setOpen = (open) => {
    header.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
  };
  toggle.addEventListener('click', () => setOpen(!header.classList.contains('is-open')));
  header.querySelectorAll('.nav a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && header.classList.contains('is-open')) { setOpen(false); toggle.focus(); } });
  matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
}
