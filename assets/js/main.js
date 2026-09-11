/* =====================================================================
   assets/js/main.js — Fernleigh & Co.
   Vanilla ES6+, layered on top of Bootstrap 5's own JS (navbar collapse,
   dropdowns, offcanvas, modal, accordion and carousel are all native
   Bootstrap components driven by data-bs-* attributes in the markup —
   no custom code needed for those). This file only covers what Bootstrap
   doesn't provide: theme, direction switcher, scroll reveal, back-to-top,
   skeleton loaders, quantity steppers, gallery thumbnails, wishlist/bag
   toggle state, and form validation.
   ===================================================================== */

const Fernleigh = (() => {
  const THEME_KEY = 'fernleigh-theme';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initTheme() {
    const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark' || stored === 'light') {
      document.documentElement.setAttribute('data-theme', stored);
      toggleButtons.forEach(btn => btn.setAttribute('aria-pressed', String(stored === 'dark')));
    }
    toggleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const current = document.documentElement.getAttribute('data-theme') || (prefersDark ? 'dark' : 'light');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem(THEME_KEY, next);
        toggleButtons.forEach(b => b.setAttribute('aria-pressed', String(next === 'dark')));
      });
    });
  }

  function initDirection() {
    const switcher = document.querySelector('[data-dir-switch]');
    if (!switcher) return;
    switcher.addEventListener('change', (e) => {
      const val = e.target.value;
      document.documentElement.setAttribute('dir', val);
      document.documentElement.setAttribute('lang', val === 'rtl' ? 'ar' : 'en');
      localStorage.setItem('fernleigh-dir', val);
    });
    const savedDir = localStorage.getItem('fernleigh-dir');
    if (savedDir) { switcher.value = savedDir; document.documentElement.setAttribute('dir', savedDir); }
  }

  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 12);
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(a => {
      a.addEventListener('click', (e) => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  }

  function initScrollReveal() {
    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach(t => t.classList.add('in-view'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('in-view'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach((t, i) => { t.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`; io.observe(t); });
  }

  function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;
    // Trigger relative to page length (not a fixed pixel count) so the
    // button doesn't pop up over on-page content on shorter pages —
    // it now only appears once you're roughly two viewports down, or
    // three-quarters through the page, whichever comes first.
    const getThreshold = () => Math.min(window.innerHeight * 2, document.documentElement.scrollHeight * 0.75);
    document.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > getThreshold()), { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }));
  }

  function initSkeletons() {
    const skeletons = document.querySelectorAll('.skeleton');
    if (!skeletons.length) return;
    window.setTimeout(() => skeletons.forEach((el, i) => window.setTimeout(() => el.classList.remove('skeleton'), i * 40)), 300);
  }

  function initQuantity() {
    document.querySelectorAll('[data-qty]').forEach(wrap => {
      const input = wrap.querySelector('input');
      wrap.querySelector('[data-qty-minus]')?.addEventListener('click', () => { input.value = Math.max(1, (parseInt(input.value, 10) || 1) - 1); });
      wrap.querySelector('[data-qty-plus]')?.addEventListener('click', () => { input.value = (parseInt(input.value, 10) || 1) + 1; });
    });
  }

  function initGallery() {
    document.querySelectorAll('[data-gallery]').forEach(gallery => {
      const main = gallery.querySelector('[data-gallery-main]');
      gallery.querySelectorAll('[data-gallery-thumb]').forEach(thumb => {
        thumb.addEventListener('click', () => {
          gallery.querySelectorAll('[data-gallery-thumb]').forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
          const src = thumb.getAttribute('data-src');
          if (main && src) main.src = src;
        });
      });
    });
  }

  function initToggleButtons() {
    document.querySelectorAll('[data-toggle-pressed]').forEach(btn => {
      btn.addEventListener('click', () => {
        const pressed = btn.getAttribute('aria-pressed') === 'true';
        btn.setAttribute('aria-pressed', String(!pressed));
      });
    });
  }

  const validators = {
    required: (v) => v.trim().length > 0,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    phone: (v) => v.trim() === '' || /^[0-9+\-\s()]{7,}$/.test(v),
    minlength: (v, n) => v.trim().length >= Number(n),
  };

  function initFormValidation() {
    document.querySelectorAll('form[data-validate]').forEach(form => {
      form.setAttribute('novalidate', 'novalidate');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;
        form.querySelectorAll('[data-rules]').forEach(field => {
          const rules = field.getAttribute('data-rules').split('|');
          let fieldValid = true;
          for (const rule of rules) {
            const [name, arg] = rule.split(':');
            if (validators[name] && !validators[name](field.value, arg)) { fieldValid = false; break; }
          }
          field.classList.toggle('is-invalid', !fieldValid);
          if (!fieldValid) valid = false;
        });
        const successBox = form.querySelector('.form-success');
        if (valid) {
          form.reset();
          form.querySelectorAll('.is-invalid').forEach(f => f.classList.remove('is-invalid'));
          if (successBox) { successBox.classList.add('show'); window.setTimeout(() => successBox.classList.remove('show'), 6000); }
        } else {
          form.querySelector('.is-invalid')?.focus();
        }
      });
      form.querySelectorAll('[data-rules]').forEach(field => field.addEventListener('input', () => field.classList.remove('is-invalid')));
    });
  }

  function init() {
    initTheme();
    initDirection();
    initStickyHeader();
    initSmoothScroll();
    initScrollReveal();
    initBackToTop();
    initSkeletons();
    initQuantity();
    initGallery();
    initToggleButtons();
    initFormValidation();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  return { init };
})();
