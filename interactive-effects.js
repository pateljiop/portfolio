// ===== INTERACTIVE EFFECTS & ANIMATIONS =====

const InteractiveEffects = () => {
    // Parallax Effect on Scroll
    const setupParallax = () => {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        window.addEventListener('scroll', () => {
            parallaxElements.forEach(el => {
                const scrollPos = window.scrollY;
                const elementOffset = el.offsetTop;
                const distance = scrollPos - elementOffset;
                el.style.transform = `translateY(${distance * 0.5}px)`;
            });
        });
    };

    // Reveal Elements on Scroll
    const setupScrollReveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        reveals.forEach((reveal) => observer.observe(reveal));
    };

    // Navigation Scroll Effect
    const setupNavigation = () => {
        const nav = document.querySelector('.navbar');
        let lastScrollPos = 0;

        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;

            if (scrollPos > 100) {
                nav.style.background = 'rgba(0, 0, 0, 0.95)';
                nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                nav.style.background = 'rgba(0, 0, 0, 0.9)';
                nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            }

            lastScrollPos = scrollPos;
        });
    };

    // Project Card Hover Effects
    const setupProjectHover = () => {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    };

    // Button Ripple Effect
    const setupRippleEffect = () => {
        const buttons = document.querySelectorAll('.cta-button, .project-link, .contact-link');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');

                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
    };

    // Mouse Follow Effect for Background
    const setupMouseFollow = () => {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            hero.style.background = `linear-gradient(${135 + x * 10}deg, #667eea 0%, #764ba2 100%)`;
        });
    };

    // Skill Progress Animation
    const setupSkillProgress = () => {
        const skillLevels = document.querySelectorAll('.skill-level');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideUp 0.6s ease-out';
                }
            });
        });

        skillLevels.forEach(skill => observer.observe(skill));
    };

    // Initialize All Effects
    const init = () => {
        setupParallax();
        setupScrollReveal();
        setupNavigation();
        setupProjectHover();
        setupRippleEffect();
        setupMouseFollow();
        setupSkillProgress();
    };

    return { init };
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        InteractiveEffects().init();
    });
} else {
    InteractiveEffects().init();
}