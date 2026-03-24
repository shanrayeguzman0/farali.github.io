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

document.querySelectorAll(".carousel").forEach(carousel => {

  const track = carousel.querySelector(".carousel-track");
  const slides = carousel.querySelectorAll(".carousel-slide");
  const nextBtn = carousel.querySelector(".nextBtn");
  const prevBtn = carousel.querySelector(".prevBtn");
  const dotsContainer = carousel.querySelector(".dots");

  let index = 0;
  let interval;

  // ===== DOTS =====
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

  const dots = carousel.querySelectorAll(".dot");

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  // NEXT
  nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    updateCarousel();
    resetAutoSlide();
  });

  // PREV
  prevBtn.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
    resetAutoSlide();
  });

  // AUTO
  function startAutoSlide() {
    interval = setInterval(() => {
      index = (index + 1) % slides.length;
      updateCarousel();
    }, 3000);
  }

  function resetAutoSlide() {
    clearInterval(interval);
    startAutoSlide();
  }

  startAutoSlide();

});