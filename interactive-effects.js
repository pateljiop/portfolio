// Interactive Effects and Animations
const InteractiveEffects = () => {
  // Scroll Animations
  const setupScrollAnimations = () => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach((reveal) => observer.observe(reveal));
  };

  // Navigation Scroll Effect
  const setupNavigation = () => {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  };

  // Mobile Menu Toggle
  const setupMobileMenu = () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
      });
    }
  };

  // Particle System
  const setupParticles = () => {
    const container = document.getElementById('particle-container');
    if (!container) return;

    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.width = Math.random() * 4 + 2 + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = `rgba(0, 212, 255, ${Math.random() * 0.4 + 0.2})`;
      particle.style.borderRadius = '50%';
      particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px rgba(0, 212, 255, 0.5)`;
      particle.style.animation = `float ${Math.random() * 20 + 15}s linear infinite`;

      container.appendChild(particle);
    }
  };

  // Smooth Scroll for Anchor Links
  const setupSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
          e.preventDefault();
          document.querySelector(href).scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  };

  // Card Hover Effects
  const setupCardHovers = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
      });
      card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  };

  // Initialize all effects
  const init = () => {
    setupScrollAnimations();
    setupNavigation();
    setupMobileMenu();
    setupParticles();
    setupSmoothScroll();
    setupCardHovers();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
};

// Start interactive effects
InteractiveEffects();
