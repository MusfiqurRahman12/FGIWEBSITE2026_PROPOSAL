/* ============================================
   FGI PROPOSAL — INTERACTIONS & PDF DOWNLOAD
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initLogin();
});

/* --- SCROLL ANIMATIONS (Intersection Observer) --- */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Stagger children if it's a grid
          const children = entry.target.querySelectorAll(
            '.glass-card, .team-card, .security-item, .why-card'
          );
          children.forEach((child, i) => {
            child.style.setProperty('--i', i);
            setTimeout(() => child.classList.add('visible'), i * 80);
          });
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.animate-in').forEach((el) => observer.observe(el));
}

/* --- Set stagger indices for grid children --- */
function setStaggerIndices() {
  const grids = document.querySelectorAll(
    '.cards-grid, .team-grid, .security-grid, .why-grid'
  );
  grids.forEach((grid) => {
    const items = grid.children;
    Array.from(items).forEach((item, i) => {
      item.style.setProperty('--i', i);
    });
  });
}

/* --- NAVIGATION --- */
function initNavigation() {
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('navToggle');
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  // Toggle mobile nav
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.classList.toggle('open');
  });

  // Close nav on link click (mobile)
  links.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('open');
    });
  });

  // Active section tracking
  const observerOptions = {
    threshold: 0,
    rootMargin: '-20% 0px -70% 0px',
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('data-section') === id
          );
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => sectionObserver.observe(section));

  // Smooth scroll for hero CTA
  const heroCta = document.querySelector('.hero-scroll-cta');
  if (heroCta) {
    heroCta.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(heroCta.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}

/* --- MODULE TABS --- */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');

      tabBtns.forEach((b) => b.classList.remove('active'));
      tabContents.forEach((c) => c.classList.remove('active'));

      btn.classList.add('active');
      const target = document.getElementById(`tab-${tabId}`);
      if (target) target.classList.add('active');
    });
  });
}

/* --- PDF DOWNLOAD --- */
function initPdfDownload() {
  // Direct file download handled natively by anchor tag in HTML
}

/* --- FLOATING PARTICLES --- */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const particleCount = 40;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * -20;
    const opacity = Math.random() * 0.3 + 0.05;

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      top: ${y}%;
      background: radial-gradient(circle, rgba(201, 168, 76, ${opacity}), transparent);
      border-radius: 50%;
      pointer-events: none;
      animation: float ${duration}s ease-in-out ${delay}s infinite;
    `;

    container.appendChild(particle);
  }

  // Add keyframes
  if (!document.getElementById('particle-styles')) {
    const style = document.createElement('style');
    style.id = 'particle-styles';
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
        25% { transform: translate(${rand()}px, ${rand()}px) scale(1.2); opacity: 0.8; }
        50% { transform: translate(${rand()}px, ${rand()}px) scale(0.8); opacity: 0.3; }
        75% { transform: translate(${rand()}px, ${rand()}px) scale(1.1); opacity: 0.6; }
      }
    `;
    document.head.appendChild(style);
  }
}

function rand() {
  return Math.floor(Math.random() * 80 - 40);
}

/* --- LOGIN LOGIC --- */
function initLogin() {
  const overlay = document.getElementById('loginOverlay');
  const form = document.getElementById('loginForm');
  const errorMsg = document.getElementById('loginError');
  const card = document.querySelector('.login-card');

  // Check sessionStorage
  if (sessionStorage.getItem('fgi_proposal_authenticated') === 'true') {
    if (overlay) overlay.style.display = 'none';
    document.body.classList.remove('login-active');
    revealProposal();
    return;
  }

  // Handle submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('username').value.trim();
      const pass = document.getElementById('password').value.trim();

      if ((user.toLowerCase() === 'fgi' || user.toLowerCase() === 'fgi@dynamicflowit.com') && pass === 'fgi2026') {
        // Authenticated!
        sessionStorage.setItem('fgi_proposal_authenticated', 'true');
        
        // Visual effects for unlock
        overlay.classList.add('fade-out');
        document.body.classList.remove('login-active');

        // Animate out and clean up DOM after transition
        setTimeout(() => {
          overlay.style.display = 'none';
          revealProposal();
        }, 800);
      } else {
        // Error
        errorMsg.style.color = '#ff4a4a';
        errorMsg.textContent = 'Invalid credentials. Please check and try again.';
        if (card) {
          card.classList.add('shake');
          setTimeout(() => card.classList.remove('shake'), 400);
        }
      }
    });
  }
}

function revealProposal() {
  initScrollAnimations();
  initNavigation();
  initTabs();
  initPdfDownload();
  initParticles();
  setStaggerIndices();
  initLogout();
  initIdleTimer();
}

/* --- LOGOUT & SESSION TIMEOUT LOGIC --- */
let idleTimer = null;
const IDLE_TIMEOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

function initLogout() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      performLogout(false);
    });
  }
}

function performLogout(isIdle = false) {
  // Clear auth session flag
  sessionStorage.removeItem('fgi_proposal_authenticated');

  // Clear idle timers and events
  clearTimeout(idleTimer);
  removeIdleListeners();

  // Reset page state to show overlay
  const overlay = document.getElementById('loginOverlay');
  if (overlay) {
    overlay.style.display = 'flex';
    // Small delay to allow display flex to apply before opacity transition
    setTimeout(() => {
      overlay.classList.remove('fade-out');
    }, 10);
  }
  document.body.classList.add('login-active');

  // Show status message
  const errorMsg = document.getElementById('loginError');
  const form = document.getElementById('loginForm');
  if (form) form.reset();

  if (errorMsg) {
    if (isIdle) {
      errorMsg.style.color = '#c9a84c'; // gold warning color
      errorMsg.textContent = 'Logged out automatically due to inactivity.';
    } else {
      errorMsg.style.color = '#ff4a4a'; // default error/logout color
      errorMsg.textContent = 'Logged out successfully.';
    }
  }
}

function initIdleTimer() {
  // Reset timer on user activity
  const resetTimer = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      performLogout(true);
    }, IDLE_TIMEOUT_DURATION);
  };

  // Add listeners
  const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
  activityEvents.forEach((event) => {
    document.addEventListener(event, resetTimer, { passive: true });
  });

  // Keep a reference to remove them on logout
  window.idleResetTimer = resetTimer;
  window.idleEvents = activityEvents;

  // Initialize
  resetTimer();
}

function removeIdleListeners() {
  if (window.idleResetTimer && window.idleEvents) {
    window.idleEvents.forEach((event) => {
      document.removeEventListener(event, window.idleResetTimer);
    });
    delete window.idleResetTimer;
    delete window.idleEvents;
  }
}
