const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu a");
const revealElements = document.querySelectorAll(".reveal");
const imageElements = document.querySelectorAll("img[data-fallbacks]");
const contactForm = document.querySelector(".contact-form");
const formMessage = document.querySelector(".form-message");

function setMenuOpen(isOpen) {
  if (!menuButton || !mobileMenu) return;

  menuButton.classList.toggle("is-open", isOpen);
  mobileMenu.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Sulje valikko" : "Avaa valikko");
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

imageElements.forEach((image) => {
  const fallbacks = image.dataset.fallbacks?.split(",").map((item) => item.trim()).filter(Boolean) ?? [];
  let fallbackIndex = 0;

  image.addEventListener("error", () => {
    if (fallbackIndex >= fallbacks.length) {
      image.style.display = "none";
      return;
    }

    image.src = fallbacks[fallbackIndex];
    fallbackIndex += 1;
  });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!formMessage) return;
  formMessage.textContent = "Kiitos! Tämä on konseptisivun lomake, joten viestiä ei lähetetty oikeasti.";
});
