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


document.querySelectorAll(".carousel").forEach((carousel) => {
  const slides = carousel.querySelectorAll(".carousel-slide");
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");
  const dotsContainer = carousel.querySelector(".carousel-dots");

  let index = 0;
  let autoSlide;

  // Create dots
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

  const dots = dotsContainer.querySelectorAll(".dot");

  // Set first slide active
  slides[0].classList.add("active");

  function updateCarousel() {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  // Buttons
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });

  // Auto slide
  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 3000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  startAutoSlide();

  // =====================
  // SIMPLE SWIPE SUPPORT
  // =====================
  let startX = 0;

  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (diff > 50) {
      prevSlide();
    } else if (diff < -50) {
      nextSlide();
    }

    resetAutoSlide();
  });
});