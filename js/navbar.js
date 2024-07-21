document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");

    if (burger) {
      burger.addEventListener("click", () => {
        nav.classList.toggle("open");

        navLinks.forEach((link, index) => {
          if (link.style.animation) {
            link.style.animation = "";
          } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
          }
        });

        burger.classList.toggle("toggle");
      });
    } else {
      console.error("Burger button not found");
    }
  });