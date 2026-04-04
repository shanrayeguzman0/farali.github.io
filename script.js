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

// === IMPROVED LIKE SYSTEM (Always reads HTML first) ===
const allPosts = document.querySelectorAll('.fb-post');

allPosts.forEach((post, index) => {
    const likeCheckbox = post.querySelector('.heart-checkbox');
    const likeLabel = post.querySelector('.heart-label');
    const likeTextDisplay = post.querySelector('.like-text-display');
    
    // 1. Kuhanin ang UNIQUE ID (Dapat magkaiba ang data-id sa HTML)
    const postId = post.getAttribute('data-id') || 'post-' + index;

    // 2. Fix for Copy-Paste: Automatic unique IDs para sa checkbox/label
    const uniqueHeartId = 'heart-' + postId;
    likeCheckbox.id = uniqueHeartId;
    likeLabel.setAttribute('for', uniqueHeartId);

    // 3. LIVE READ: Basahin kung ano ang nakasulat sa HTML mo ngayon
    // Tinatanggal ang comma (,) para maging totoong number
    let baseLikesInHtml = parseInt(likeTextDisplay.innerText.replace(/,/g, '')) || 0;

    // 4. Check Local Storage para sa LIKE STATE lang (hindi yung number)
    const STORAGE_KEY = 'isLiked_' + postId;
    let userHasLiked = localStorage.getItem(STORAGE_KEY) === 'true';

    // 5. RENDER FUNCTION
    const render = () => {
        // Ang computation: HTML Number + (1 kung naka-like, 0 kung hindi)
        let finalCount = userHasLiked ? baseLikesInHtml + 1 : baseLikesInHtml;
        
        likeTextDisplay.innerText = finalCount.toLocaleString(); // Ibalik ang comma (1,200)
        likeCheckbox.checked = userHasLiked;
    };

    // 6. EVENT LISTENER
    likeCheckbox.addEventListener('change', () => {
        userHasLiked = likeCheckbox.checked;
        localStorage.setItem(STORAGE_KEY, userHasLiked);
        render();
    });

    // Run render pagka-load ng page
    render();
});
// Your exact requested XML link
    const RSS_URL = 'https://data.gmanetwork.com/gno/rss/news/feed.xml';
    const API = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;
    
    let newsItems = [];
    let currentIndex = 0;

    async function loadFeed() {
        try {
            const response = await fetch(API);
            const data = await response.json();
            if (data.status === 'ok') {
                newsItems = data.items;
                render();
                setInterval(transitionNews, 8000); // Rotates every 8 seconds
            }
        } catch (e) {
            document.querySelector('.headline').innerText = "Feed Error";
        }
    }

    function render() {
        const item = newsItems[currentIndex];
        const container = document.getElementById('content-area');
        
        // Removes any unwanted HTML/images from the summary text
        const cleanText = item.description.replace(/<[^>]*>?/gm, '').trim();
        const category = (item.categories && item.categories.length > 0) ? item.categories[0] : 'News Update';

        // Date has been intentionally left out of the HTML injection
        container.innerHTML = `
            <span class="category">${category}</span>
            <h2 class="headline"><a href="${item.link}" target="_blank">${item.title}</a></h2>
            <p class="summary">${cleanText}</p>
        `;
    }

    function transitionNews() {
        const wrapper = document.getElementById('fade-wrapper');
        wrapper.classList.add('hidden');
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % newsItems.length;
            render();
            wrapper.classList.remove('hidden');
        }, 700); // 0.7 second fade time
    }

    loadFeed();




function searchPage() {
    let input = document.getElementById("searchInput").value.toLowerCase().trim();
    let message = document.getElementById("message");
    

    // Pages map
    let pages = {
        "chat area": "chat.html",
        "contact us": "contactus.html",
        "games": "games.html",
        "post": "post.html",
        "about me": "about.html",
        "info": "aboutfarali.html"
    };

    // 🎉 Easter Egg
    if (input === "ilovefarali2026") {
        message.style.color = "green";
        message.textContent = "🎉 Congratulations! You found the easter egg!";
        return;
    }

    // Normal search
    if (pages[input]) {
        window.location.href = pages[input];
    } else {
        message.style.color = "red";
        message.textContent = "No search found";
    }
}