// ===== LOADER (SMOOTH FADE OUT) =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("hidden");

    // Optional: remove loader from DOM completely
    setTimeout(() => {
      loader.remove();
    }, 500);
  }, 1500); // slightly faster for better UX
});


// ===== NAVBAR =====
const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Scroll effect
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("open"); // animation hook
});

// Close menu on link click
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("open");
  });
});


// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active-link");
    }
  });
});


// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    window.scrollTo({
      top: target.offsetTop - 70,
      behavior: "smooth"
    });
  });
});


// ===== CONTACT FORM (BETTER UX) =====
const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const btn = form.querySelector("button[type='submit']");
  const originalText = btn.innerHTML;

  // Loading state
  btn.innerHTML = "Sending...";
  btn.disabled = true;

  setTimeout(() => {
    // Success state
    btn.innerHTML = "✔ Message Sent!";
    btn.style.background = "#16a34a";

    form.reset();

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = "";
      btn.disabled = false;
    }, 2500);

  }, 1200);
});


// ===== AOS =====
AOS.init({
  duration: 900,
  once: true,
  offset: 80,
  easing: "ease-in-out"
});