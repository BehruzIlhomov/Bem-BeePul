const BASE_URL = "https://api.brandstore.uz/api/home";
const BANNERS = "https://api.brandstore.uz/api/banners";

document.addEventListener("DOMContentLoaded", (event) => {
    fetchProduct();
    fetchBanners(); // Fetch banners
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

        // Construct the product link (you can append product-specific data like ID if needed)
        const productLink = `/product-page/product-page.html?id=${product.id}`;

        // Set the inner HTML of the book card
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

        // Add click event to navigate to the product page when the book card is clicked
        bookCard.addEventListener("click", () => {
            window.location.href = productLink;
        });

        productContainer.appendChild(bookCard);
    });
}

// Render banners into slider slides
function renderBanners(banners) {
    const sliderSlides = document.querySelectorAll('.slider-slide');

    sliderSlides.forEach((slide, index) => {
        if (banners[index]) {
            const bannerImage = banners[index].background.url;
            const imgElement = document.createElement('img');
            imgElement.src = bannerImage;
            imgElement.style.width = "100%";

            slide.appendChild(imgElement);
        }
    });
}

function checkIfAllLoaded() {
    if (productLoaded && bannersLoaded) { 
        loader = false;
        toggleLoader(loader);
    }
}

function updateImageSource() {
    const imgElement = document.querySelector('.hero-slider__banner-img');
    if (window.innerWidth < 1200) {
        imgElement.src = '/hero-slider/rightBanner.png';
    } else {
        imgElement.src = '/hero-slider/rightBanner.svg';
    }
}

updateImageSource();

window.addEventListener('resize', updateImageSource);