// Initialize Swiper
var swiper = new Swiper(".mySwiper", {
  loop: true,
  
  slidesPerView: 3,
breakpoints: {
  768: {
    slidesPerView: 3,
  },
  480: {
    slidesPerView: 2,
  },
  0: {
    slidesPerView: 1,
  }
}
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});
