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

const STORAGE_KEY = 'fb_post_liked_state';
const BASE_KEY = 'fb_post_base_likes';

const likeCheckbox = document.getElementById('heart-btn');
const likeTextDisplay = document.getElementById('likeTextDisplay');
const dateDisplay = document.getElementById('displayDate');

// 1. Date
dateDisplay.innerText = "1 day ago";

// 2. Get base likes (pwede mo baguhin anytime)
let baseLikes = localStorage.getItem(BASE_KEY);

// 👉 kung first time, kunin sa HTML
if (!baseLikes) {
    baseLikes = parseInt(likeTextDisplay.innerText);
    localStorage.setItem(BASE_KEY, baseLikes);
} else {
    baseLikes = parseInt(baseLikes);
}

// 3. Get user like state
let isLiked = localStorage.getItem(STORAGE_KEY) === 'true';

// 4. Render
function renderLikeUI() {
    let displayLikes = isLiked ? baseLikes + 1 : baseLikes;

    likeTextDisplay.innerText = displayLikes;
    likeCheckbox.checked = isLiked;
}

// 5. Click event
likeCheckbox.addEventListener('change', () => {
    isLiked = likeCheckbox.checked;
    localStorage.setItem(STORAGE_KEY, isLiked);
    renderLikeUI();
});

// 👉 OPTIONAL: function para baguhin base likes (admin style)
function updateBaseLikes(newValue) {
    baseLikes = newValue;
    localStorage.setItem(BASE_KEY, baseLikes);
    renderLikeUI();
}

// Run
renderLikeUI();

updateBaseLikes(120);