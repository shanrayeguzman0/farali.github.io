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

carousels.forEach(carousel => {
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
      updateCarousel();
      resetAuto();
    });
  });

  const dots = dotsContainer.querySelectorAll(".dot");

  function updateCarousel() {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
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
    interval = setInterval(nextSlide, 4000); // change slide every 4s
  }

  function resetAuto() {
    clearInterval(interval);
    startAuto();
  }

  // Pause on hover
  carousel.addEventListener("mouseenter", () => clearInterval(interval));
  carousel.addEventListener("mouseleave", startAuto);

  // Init
  updateCarousel();
  startAuto();
});