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
