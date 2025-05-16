// Typing Animation
const typingElement = document.querySelector('.typing');
const phrases = ['Web Developer', 'Rust Enthusiast', 'Systems Explorer', 'Open Source Contributor'];
let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function type() {
  if (!typingElement) return;
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingElement.textContent = currentPhrase.substring(0, letterIndex--);
    if (letterIndex < 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  } else {
    typingElement.textContent = currentPhrase.substring(0, letterIndex++);
    if (letterIndex > currentPhrase.length) {
      isDeleting = true;
      letterIndex = currentPhrase.length;
    }
  }
  setTimeout(type, isDeleting ? 100 : 200);
}

type();

// Scroll-Triggered Section Animations
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo("#timeline",
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "#timeline",
        start: "top 97%",
        end: "top 3%",
        toggleActions: "play none none none"
      }
    });

  gsap.fromTo("#projects",
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "#projects",
        start: "top 97%",
        end: "top 3%",
        toggleActions: "play none none none"
      }
    });
}

// Filter Buttons Logic
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    projectCards.forEach(card => {
      const status = card.getAttribute("data-status");
      card.style.display = (filter === "all" || filter === status) ? "flex" : "none";
    });
  });
});

// Back to Top Button Logic
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Fade-in effect on page load for projects
window.addEventListener("load", () => {
  projectCards.forEach((card, i) => {
    card.style.opacity = 0;
    setTimeout(() => {
      card.style.transition = "opacity 0.5s ease";
      card.style.opacity = 1;
    }, i * 150);
  });
});
