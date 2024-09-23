var swiper1 = new Swiper(".slider", {
    slidesPerView: 1,
    navigation: {
        nextEl: ".swiper-button-next-slider",
        prevEl: ".swiper-button-prev-slider",
    },
    pagination: {
        el: ".swiper-pagination-slider",
        clickable: true,
    },
});

var swiper = new Swiper(".swiper-articles", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});