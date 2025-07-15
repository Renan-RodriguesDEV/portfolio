// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const nav = document.getElementById("nav");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// Scroll progress indicator
window.addEventListener("scroll", () => {
  const scrollProgress = document.getElementById("scrollProgress");
  const scrollTop = window.scrollY;
  const docHeight = document.body.offsetHeight;
  const winHeight = window.innerHeight;
  const scrollPercent = scrollTop / (docHeight - winHeight);
  const scrollPercentRounded = Math.round(scrollPercent * 100);
  scrollProgress.style.width = scrollPercentRounded + "%";
});

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Contact form handling
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Create mailto link
  const mailtoLink = `mailto:renanrodrigues7110@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(
    `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`
  )}`;

  // Open email client
  window.location.href = mailtoLink;

  // Show success message
  alert("Redirecionando para seu cliente de email...");

  // Reset form
  this.reset();
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    typeWriter(heroTitle, "Renan Rodrigues", 150);
  }
});

// Mobile menu toggle (basic implementation)
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add hover effects to skill tags
document.querySelectorAll(".skill-tag").forEach((tag) => {
  tag.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05)";
    this.style.transition = "transform 0.2s ease";
  });

  tag.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
});

// Add click effect to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation
const style = document.createElement("style");
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Counter animation for experience years
function animateCounter(element, start, end, duration) {
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// Initialize counter when visible
const experienceSection = document.querySelector("#experience");
if (experienceSection) {
  const counters = experienceSection.querySelectorAll("[data-count]");

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const endValue = parseInt(target.getAttribute("data-count"));
        animateCounter(target, 0, endValue, 2000);
        counterObserver.unobserve(target);
      }
    });
  });

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

// Easter egg - console message
console.log(`
        ╔══════════════════════════════════════════════════════════════╗
        ║                                                              ║
        ║   🚀 Olá! Você encontrou o console do desenvolvedor!        ║
        ║                                                              ║
        ║   Este portfólio foi criado com:                             ║
        ║   • HTML5 & CSS3 moderno                                     ║
        ║   • JavaScript Vanilla (sem frameworks!)                     ║
        ║   • Animações CSS & Web APIs                                 ║
        ║   • Design responsivo e acessível                            ║
        ║                                                              ║
        ║   Desenvolvido por Renan Rodrigues                           ║
        ║   📧 renanrodrigues7110@gmail.com                           ║
        ║   🔗 linkedin.com/in/renanrodrigues7110                     ║
        ║                                                              ║
        ╚══════════════════════════════════════════════════════════════╝
        `);

// Performance optimization - lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Add loading state to forms
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", function () {
    const submitBtn = this.querySelector('button[type="submit"]');
    if (submitBtn) {
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    }
  });
});

// Add keyboard navigation support
document.addEventListener("keydown", function (e) {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation");
  }
});

document.addEventListener("mousedown", function () {
  document.body.classList.remove("keyboard-navigation");
});

// Add focus styles for keyboard navigation
const focusStyle = document.createElement("style");
focusStyle.textContent = `
            .keyboard-navigation *:focus {
                outline: 2px solid var(--accent-color) !important;
                outline-offset: 2px !important;
            }
        `;
document.head.appendChild(focusStyle);
