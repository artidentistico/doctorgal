
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var form = e.target;
    var btn = document.getElementById('formSubmitBtn');
    var status = document.getElementById('formStatus');
    var data = new FormData(form);

    btn.disabled = true;
    btn.textContent = 'Se trimite…';

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: data
    })
    .then(function(res) { return res.json(); })
    .then(function(result) {
      status.style.display = 'block';
      if (result.success) {
        status.style.color = '#2e8b57';
        status.textContent = 'Mulțumim! Solicitarea a fost trimisă cu succes. Te vom contacta în curând.';
        form.reset();
      } else {
        status.style.color = '#c0392b';
        status.textContent = 'A apărut o eroare. Te rugăm să ne suni direct la 0752 119 919.';
      }
      btn.textContent = 'Trimite solicitarea';
      btn.disabled = !document.getElementById('gdprConsent').checked;
    })
    .catch(function() {
      status.style.display = 'block';
      status.style.color = '#c0392b';
      status.textContent = 'A apărut o eroare de conexiune. Te rugăm să ne suni direct la 0752 119 919.';
      btn.textContent = 'Trimite solicitarea';
      btn.disabled = !document.getElementById('gdprConsent').checked;
    });
  });


/* ==== combined main.js ==== */

  document.getElementById('privacyModal').addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('active');
  });


/* ==== combined main.js ==== */

  document.getElementById('legalModal').addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('active');
  });


/* ==== combined main.js ==== */

  document.getElementById('termsModal').addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('active');
  });


/* ==== combined main.js ==== */

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function closeNav() {
    navLinks.classList.remove('open');
    navOverlay.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  }
  function openNav() {
    navLinks.classList.add('open');
    navOverlay.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
  }
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('open');
      isOpen ? closeNav() : openNav();
    });
    navOverlay.addEventListener('click', closeNav);
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) closeNav();
    });
  }

  // Servicii dropdown (desktop hover handled by CSS; mobile/touch uses caret click)
  document.querySelectorAll('.nav-item-dropdown').forEach((item) => {
    const caret = item.querySelector('.nav-dropdown-caret');
    if (!caret) return;
    caret.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.nav-item-dropdown.open').forEach((el) => {
        el.classList.remove('open');
        el.querySelector('.nav-dropdown-caret').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        caret.setAttribute('aria-expanded', 'true');
      }
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item-dropdown')) {
      document.querySelectorAll('.nav-item-dropdown.open').forEach((el) => {
        el.classList.remove('open');
        el.querySelector('.nav-dropdown-caret').setAttribute('aria-expanded', 'false');
      });
    }
  });


/* ==== combined main.js ==== */

  // Custom cursor
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx - 4 + 'px';
    cursor.style.top = my - 4 + 'px';
  });
  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx - 18 + 'px';
    ring.style.top = ry - 18 + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
  document.querySelectorAll('a, button, .service-card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '60px'; ring.style.height = '60px';
      ring.style.opacity = '0.3';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '36px'; ring.style.height = '36px';
      ring.style.opacity = '0.5';
    });
  });

  // Fallback: show all content after 2 seconds if animations fail
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }, 2000);

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => obs.observe(el));


/* ==== combined main.js ==== */

  (function() {
    var consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      var banner = document.getElementById('cookieBanner');
      setTimeout(function() { banner.classList.add('visible'); }, 800);
    }
  })();

  function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.getElementById('cookieBanner').classList.remove('visible');
  }

  function necessaryOnlyCookies() {
    localStorage.setItem('cookieConsent', 'necessary-only');
    document.getElementById('cookieBanner').classList.remove('visible');
  }
