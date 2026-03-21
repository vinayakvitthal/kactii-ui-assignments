/* ============================================================
   NexusQueue — main.js
   ============================================================ */

/* ── SCROLL REVEAL ── */
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
})();


/* ── COUNT-UP ANIMATION ── */
function animateCount(el, target, duration) {
  duration = duration || 1800;
  let start = 0;
  const suffix = target < 20 ? 'x' : '%';

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

(function initStats() {
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = parseInt(e.target.dataset.target, 10);
        animateCount(e.target, target);
        statsObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-target]').forEach(el => statsObserver.observe(el));
})();


/* ── HERO PROCESSED-JOBS COUNTER ── */
(function initHeroCounter() {
  let count = 0;
  const el  = document.getElementById('counter1');
  if (!el) return;

  function tick() {
    count += Math.floor(Math.random() * 12) + 1;
    el.textContent = count.toLocaleString();
    setTimeout(tick, Math.random() * 800 + 200);
  }
  tick();
})();


/* ── NAVBAR SCROLL STYLE ── */
(function initNavbar() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
})();


/* ── LIVE JOB TABLE UPDATE ── */
(function initJobTable() {
  const statuses = [
    { cls: 'completed', label: '● Completed' },
    { cls: 'running',   label: '● Running'   },
    { cls: 'failed',    label: '● Failed'    },
    { cls: 'scheduled', label: '● Scheduled' }
  ];

  const workers = [
    'GenerateReport', 'SendEmailBatch', 'ProcessPayment',
    'ResizeImages',   'SyncInventory',  'CleanupLogs'
  ];

  const queues = [
    'analytics', 'mailer', 'billing', 'media', 'sync', 'default'
  ];

  let jobId = 8824;
  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  setInterval(() => {
    const tbody = document.querySelector('.job-table tbody');
    if (!tbody) return;

    jobId++;
    const s   = rand(statuses);
    const w   = rand(workers);
    const q   = rand(queues);
    const dur = s.cls === 'scheduled'
      ? '—'
      : (Math.random() * 9 + 0.1).toFixed(1) + 's';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="font-family:'DM Mono',monospace;color:var(--muted)">#j-${jobId}</td>
      <td>${w}</td>
      <td>${q}</td>
      <td><span class="status-badge ${s.cls}">${s.label}</span></td>
      <td style="color:var(--muted);font-family:'DM Mono',monospace">${dur}</td>
    `;

    row.style.opacity    = '0';
    row.style.transition = 'opacity 0.4s';
    tbody.insertBefore(row, tbody.firstChild);
    requestAnimationFrame(() => { row.style.opacity = '1'; });

    /* keep table at max 5 rows */
    while (tbody.children.length > 5) {
      const old = tbody.lastChild;
      old.style.opacity = '0';
      setTimeout(() => old.remove(), 400);
    }
  }, 2200);
})();