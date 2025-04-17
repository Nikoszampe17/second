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
      }
    }
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


  const hamburger = document.getElementById('hamburger');
  const navbar = document.getElementById('navbar');

  hamburger.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });

