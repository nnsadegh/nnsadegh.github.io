'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        this.classList.add("active");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        pages[i].classList.remove("active");
        // Remove active class from other navigation links
        navigationLinks.forEach(link => {
          if (link !== this) link.classList.remove("active");
        });
      }
    }

  });
}



// theme toggle variables
const themeToggleBtn = document.querySelector("#theme-toggle");
const themeToggleIcon = document.querySelector("#theme-toggle-icon");
const colorSchemeMediaQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;

function applyTheme(theme) {
  const isLight = theme === "light";
  document.body.classList.toggle("light-mode", isLight);
  document.documentElement.classList.toggle("light-mode", isLight);
  if (themeToggleIcon) {
    themeToggleIcon.setAttribute("name", isLight ? "moon-outline" : "sunny-outline");
  }
}

function getPreferredTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }
  return (colorSchemeMediaQuery && colorSchemeMediaQuery.matches) ? "light" : "dark";
}

// Initialize theme based on user setting or system preference
applyTheme(getPreferredTheme());

// Automatically respond to system theme changes if user hasn't explicitly set a preference
if (colorSchemeMediaQuery) {
  const handleSystemThemeChange = function (e) {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "light" : "dark");
    }
  };

  if (colorSchemeMediaQuery.addEventListener) {
    colorSchemeMediaQuery.addEventListener("change", handleSystemThemeChange);
  } else if (colorSchemeMediaQuery.addListener) {
    colorSchemeMediaQuery.addListener(handleSystemThemeChange);
  }
}

// Add click event to manual theme toggle button
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", function () {
    const isCurrentlyLight = document.body.classList.contains("light-mode");
    const newTheme = isCurrentlyLight ? "dark" : "light";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });
}



// 3D card tilt effect for "What I'm doing" cards
const serviceItems = document.querySelectorAll(".service-item");

serviceItems.forEach(card => {
  card.addEventListener("mousemove", function (e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // mouse x relative to card
    const y = e.clientY - rect.top;  // mouse y relative to card
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = x - centerX;
    const deltaY = y - centerY;
    
    const maxTilt = 12; // Maximum tilt angle in degrees
    const rotateX = -(deltaY / centerY) * maxTilt;
    const rotateY = (deltaX / centerX) * maxTilt;
    
    // Disable transitions during movement for instant, tactile responsiveness
    card.style.transition = "none";
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  });

  card.addEventListener("mouseleave", function () {
    // Re-enable smooth transition for returning to flat resting state
    card.style.transition = "transform 0.5s ease, box-shadow 0.3s ease";
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  });

  card.addEventListener("mouseenter", function () {
    // Add smooth transition for entry to transition from resting to tilt state
    card.style.transition = "transform 0.3s ease";
  });
});