'use strict';

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggleBtn.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function (currentSlider) {
  const sliderContainer = currentSlider.querySelector("[data-slider-container]");
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  let totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
  let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;
  let startX = 0;
  let currentTranslateX = 0;
  let isDragging = false;

  const moveSliderItem = function () {
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
  }

  const slideNext = function () {
    const slideEnd = currentSlidePos >= totalSlidableItems;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  }

  sliderNextBtn.addEventListener("click", slideNext);

  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = totalSlidableItems;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  }

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = totalSlidableItems <= 0;
  if (dontHaveExtraItem) {
    sliderNextBtn.style.display = 'none';
    sliderPrevBtn.style.display = 'none';
  }

  // Touch and mouse events for dragging functionality
  const startDrag = (e) => {
    isDragging = true;
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    currentTranslateX = sliderContainer.offsetLeft;
  };

  const dragSlider = (e) => {
    if (!isDragging) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const diffX = currentX - startX;
    sliderContainer.style.transform = `translateX(${currentTranslateX + diffX}px)`;
  };

  const endDrag = (e) => {
    if (!isDragging) return;
    isDragging = false;

    const currentX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diffX = currentX - startX;

    if (diffX < -50) {
      slideNext(); // Swipe left
    } else if (diffX > 50) {
      slidePrev(); // Swipe right
    } else {
      moveSliderItem(); // Return to original position
    }
  };

  sliderContainer.addEventListener("touchstart", startDrag);
  sliderContainer.addEventListener("touchmove", dragSlider);
  sliderContainer.addEventListener("touchend", endDrag);

  sliderContainer.addEventListener("mousedown", startDrag);
  sliderContainer.addEventListener("mousemove", dragSlider);
  sliderContainer.addEventListener("mouseup", endDrag);
  sliderContainer.addEventListener("mouseleave", endDrag);

  window.addEventListener("resize", function () {
    totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
    totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

    moveSliderItem();
  });
}

for (let i = 0, len = sliders.length; i < len; i++) {
  initSlider(sliders[i]);
}

function showToast(message) {
  const toast = document.getElementById("toastMessage");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

document.getElementById("copyEmail").addEventListener("click", function (e) {
  e.preventDefault();
  const email = "thalitaliman@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    showToast("E-mail copiado para a área de transferência!");
  });
});

// debug hover
document.querySelectorAll('.portfolio-card').forEach(card => {
  card.addEventListener('mousedown', function () {
    this.classList.remove('hover');
  });

  card.addEventListener('mouseleave', function () {
    this.classList.remove('hover');
  });

  card.addEventListener('mouseenter', function () {
    this.classList.add('hover');
  });
});

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
    backToTopBtn.classList.remove('hide');
  } else {
    backToTopBtn.classList.add('hide');
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Fecha o menu mobile ao clicar em um link da navbar
const navLinks = document.querySelectorAll('.navbar-link');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navbar.classList.contains('active')) {
      navToggleBtn.click();
    }
  });
});
