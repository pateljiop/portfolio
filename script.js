// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  // Close menu on link click (mobile)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });
}

// Highlight active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navItems.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// Scroll reveal animation using IntersectionObserver
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => observer.observe(el));

// Typing effect in hero subtitle
const subtitleEl = document.getElementById("hero-subtitle");
const subtitles = [
  "BCA Student",
  "Python & Web Dev Intern",
  "Aspiring Software Developer"
];

let subtitleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!subtitleEl) return;

  const current = subtitles[subtitleIndex];
  const visible = current.slice(0, charIndex);

  subtitleEl.textContent = visible;

  if (!deleting && charIndex < current.length) {
    charIndex++;
  } else if (deleting && charIndex > 0) {
    charIndex--;
  } else {
    if (!deleting) {
      deleting = true;
      setTimeout(typeLoop, 1300); // pause before deleting
      return;
    } else {
      deleting = false;
      subtitleIndex = (subtitleIndex + 1) % subtitles.length;
    }
  }

  const speed = deleting ? 60 : 110;
  setTimeout(typeLoop, speed);
}

typeLoop();
