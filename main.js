document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  const yearTarget = document.querySelector("[data-year]");

  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav] a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  const filterButtons = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");

  if (filterButtons.length && filterItems.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-filter-btn");

        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        filterItems.forEach((item) => {
          const categories = item.getAttribute("data-filter-item").split(" ");
          const show = target === "all" || categories.includes(target);
          item.classList.toggle("hidden", !show);
        });
      });
    });
  }
});
