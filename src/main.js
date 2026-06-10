import './style.css';
import VanillaTilt from 'vanilla-tilt';

document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();
  initVanillaTilt();
  initCursorGlow();
  initButtonRipple();
  initSmoothScrollOnIndex();
});

// ============================================
// 1. VanillaTilt — 3D card tilt with glare
// ============================================
function initVanillaTilt() {
  const cards = document.querySelectorAll('.module-card, .version-card');
  if (cards.length > 0) {
    VanillaTilt.init(Array.from(cards), {
      max: 8,
      speed: 300,
      glare: true,
      'max-glare': 0.15,
      perspective: 1000,
      scale: 1.02
    });
  }

  // Lighter tilt for the liquid glass panels (product images)
  const panels = document.querySelectorAll('.product-visual .liquid-glass-panel');
  if (panels.length > 0) {
    VanillaTilt.init(Array.from(panels), {
      max: 5,
      speed: 400,
      glare: true,
      'max-glare': 0.1,
      perspective: 1200,
    });
  }
}

// ============================================
// 2. Staggered Reveal Animations
// ============================================
function initRevealAnimations() {
  const revealSelectors = [
    '.product-card',
    '.spec-category',
    '.module-card',
    '.version-card',
    '.specs-table-container',
    '.content-block',
    '.project-hero-header',
    '.hero-visual'
  ];

  const elements = document.querySelectorAll(revealSelectors.join(', '));

  elements.forEach(el => {
    el.classList.add('reveal-element');
  });

  // Add stagger delays to module cards
  const moduleCards = document.querySelectorAll('.module-card');
  moduleCards.forEach((card, i) => {
    const delayClass = `reveal-delay-${Math.min(i + 1, 8)}`;
    card.classList.add(delayClass);
  });

  // Add stagger delays to version cards
  const versionCards = document.querySelectorAll('.version-card');
  versionCards.forEach((card, i) => {
    const delayClass = `reveal-delay-${Math.min(i + 1, 8)}`;
    card.classList.add(delayClass);
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  });

  elements.forEach(el => revealObserver.observe(el));
}

// ============================================
// 3. Cursor-reactive glow on glass panels
// ============================================
function initCursorGlow() {
  const panels = document.querySelectorAll('.module-card, .liquid-glass-panel, .version-card');

  panels.forEach(panel => {
    panel.addEventListener('mousemove', (e) => {
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      panel.style.setProperty('--glow-x', `${x}px`);
      panel.style.setProperty('--glow-y', `${y}px`);
      panel.style.background = `radial-gradient(600px circle at var(--glow-x) var(--glow-y), rgba(255,255,255,0.04), transparent 40%), var(--glass-bg)`;
    });

    panel.addEventListener('mouseleave', () => {
      panel.style.background = 'var(--glass-bg)';
    });
  });
}

// ============================================
// 4. Button click ripple effect
// ============================================
function initButtonRipple() {
  const buttons = document.querySelectorAll('.skeuo-button');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255,255,255,0.15);
        left: ${e.clientX - rect.left - size/2}px;
        top: ${e.clientY - rect.top - size/2}px;
        transform: scale(0);
        animation: rippleOut 0.6s ease-out forwards;
        pointer-events: none;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Inject ripple keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleOut {
      0% { transform: scale(0); opacity: 1; }
      100% { transform: scale(2.5); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// 5. Smooth scroll for index.html anchor links
// ============================================
function initSmoothScrollOnIndex() {
  // Only handle the "View Systems" button on the landing page
  const scrollBtn = document.querySelector('.hero-actions .skeuo-button');
  if (scrollBtn && scrollBtn.getAttribute('onclick')) {
    // Remove the inline onclick and use smooth JS instead
    scrollBtn.removeAttribute('onclick');
    scrollBtn.addEventListener('click', () => {
      const target = document.getElementById('projects');
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }
}
