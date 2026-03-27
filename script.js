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

// === MULTIPLE POST LIKE SYSTEM ===
// Kukunin lahat ng element na may class na fb-post
const posts = document.querySelectorAll('.fb-post');

posts.forEach((post, index) => {
    const likeCheckbox = post.querySelector('.heart-checkbox');
    const likeLabel = post.querySelector('.heart-label');
    const likeTextDisplay = post.querySelector('.like-text-display');
    const dateDisplay = post.querySelector('.display-date');
    
    // Auto-fix ID Generator: 
    // Kahit mag copy-paste ka ng HTML, automatic gagawan to ng unique ID ng JS 
    // para di masira ang animation ng heart checkbox!
    const uniqueId = 'heart-btn-' + index;
    if(likeCheckbox && likeLabel) {
        likeCheckbox.id = uniqueId;
        likeLabel.setAttribute('for', uniqueId);
    }

    // 1. Date (Awtomatikong lalagyan ng date ang lahat ng post)
    if(dateDisplay) dateDisplay.innerText = "1 day ago";

    // 2. Kukuha ng unique keys para sa Local Storage base sa "data-id"
    const postId = post.getAttribute('data-id') || 'post_' + index;
    const STORAGE_KEY = 'fb_post_liked_state_' + postId;
    const BASE_KEY = 'fb_post_base_likes_' + postId;

    let baseLikes = localStorage.getItem(BASE_KEY);

    // 👉 Kung first time, kunin sa HTML
    if (!baseLikes) {
        baseLikes = parseInt(likeTextDisplay.innerText) || 0;
        localStorage.setItem(BASE_KEY, baseLikes);
    } else {
        baseLikes = parseInt(baseLikes);
    }

    // 3. Get user like state para sa specific post na ito
    let isLiked = localStorage.getItem(STORAGE_KEY) === 'true';

    // 4. Render function para sa specific post
    function renderLikeUI() {
        let displayLikes = isLiked ? baseLikes + 1 : baseLikes;
        if(likeTextDisplay) likeTextDisplay.innerText = displayLikes;
        if(likeCheckbox) likeCheckbox.checked = isLiked;
    }

    // 5. Click event listener
    if(likeCheckbox) {
        likeCheckbox.addEventListener('change', () => {
            isLiked = likeCheckbox.checked;
            localStorage.setItem(STORAGE_KEY, isLiked);
            renderLikeUI();
        });
    }

    // Run Initial Render
    renderLikeUI();
});