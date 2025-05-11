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
