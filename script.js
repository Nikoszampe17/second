document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    slidesPerView: 3,
    breakpoints: {
      1024: {
        slidesPerView: 2.5,
      },
      768: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  });

  // Pause on hover (desktop)
  const swiperContainer = document.querySelector(".mySwiper");

  swiperContainer.addEventListener("mouseenter", function () {
    swiper.autoplay.stop();
  });

  swiperContainer.addEventListener("mouseleave", function () {
    swiper.autoplay.start();
  });

  // Pause on touch (mobile/tablets)
  swiperContainer.addEventListener("touchstart", function () {
    swiper.autoplay.stop();
  });

  swiperContainer.addEventListener("touchend", function () {
    swiper.autoplay.start();
  });
});



  //LANGUAGE BUTTON 

  // Set initial language to Greek unless saved in localStorage
let currentLang = localStorage.getItem("lang") || "gr";

// Load initial language on page load
window.addEventListener("DOMContentLoaded", () => {
  loadLanguage(currentLang);
});

// Toggle between GR and EN when button is clicked
function toggleLanguage() {
  currentLang = currentLang === "gr" ? "en" : "gr";
  localStorage.setItem("lang", currentLang);
  loadLanguage(currentLang);
}

// Load translations from the appropriate JSON file
function loadLanguage(lang) {
  fetch(`${lang}.json`)
    .then((res) => res.json())
    .then((translations) => {
      // Update all elements with data-i18n attribute
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (translations[key]) {
          el.textContent = translations[key];
        }
      });

     
      // Update language toggle button text
      const langText = document.getElementById("language-text");
      if (langText) {
        langText.textContent = lang === "gr" ? "GR / EN" : "EN / GR";
      }
    })
    .catch((err) => console.error("Translation load error:", err));
}

// Photos

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll('.about-images img');

  function handleScrollAnimation() {
    images.forEach(img => {
      const rect = img.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        img.classList.add('visible');
      } else {
        img.classList.remove('visible');
      }
    });
  }

  window.addEventListener('scroll', handleScrollAnimation);
  handleScrollAnimation(); // trigger on load
});
// trigger animation
function handleSlideAnimations() {
  const slides = document.querySelectorAll('.slide-left, .slide-right');

  slides.forEach(slide => {
    const rect = slide.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      slide.classList.add('visible');
      slide.classList.remove('out');
    } else {
      slide.classList.remove('visible');
      slide.classList.add('out');
    }
  });
}

window.addEventListener('scroll', handleSlideAnimations);
window.addEventListener('load', handleSlideAnimations);

// Return to Top Button
document.addEventListener('DOMContentLoaded', function() {
  const returnToTop = document.getElementById('return-to-top');
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 100) {
      returnToTop.classList.add('show');
    } else {
      returnToTop.classList.remove('show');
    }
  });
  
  // Smooth scroll to top
  returnToTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});


// Mobile Navigation Language Support
document.addEventListener('DOMContentLoaded', function() {
  // Update nav text when language changes
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

  // Initial load
  if (window.innerWidth < 768) {
    updateNavLanguage(localStorage.getItem("lang") || "gr");
  }

  // Update on language toggle
  window.toggleLanguage = function() {
    const currentLang = localStorage.getItem("lang") || "gr";
    const newLang = currentLang === "gr" ? "en" : "gr";
    localStorage.setItem("lang", newLang);
    loadLanguage(newLang);
    updateNavLanguage(newLang);
  }
});
