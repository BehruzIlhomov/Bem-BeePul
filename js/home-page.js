const BASE_URL = "https://api.brandstore.uz/api/home";
const ARTICLES = "https://api.brandstore.uz/api/posts";
const BANNERS = "https://api.brandstore.uz/api/banners";

document.addEventListener("DOMContentLoaded", (event) => {
    fetchProduct();
    // fetchArticles();
    fetchBanners(); // Fetch banners when the DOM is loaded
});

let dataOfProduct = [];
let dataOfArticles = [];
let loader = false;

// Flags to track loading status
let productLoaded = false;
let articlesLoaded = false;
let bannersLoaded = false;

// Toggle loader
function toggleLoader(isLoading) {
    const loaderElement = document.getElementById("loader");
    loaderElement.style.display = isLoading ? "block" : "none";
}

// Fetch product
function fetchProduct() {
    loader = true;
    toggleLoader(loader);

    fetch(`${BASE_URL}?type=max_price_half_million`)
        .then((response) => response.json())
        .then((data) => {
            dataOfProduct = data?.data?.product_request || [];
            renderProducts();
        })
        .finally(() => {
            productLoaded = true;
            checkIfAllLoaded();
        });
}

// // Fetch articles
// function fetchArticles() {
//     loader = true;
//     toggleLoader(loader);

//     fetch(ARTICLES)
//         .then((response) => response.json())
//         .then((data) => {
//             dataOfArticles = data?.data || [];
//             renderArticles(dataOfArticles);
//         })
//         .finally(() => {
//             articlesLoaded = true;
//             checkIfAllLoaded();
//         });
// }

// Fetch banners
function fetchBanners() {
    loader = true;
    toggleLoader(loader);

    fetch(BANNERS)
        .then((response) => response.json())
        .then((data) => {
            const banners = data?.data || [];
            renderBanners(banners);
        })
        .finally(() => {
            bannersLoaded = true;
            checkIfAllLoaded();
        });
}

function showme(item) {
    params.set("type", item);
    fetchProduct();
}

// Render products
function renderProducts() {
    const productContainer = document.querySelector('.best-selling__book-cards');
    productContainer.innerHTML = "";

    dataOfProduct.map((product) => {
        const bookCard = document.createElement("div");
        bookCard.className = "best-selling__book-card";

        const productImage = product.images[0].types.medium_default;
        const formattedPrice = parseInt(product.random_shop.price).toLocaleString('ru-RU').replace(/,/g, ' ');

        bookCard.innerHTML = `
            <div class="best-selling__rating">
                <img src="/best-selling/star.png" alt="Star" class="best-selling__star">
                <span class="best-selling__rating-text">3+</span>
            </div>
            <div class="best-selling__book-img">
                <img style="width: 100%;" src="${productImage}" alt="Book cover">
            </div>
            <div class="best-selling__description">
                <span class="best-selling__genre">${product.class.name}</span> 
                <span class="best-selling__name">${product.name}</span>
                <span class="best-selling__price">${formattedPrice} UZS</span>
            </div>
        `;

        productContainer.appendChild(bookCard);
    });
}

// // Render articles
// function renderArticles(data) {
//     const swiperWrapper = document.querySelector('.swiper-wrapper-articles');
//     swiperWrapper.innerHTML = "";

//     data.forEach((article) => {
//         const postImageDefault = article.image.types.post_header_default;
//         const swiperSlide = document.createElement("div");
//         swiperSlide.className = "swiper-articles-slide";

//         swiperSlide.innerHTML = `
//             <img src="${postImageDefault}" alt="${article.title}">
//             <span class="swiper-span">${article.title}</span>
//             <a class="swiper-sliderDetails" href="${article.slug}">Подробно</a>
//         `;

//         swiperWrapper.appendChild(swiperSlide);
//     });
// }

// Render banners into slider slides
function renderBanners(banners) {
    const sliderSlides = document.querySelectorAll('.slider-slide'); // Select all the existing empty slides

    sliderSlides.forEach((slide, index) => {
        if (banners[index]) {
            const bannerImage = banners[index].background.url; // Get the banner background image URL from API
            const imgElement = document.createElement('img'); // Create a new img element
            imgElement.src = bannerImage; // Set the src attribute to the banner URL
            imgElement.alt = `Banner ${index + 1}`; // Set an alt attribute for accessibility
            imgElement.style.width = "100%"; // Adjust image size

            slide.appendChild(imgElement); // Append the image to the slide
        }
    });
}

// Check if everything is loaded (for loader to disable) 
function checkIfAllLoaded() {
    if (productLoaded && bannersLoaded) { //&& articlesLoaded
        loader = false;
        toggleLoader(loader);
    }
}
