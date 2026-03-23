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

const track = document.getElementById("track");
const slides = document.querySelectorAll(".carousel-slide");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const dotsContainer = document.getElementById("dots");

let index = 0;
let interval;

// mga dotsss
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    index = i;
    updateCarousel();
    resetAutoSlide();
  });

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

// Next button
nextBtn.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  updateCarousel();
  resetAutoSlide();
});

// Prev button
prevBtn.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
  resetAutoSlide();
});

// 🔥 Auto-slide
function startAutoSlide() {
  interval = setInterval(() => {
    index = (index + 1) % slides.length;
    updateCarousel();
  }, 3000); // change slide every 3 seconds
}

// Reset timer when user interacts
function resetAutoSlide() {
  clearInterval(interval);
  startAutoSlide();
}

// Start autoplay
startAutoSlide();