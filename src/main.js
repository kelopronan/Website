import './style.css';
import VanillaTilt from 'vanilla-tilt';

document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initRevealAnimations();
  initVanillaTilt();
  initCursorGlow();
  initButtonRipple();
  initFooterClock();
  initMobileNav();
  initWeatherWidget();
  initNavScrollEffect();
  initMagneticButtons();
});

// ============================================
// 0. Mobile hamburger nav toggle
// ============================================
function initMobileNav() {
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is tapped
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// ============================================
// 1. VanillaTilt — 3D card tilt with glare
// ============================================
function initVanillaTilt() {
  // Skip tilt effects on touch devices (no hover)
  if (window.matchMedia('(hover: none)').matches) return;

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
    '.specs-table-container'
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
  // No cursor on touch devices
  if (window.matchMedia('(hover: none)').matches) return;

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
// 5. Boot-up Loading Screen
// ============================================
function initLoadingScreen() {
  const loader = document.createElement('div');
  loader.id = 'boot-loader';
  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-logo">RSA</div>
      <div class="loader-bar-track">
        <div class="loader-bar-fill"></div>
      </div>
      <div class="loader-status">Initializing systems...</div>
    </div>
  `;
  document.body.prepend(loader);
  document.body.style.overflow = 'hidden';

  const statuses = [
    'Initializing systems...',
    'Loading visual pipeline...',
    'Mounting liquid glass...',
    'Calibrating optics...',
    'Ready.'
  ];
  const statusEl = loader.querySelector('.loader-status');
  let i = 0;
  const interval = setInterval(() => {
    i++;
    if (i < statuses.length) {
      statusEl.textContent = statuses[i];
    }
  }, 400);

  setTimeout(() => {
    clearInterval(interval);
    loader.classList.add('loader-fade-out');
    document.body.style.overflow = '';
    setTimeout(() => loader.remove(), 600);
  }, 2200);
}

// ============================================
// 6. Live Footer Clock Widget
// ============================================
function initFooterClock() {
  const el = document.getElementById('footer-clock');
  if (!el) return;
  function update() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const date = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    el.textContent = `${date} — ${time} local`;
  }
  update();
  setInterval(update, 1000);
}

// ============================================
// 7. Weather Widget (Open-Meteo — no API key)
// ============================================
function initWeatherWidget() {
  const widget = document.getElementById('nav-weather');
  if (!widget) return;

  const iconEl = widget.querySelector('.weather-icon');
  const tempEl = widget.querySelector('.weather-temp');
  const cityEl = widget.querySelector('.weather-city');

  // WMO weather code → emoji
  function weatherEmoji(code) {
    if (code === 0) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 48) return '🌫️';
    if (code <= 57) return '🌦️';
    if (code <= 67) return '🌧️';
    if (code <= 77) return '❄️';
    if (code <= 82) return '🌧️';
    if (code <= 86) return '🌨️';
    if (code >= 95) return '⛈️';
    return '🌡️';
  }

  // Try geolocation first, fallback to IP-based
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
      () => fetchWeatherByIP(),
      { timeout: 5000 }
    );
  } else {
    fetchWeatherByIP();
  }

  function fetchWeatherByIP() {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => fetchWeather(data.latitude, data.longitude, data.city))
      .catch(() => {
        cityEl.textContent = '';
        tempEl.textContent = '';
        iconEl.textContent = '';
      });
  }

  function fetchWeather(lat, lon, city) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`)
      .then(r => r.json())
      .then(data => {
        const temp = Math.round(data.current.temperature_2m);
        const code = data.current.weather_code;
        iconEl.textContent = weatherEmoji(code);
        tempEl.textContent = `${temp}°C`;
        // Reverse geocode for city name if not provided
        if (city) {
          cityEl.textContent = city;
        } else {
          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
            .then(r => r.json())
            .then(geo => {
              cityEl.textContent = geo.address?.city || geo.address?.town || geo.address?.state || '';
            })
            .catch(() => { cityEl.textContent = ''; });
        }
      })
      .catch(() => {
        iconEl.textContent = '';
        tempEl.textContent = '';
        cityEl.textContent = '';
      });
  }
}

// ============================================
// 8. Nav scroll effect — glass darkens on scroll
// ============================================
function initNavScrollEffect() {
  const nav = document.querySelector('.premium-nav');
  if (!nav) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 80);
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ============================================
// 10. Magnetic buttons — follow cursor subtly
// ============================================
function initMagneticButtons() {
  if (window.matchMedia('(hover: none)').matches) return;

  const buttons = document.querySelectorAll('.skeuo-button');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}
