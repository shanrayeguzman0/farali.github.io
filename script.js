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
        const postId = 'post1'; // Unique identifier for this post
        const likeBtn = document.getElementById('likeBtn');
        const likeIcon = document.getElementById('likeIcon');
        const likeText = document.getElementById('likeText');
        const likeCountDisplay = document.getElementById('likeCountDisplay');
        const postDateSpan = document.getElementById('postDate');

        // Initial like count for demonstration
        const initialLikes = 24510;

        // --- Date Functionality ---
        // Set the post date (mocking "One day ago")
        // Get current date, subtract one day
        const today = new Date();
        const oneDayAgo = new Date(today.getTime() - (24 * 60 * 60 * 1000));

        // Format: Month Day at Time (e.g., July 12 at 10:30 AM)
        const options = { month: 'long', day: 'numeric' };
        let hours = oneDayAgo.getHours();
        const minutes = oneDayAgo.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // convert to 12 hour format

        // For the sake of matching the user prompt perfectly, we will just display "1 day ago"
        // if the date is exactly one day old.
        // A more dynamic script would calculate 'minutes ago', 'hours ago', 'weeks ago' etc.
        
        // Static output as requested for the generated image
        postDateSpan.textContent = '1 day ago';
        // Alternatively, use the actual calculated date:
        // postDateSpan.textContent = `${oneDayAgo.toLocaleDateString('en-US', options)} at ${hours}:${minutes} ${ampm}`;

        // --- Like Button & LocalStorage Functionality ---
        const localStorageKey = `liked_${postId}`;

        function updateLikeStatus(isLiked) {
            if (isLiked) {
                likeBtn.classList.add('liked');
                likeIcon.classList.remove('far');
                likeIcon.classList.add('fas');
                likeText.textContent = 'Liked';
                // Demonstration update of count
                likeCountDisplay.textContent = (initialLikes + 1).toLocaleString() + ' Likes';
            } else {
                likeBtn.classList.remove('liked');
                likeIcon.classList.remove('fas');
                likeIcon.classList.add('far');
                likeText.textContent = 'Like';
                likeCountDisplay.textContent = initialLikes.toLocaleString() + ' Likes';
            }
        }

        // 1. Check if the user already liked the post in this browser
        const storedLikeStatus = localStorage.getItem(localStorageKey);
        const alreadyLiked = storedLikeStatus === 'true';

        // 2. Initial render based on stored status
        updateLikeStatus(alreadyLiked);

        // 3. Add click event listener to the Like button
        likeBtn.addEventListener('click', () => {
            const currentLikedStatus = localStorage.getItem(localStorageKey) === 'true';
            const newLikedStatus = !currentLikedStatus;

            // Update UI
            updateLikeStatus(newLikedStatus);

            // Store new status in LocalStorage
            localStorage.setItem(localStorageKey, newLikedStatus);
        });
    });