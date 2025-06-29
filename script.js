// --- script.js ---

document.addEventListener("DOMContentLoaded", function () {
  
  // --- 1. Modern Header on Scroll ---
  const header = document.querySelector('.top-header');
  if (header) {
    window.addEventListener('scroll', () => {
      // Add a class to the header when user scrolls down
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- 2. Swiper Carousel Initialization ---
  const swiper = new Swiper(".mySwiper", {
    // Usability: Defined start/end, keyboard nav
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    
    // Core Settings: Responsive and centered for mobile
    slidesPerView: 'auto', 
    centeredSlides: true,  
    spaceBetween: 15,      
    grabCursor: true,      

    // General Settings: Autoplay, pagination, navigation
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // Responsive breakpoints for tablet and desktop
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: false, // Not needed for 3 slides
      },
    }
  });

  // Pause autoplay on hover (for desktop)
  const swiperEl = document.querySelector('.swiper');
  if (swiperEl) {
    swiperEl.addEventListener('mouseenter', () => swiper.autoplay.stop());
    swiperEl.addEventListener('mouseleave', () => swiper.autoplay.start());

    // Pause/resume on tap (for mobile)
    let isPaused = false;
    swiperEl.addEventListener('touchstart', (e) => {
      // Ignore taps on links or buttons within the slide
      if (e.target.closest('a, button')) return;

      if (!isPaused) {
        swiper.autoplay.stop();
        isPaused = true;
      } else {
        swiper.autoplay.start();
        isPaused = false;
      }
    });
  }

  // --- 3. Scroll Animations for Images ---
  const animatedImages = document.querySelectorAll('.about-images img');
  function handleImageScrollAnimation() {
    animatedImages.forEach(img => {
      const rect = img.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        img.classList.add('visible');
      } else {
        img.classList.remove('visible');
      }
    });
  }
  window.addEventListener('scroll', handleImageScrollAnimation);
  handleImageScrollAnimation(); // Run on load

  // --- 4. Return to Top Button ---
  const returnToTop = document.getElementById('return-to-top');
  if (returnToTop) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 100) {
        returnToTop.classList.add('show');
      } else {
        returnToTop.classList.remove('show');
      }
    });
    returnToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});


// --- 5. Language Functionality ---
let currentLang = localStorage.getItem("lang") || "gr";

// Load initial language when the page is ready
window.addEventListener("DOMContentLoaded", () => {
  loadLanguage(currentLang);
});

// Function to toggle between languages
function toggleLanguage() {
  const newLang = currentLang === "gr" ? "en" : "gr";
  localStorage.setItem("lang", newLang);
  loadLanguage(newLang);
}

// Function to fetch and apply translations
function loadLanguage(lang) {
  currentLang = lang;
  fetch(`${lang}.json`)
    .then((res) => res.json())
    .then((translations) => {
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (translations[key]) {
          if (el.tagName === 'TITLE') {
            document.title = translations[key];
          } else {
            el.textContent = translations[key];
          }
        }
      });
      // Update the language switcher text
      const langText = document.getElementById("language-text");
      if (langText) {
        langText.textContent = lang === "gr" ? "GR / EN" : "EN / GR";
      }
      // Ensure mobile navigation is also updated
      updateNavLanguage(lang);
    })
    .catch((err) => console.error("Translation load error:", err));
}

// Function to specifically update mobile nav text
function updateNavLanguage(lang) {
  if (window.innerWidth >= 768) return;
  fetch(`${lang}.json`)
    .then(res => res.json())
    .then(translations => {
      document.querySelectorAll('.mobile-nav [data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
          el.textContent = translations[key];
        }
      });
    })
    .catch(err => console.error('Nav translation error:', err));
}