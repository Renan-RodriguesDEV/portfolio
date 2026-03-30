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

// Navbar scroll effect com melhor performance
let navScrollTimeout;
window.addEventListener("scroll", () => {
  const nav = document.getElementById("nav");
  clearTimeout(navScrollTimeout);

  navScrollTimeout = setTimeout(() => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }, 10);
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

// Fade in animation on scroll com Intersection Observer otimizado
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Contact form handling melhorado
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Create mailto link
    const mailtoLink = `mailto:renanrodrigues7110@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(
      `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
    )}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    setTimeout(() => {
      alert("Redirecionando para seu cliente de email...");
    }, 500);

    // Reset form
    this.reset();
  });
}

// Typing effect for hero title aprimorado
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

// Mobile menu toggle
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

if (mobileMenu) {
  mobileMenu.addEventListener("click", () => {
    navLinks.style.display =
      navLinks.style.display === "flex" ? "none" : "flex";
  });
}

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add hover effects to skill tags com melhor performance
document.querySelectorAll(".skill-tag").forEach((tag) => {
  tag.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.08)";
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

    if (!this.style.position || this.style.position === "static") {
      this.style.position = "relative";
    }
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation
if (!document.querySelector("style[data-ripple]")) {
  const style = document.createElement("style");
  style.setAttribute("data-ripple", "true");
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Parallax effect melhorado
window.addEventListener("scroll", () => {
  const elements = document.querySelectorAll("[data-parallax]");
  elements.forEach((el) => {
    const scrollPos = window.scrollY;
    el.style.transform = `translateY(${scrollPos * 0.1}px)`;
  });
});

// Easter egg - console message
console.log(
  `
%c╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🚀 Olá! Você encontrou o console do desenvolvedor!        ║
║                                                              ║
║   Este portfólio foi criado com:                             ║
║   • HTML5 & CSS3 moderno                                     ║
║   • JavaScript Vanilla (sem frameworks!)                     ║
║   • Animações CSS & Web APIs                                 ║
║   • Design responsivo e acessível                            ║
║   • Performance otimizada                                    ║
║                                                              ║
║   Desenvolvido por Renan Rodrigues                           ║
║   📧 renanrodrigues7110@gmail.com                           ║
║   🔗 linkedin.com/in/renanrodrigues7110                     ║
║   💻 github.com/Renan-RodriguesDEV                          ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝`,
  "color: #667eea; font-weight: bold; font-size: 12px;",
);

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
if (!document.querySelector("style[data-focus]")) {
  const focusStyle = document.createElement("style");
  focusStyle.setAttribute("data-focus", "true");
  focusStyle.textContent = `
    .keyboard-navigation *:focus {
      outline: 2px solid var(--accent-color) !important;
      outline-offset: 2px !important;
    }
  `;
  document.head.appendChild(focusStyle);
}

// Back to Top Button functionality
const backToTopButton = document.getElementById("backToTop");

if (backToTopButton) {
  // Show/hide button on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  // Smooth scroll to top on click
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Prevent external scroll during animation
  backToTopButton.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px)";
  });

  backToTopButton.addEventListener("mouseleave", function () {
    this.style.transform = "";
  });
}
