window.onload = () => {
    const loader = document.getElementById("loader");
    const content = document.getElementById("content");

    setTimeout(() => {
        loader.style.animation = "fadeOut .6s forwards";
        content.style.display = "block";
    }, 1000);
};

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

const carousels = document.querySelectorAll(".carousel");

carousels.forEach((carousel) => {
  const slides = carousel.querySelectorAll(".carousel-slide");
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");
  const dotsContainer = carousel.querySelector(".carousel-dots");

  let index = 0;
  let interval;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);

    dot.addEventListener("click", () => {
      index = i;
      update();
      resetAuto();
    });
  });

  const dots = dotsContainer.querySelectorAll(".dot");

  function update() {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    update();
  }

  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    update();
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAuto();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAuto();
  });

  function startAuto() {
    interval = setInterval(nextSlide, 7000); // ✅ 3 seconds
  }

  function resetAuto() {
    clearInterval(interval);
    startAuto();
  }

  // Pause on hover
  carousel.addEventListener("mouseenter", () => clearInterval(interval));
  carousel.addEventListener("mouseleave", startAuto);

  // Init
  update();
  startAuto();
});

document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'fb_post_liked_state';
    const heartCheckbox = document.getElementById('heart-btn');
    const likeTextDisplay = document.getElementById('likeTextDisplay');
    const dateDisplay = document.getElementById('displayDate');

    // 1. Handle "1 day ago" Logic
    dateDisplay.innerText = "1 day ago";

    // 2. Handle Like System with LocalStorage
    let isLiked = localStorage.getItem(STORAGE_KEY) === 'true';
    let baseLikes = 2;

    function renderLikeUI() {
        // Sync the checkbox state with our logic
        heartCheckbox.checked = isLiked;
        
        if (isLiked) {
            likeTextDisplay.innerText = baseLikes + 1;
            likeTextDisplay.style.color = '#ed4956'; // Match the heart color
        } else {
            likeTextDisplay.innerText = baseLikes;
            likeTextDisplay.style.color = 'var(--fb-gray)';
        }
    }

    // Listen for the checkbox change
    heartCheckbox.addEventListener('change', () => {
        isLiked = heartCheckbox.checked;
        localStorage.setItem(STORAGE_KEY, isLiked);
        renderLikeUI();
    });

    // Run on load to set initial state
    renderLikeUI();
});