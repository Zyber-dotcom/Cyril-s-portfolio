/* ============================================================
   PORTFOLIO — CYRIL MARK MANTE
   script.js — Navigation, scroll effects, reveal, form
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Footer year ──────────────────────────────────────────
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  // ── 2. Navbar scroll state ──────────────────────────────────
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar(); // run on load


  // ── 3. Active nav link on scroll ────────────────────────────
  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.nav-link');
  const navHeight  = navbar ? navbar.offsetHeight : 72;

  function highlightNav() {
    let currentId = '';
    sections.forEach(section => {
      const top = section.offsetTop - navHeight - 20;
      if (window.scrollY >= top) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();


  // ── 4. Close mobile nav on link click ───────────────────────
  const navCollapse = document.getElementById('navMenu');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapse);
        bsCollapse.hide();
      }
    });
  });


  // ── 5. Scroll-reveal (IntersectionObserver) ─────────────────
  const revealEls = document.querySelectorAll(
    '.section-header, .about-intro, .about-body, .sub-heading, ' +
    '.goal-list, .strength-card, .skill-card, .edu-card, ' +
    '.project-card, .contact-intro, .contact-item, .social-btn, ' +
    '.contact-form-wrapper'
  );

  // Wrap each in .reveal class
  revealEls.forEach(el => el.classList.add('reveal'));

  // Also mark stagger containers
  const staggerContainers = document.querySelectorAll('.row.g-3, .hero-card-tags');
  staggerContainers.forEach(el => el.classList.add('stagger'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal, .stagger').forEach(el => observer.observe(el));


  // ── 6. Contact form ─────────────────────────────────────────
  const form     = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (form && feedback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear previous feedback
      feedback.className  = 'form-feedback';
      feedback.textContent = '';

      // Basic validation
      const name    = form.querySelector('#contactName').value.trim();
      const email   = form.querySelector('#contactEmail').value.trim();
      const subject = form.querySelector('#contactSubject').value.trim();
      const message = form.querySelector('#contactMessage').value.trim();

      if (!name || !email || !subject || !message) {
        feedback.classList.add('error');
        feedback.textContent = 'Please fill in all fields before sending.';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        feedback.classList.add('error');
        feedback.textContent = 'Please enter a valid email address.';
        return;
      }

      // Simulate sending (no backend; replace with fetch/EmailJS as needed)
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled  = true;
      submitBtn.innerHTML = 'Sending… <i class="fa-solid fa-circle-notch fa-spin ms-2"></i>';

      setTimeout(() => {
        feedback.classList.add('success');
        feedback.textContent = '✓ Message sent! I\'ll get back to you soon.';
        form.reset();
        submitBtn.disabled  = false;
        submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane ms-2"></i>';
      }, 1800);
    });
  }


  // ── 7. Smooth scroll for all anchor links ───────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = navbar ? navbar.offsetHeight : 72;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

}); // end DOMContentLoaded