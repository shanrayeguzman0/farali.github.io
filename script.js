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

        // The RSS feed URL you provided
        const rssUrl = 'https://data.gmanetwork.com/gno/rss/news/feed.xml';
        // Using rss2json API to bypass CORS and convert XML to JSON
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
        
        let newsItems = [];
        let currentIndex = 0;
        const displayDuration = 5000; // How long each news item stays (5 seconds)
        const fadeDuration = 800;     // Must match the CSS transition time (0.8s)

        // 1. Fetch the data
        async function fetchNews() {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                
                if (data.status === 'ok') {
                    newsItems = data.items;
                    displayNews();
                    // Start the cycle
                    setInterval(cycleNews, displayDuration);
                } else {
                    document.getElementById('news-content').innerHTML = "Failed to load news feed.";
                }
            } catch (error) {
                document.getElementById('news-content').innerHTML = "Error connecting to the news feed.";
                console.error(error);
            }
        }

        // 2. Inject the current news item into the HTML
        function displayNews() {
            if (newsItems.length === 0) return;
            
            const item = newsItems[currentIndex];
            // Format the date to be more readable
            const dateObj = new Date(item.pubDate);
            const formattedDate = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

            const content = `
                <a href="${item.link}" target="_blank" class="news-title">${item.title}</a>
                <div class="news-date">${formattedDate}</div>
            `;
            document.getElementById('news-content').innerHTML = content;
        }

        // 3. Handle the fading animation and looping logic
        function cycleNews() {
            const contentDiv = document.getElementById('news-content');
            
            // Fade out
            contentDiv.classList.add('fade-out');

            // Wait for the fade-out to finish, then change text and fade back in
            setTimeout(() => {
                // Move to the next item, loop back to 0 if at the end
                currentIndex = (currentIndex + 1) % newsItems.length;
                displayNews();
                
                // Fade in
                contentDiv.classList.remove('fade-out');
            }, fadeDuration);
        }

        // Initialize
        fetchNews();