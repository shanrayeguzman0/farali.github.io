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

const apiKey = '835d63d6d1194c94ac179be2ed86c683';
        const url = `https://newsapi.org/v2/top-headlines?country=ph&apiKey=${apiKey}`;

        async function fetchNews() {
            try {
                const response = await fetch(url);
                const data = await response.json();
                displayNews(data.articles);
            } catch (error) {
                console.error('Error fetching news:', error);
                document.getElementById('news-container').innerHTML = '<p>Failed to load news. Please try again later.</p>';
            } finally {
                document.getElementById('loader').style.display = 'none';
            }
        }

        function displayNews(articles) {
            const container = document.getElementById('news-container');
            
            articles.forEach((article, index) => {
                if(!article.title || article.title === '[Removed]') return;

                const card = document.createElement('div');
                card.className = 'news-card';
                // Delay animation for each card for a "staggered" effect
                card.style.animationDelay = `${index * 0.1}s`;

                const imageUrl = article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image+Available';

                card.innerHTML = `
                    <img class="news-image" src="${imageUrl}" alt="News Image">
                    <div class="news-content">
                        <span class="news-source">${article.source.name}</span>
                        <a href="${article.url}" target="_blank" class="news-title">${article.title}</a>
                        <p class="news-description">${article.description || 'No description available for this article.'}</p>
                    </div>
                `;
                container.appendChild(card);
            });
        }

        fetchNews();