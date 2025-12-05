// index.js — small UX niceties: smooth scroll, reveal animation and back-to-top

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const t = document.querySelector(href);
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update focus for accessibility
      t.setAttribute('tabindex', '-1');
      t.focus({ preventScroll: true });
      window.setTimeout(() => t.removeAttribute('tabindex'), 1000);
    }
  });
});

// Reveal animation for .work__box using IntersectionObserver
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('revealed');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.work__box').forEach(n => {
  obs.observe(n);
});

// Back to top button show/hide
const back = document.querySelector('.back-to-top');
if (back) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) back.style.display = 'flex';
    else back.style.display = 'none';
  });
}

// Simple form UX: show a tiny message on submit if Netlify is used
const form = document.querySelector('form[name="contact"]');
if (form) {
  form.addEventListener('submit', (e) => {
    // Let Netlify handle submission; show a quick visual indicator
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = 'Sending...';
      btn.disabled = true;
    }
  });
}
