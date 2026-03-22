/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

/* ── HERO TABS (visual only) ── */
document.querySelectorAll('.hero-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.hero-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* ── CODE TABS ── */
document.querySelectorAll('.code-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.dataset.codetab;
    // deactivate all
    btn.closest('.code-tabs-wrap').querySelectorAll('.code-tab-btn').forEach(b => b.classList.remove('active'));
    btn.closest('.code-tabs-wrap').querySelectorAll('.code-panel').forEach(p => p.classList.remove('active'));
    // activate target
    btn.classList.add('active');
    const panel = document.getElementById('tab-' + tabId);
    if (panel) panel.classList.add('active');
  });
});

/* ── FAQ ACCORDION ── */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    // open clicked if it was closed
    if (!isOpen) item.classList.add('open');
  });
});

/* ── HERO DOC COUNTER ── */
(function() {
  let count = 0;
  const el = document.getElementById('doc-counter');
  if (!el) return;
  function tick() {
    count += Math.floor(Math.random() * 3) + 1;
    el.textContent = count.toLocaleString();
    setTimeout(tick, Math.random() * 1200 + 600);
  }
  tick();
})();

/* ── NAVBAR SHADOW ON SCROLL ── */
window.addEventListener('scroll', () => {
  document.querySelector('.site-nav').style.boxShadow =
    window.scrollY > 10 ? '0 2px 16px rgba(0,0,0,0.07)' : 'none';
});