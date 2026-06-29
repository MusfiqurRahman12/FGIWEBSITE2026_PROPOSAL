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

  // Initialize login page animations
  initLoginAnimations();

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
  initMouseEffects();
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

/* ============================================
   MOUSE-INTERACTIVE ANIMATIONS
   ============================================ */
function initMouseEffects() {
  // Skip on touch-only devices
  if (window.matchMedia('(hover: none)').matches) return;

  // --- 1. CURSOR GLOW SPOTLIGHT ---
  const glow = document.createElement('div');
  glow.id = 'cursorGlow';
  glow.style.cssText = `
    position: fixed;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.02) 40%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.4s ease;
    opacity: 0;
    will-change: left, top;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(glow);

  let glowX = 0, glowY = 0, currentX = 0, currentY = 0;
  let glowVisible = false;

  document.addEventListener('mousemove', (e) => {
    glowX = e.clientX;
    glowY = e.clientY;
    if (!glowVisible) {
      glowVisible = true;
      glow.style.opacity = '1';
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    glowVisible = false;
    glow.style.opacity = '0';
  });

  // Smooth follow via requestAnimationFrame
  function animateGlow() {
    currentX += (glowX - currentX) * 0.12;
    currentY += (glowY - currentY) * 0.12;
    glow.style.left = currentX + 'px';
    glow.style.top = currentY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // --- 2. CARD TILT EFFECT ---
  const tiltTargets = document.querySelectorAll(
    '.glass-card, .team-card, .security-item, .why-card, .support-tier, .cost-hero-card'
  );

  tiltTargets.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
      card.style.transition = 'transform 0.1s ease-out';

      // Card inner highlight
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      card.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(201,168,76,0.06) 0%, transparent 60%), var(--bg-card)`;
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), background 0.4s ease';
      card.style.background = '';
    });
  });

  // --- 3. TRAILING SPARKLE PARTICLES ---
  const sparkleContainer = document.createElement('div');
  sparkleContainer.id = 'sparkleTrail';
  sparkleContainer.style.cssText = `
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9998;
    overflow: hidden;
  `;
  document.body.appendChild(sparkleContainer);

  let lastSparkleTime = 0;
  const SPARKLE_INTERVAL = 60; // ms between sparkles

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkleTime < SPARKLE_INTERVAL) return;
    lastSparkleTime = now;

    const sparkle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    const opacity = Math.random() * 0.5 + 0.3;

    sparkle.style.cssText = `
      position: fixed;
      left: ${e.clientX + offsetX}px;
      top: ${e.clientY + offsetY}px;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(201,168,76,${opacity}), transparent);
      border-radius: 50%;
      pointer-events: none;
      animation: sparkle-fade 0.8s ease-out forwards;
    `;
    sparkleContainer.appendChild(sparkle);

    // Clean up after animation
    setTimeout(() => sparkle.remove(), 800);
  }, { passive: true });

  // Inject sparkle keyframes
  if (!document.getElementById('sparkle-keyframes')) {
    const style = document.createElement('style');
    style.id = 'sparkle-keyframes';
    style.textContent = `
      @keyframes sparkle-fade {
        0%   { transform: scale(1); opacity: 1; }
        50%  { transform: scale(1.8); opacity: 0.5; }
        100% { transform: scale(0); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // --- 4. MAGNETIC HOVER ON SECTION NUMBERS ---
  const sectionNums = document.querySelectorAll('.section-number');
  sectionNums.forEach((num) => {
    num.addEventListener('mousemove', (e) => {
      const rect = num.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      num.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.15)`;
      num.style.transition = 'transform 0.15s ease-out';
    }, { passive: true });

    num.addEventListener('mouseleave', () => {
      num.style.transform = '';
      num.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
  });
}

/* ============================================
   LOGIN PAGE ANIMATIONS
   ============================================ */
function initLoginAnimations() {
  const overlay = document.getElementById('loginOverlay');
  const mouseGlow = document.getElementById('loginMouseGlow');
  const loginCard = document.querySelector('.login-card');

  if (!overlay || !mouseGlow) return;

  // Skip mouse effects on touch-only devices
  if (window.matchMedia('(hover: none)').matches) return;

  // --- Mouse-tracking glow on login overlay ---
  let loginGlowX = 0, loginGlowY = 0;
  let loginCurrentX = 0, loginCurrentY = 0;
  let loginGlowActive = false;

  overlay.addEventListener('mousemove', (e) => {
    loginGlowX = e.clientX;
    loginGlowY = e.clientY;
    if (!loginGlowActive) {
      loginGlowActive = true;
      mouseGlow.style.opacity = '1';
    }
  }, { passive: true });

  overlay.addEventListener('mouseleave', () => {
    loginGlowActive = false;
    mouseGlow.style.opacity = '0';
  });

  function animateLoginGlow() {
    loginCurrentX += (loginGlowX - loginCurrentX) * 0.08;
    loginCurrentY += (loginGlowY - loginCurrentY) * 0.08;
    mouseGlow.style.left = loginCurrentX + 'px';
    mouseGlow.style.top = loginCurrentY + 'px';
    requestAnimationFrame(animateLoginGlow);
  }
  animateLoginGlow();

  // --- 3D tilt on login card ---
  if (loginCard) {
    loginCard.addEventListener('mousemove', (e) => {
      const rect = loginCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      loginCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      loginCard.style.transition = 'transform 0.1s ease-out';

      // Moving highlight inside the card
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      loginCard.style.boxShadow = `
        0 20px 50px rgba(0, 0, 0, 0.5),
        0 0 40px rgba(201, 168, 76, 0.05),
        inset 0 0 80px rgba(201, 168, 76, 0.02)
      `;

      // Update the ::before gradient dynamically via CSS variable
      loginCard.style.setProperty('--glow-x', percentX + '%');
      loginCard.style.setProperty('--glow-y', percentY + '%');
    }, { passive: true });

    loginCard.addEventListener('mouseleave', () => {
      loginCard.style.transform = '';
      loginCard.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      loginCard.style.boxShadow = '';
    });
  }
}
