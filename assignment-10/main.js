const menuBtn = document.querySelector('#menuBtn');
const mobileNav = document.querySelector('#mobileNav');
const filterButtons = document.querySelectorAll('.filter');
const serviceCards = document.querySelectorAll('.service-card');
const bookButtons = document.querySelectorAll('.book-btn');
const modal = document.querySelector('#bookingModal');
const modalClose = document.querySelector('#modalClose');
const modalTitle = document.querySelector('#modalTitle');
const modalService = document.querySelector('#modalService');
const form = document.querySelector('.booking-form');

menuBtn.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(isOpen));
});

mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    serviceCards.forEach((card) => {
      const shouldShow = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !shouldShow);
    });
  });
});

function openBookingModal(service, price) {
  modalTitle.textContent = `Book ${service}`;
  modalService.textContent = `${service} · ${price}`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

bookButtons.forEach((button) => {
  button.addEventListener('click', () => openBookingModal(button.dataset.service, button.dataset.price));
});

modalClose.addEventListener('click', closeBookingModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeBookingModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) closeBookingModal();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.textContent = 'Request sent ✓';
  submitButton.disabled = true;

  setTimeout(() => {
    submitButton.textContent = 'Confirm request';
    submitButton.disabled = false;
    form.reset();
    closeBookingModal();
  }, 1200);
});

document.querySelectorAll('.faq-item').forEach((item) => {
  item.addEventListener('click', () => {
    const panel = item.nextElementSibling;
    const icon = item.querySelector('strong');
    panel.classList.toggle('open');
    icon.textContent = panel.classList.contains('open') ? '−' : '+';
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
