/* ============================================
   FGI PROPOSAL — INTERACTIONS & PDF DOWNLOAD
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initNavigation();
  initTabs();
  initPdfDownload();
  initParticles();
  setStaggerIndices();
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
  const btn = document.getElementById('downloadPdf');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    btn.classList.add('generating');
    const originalText = btn.querySelector('span').textContent;
    btn.querySelector('span').textContent = 'Generating';

    try {
      const element = document.getElementById('proposalContent');

      // Temporarily show all tab contents for PDF
      const tabContents = document.querySelectorAll('.tab-content');
      const tabButtons = document.querySelector('.tab-buttons');
      tabContents.forEach((tc) => (tc.style.display = 'block'));
      if (tabButtons) tabButtons.style.display = 'none';

      // Make all animations visible
      document.querySelectorAll('.animate-in').forEach((el) => {
        el.classList.add('visible');
      });

      const opt = {
        margin: [10, 10, 10, 10],
        filename: 'FGI_Technical_Proposal_Dynamicflow.pdf',
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true,
          backgroundColor: '#08080d',
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
        },
        pagebreak: {
          mode: ['avoid-all', 'css', 'legacy'],
          before: ['#requirements', '#stack', '#architecture', '#crm', '#modules', '#timeline', '#team', '#training', '#support', '#cost', '#security', '#why-us'],
        },
      };

      await html2pdf().set(opt).from(element).save();

      // Restore tab state
      tabContents.forEach((tc) => (tc.style.display = ''));
      if (tabButtons) tabButtons.style.display = '';
      // Re-activate correct tab
      const activeBtn = document.querySelector('.tab-btn.active');
      if (activeBtn) {
        const tabId = activeBtn.getAttribute('data-tab');
        tabContents.forEach((c) => c.classList.remove('active'));
        const target = document.getElementById(`tab-${tabId}`);
        if (target) target.classList.add('active');
      }
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('PDF generation failed. Please try using your browser\'s Print to PDF (Ctrl+P) as a fallback.');
    }

    btn.classList.remove('generating');
    btn.querySelector('span').textContent = originalText;
  });
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
