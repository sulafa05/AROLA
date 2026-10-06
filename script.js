// ===================== Product Data =====================
const imageFallbackPath = "images/Women.png";

function applyImageFallback(image) {
  if (image.dataset.fallbackApplied) return;
  image.dataset.fallbackApplied = "true";
  image.src = imageFallbackPath;
}

document.addEventListener("error", event => {
  if (event.target instanceof HTMLImageElement) applyImageFallback(event.target);
}, true);

document.querySelectorAll("img").forEach(image => {
  if (image.complete && image.naturalWidth === 0) applyImageFallback(image);
});

const newInProducts = [
  { name: "Wool Blend Coat", price: "$128.00", img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=600&auto=format&fit=crop", colors: ["#1c1c1c", "#c9b79c", "#7a5c45"] },
  { name: "Satin Slip Dress", price: "$74.00", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop", colors: ["#4f3b2c", "#141210", "#e6dccb"] },
  { name: "Tailored Blazer", price: "$96.00", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop", colors: ["#1c1c1c", "#7a5c45"] },
  { name: "Knit Turtleneck", price: "$58.00", img: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?q=80&w=600&auto=format&fit=crop", colors: ["#e6dccb", "#4f3b2c", "#1c1c1c"] },
  { name: "Pleated Midi Skirt", price: "$64.00", img: "https://images.unsplash.com/photo-1583496661160-fb5886a13d9d?q=80&w=600&auto=format&fit=crop", colors: ["#7a5c45", "#141210"] }
];

const bestSellerProducts = [
  { name: "Classic Trench Coat", price: "$149.00", img: "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?q=80&w=600&auto=format&fit=crop", colors: ["#c9b79c", "#1c1c1c"] },
  { name: "Linen Wide Pants", price: "$68.00", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop", colors: ["#e6dccb", "#7a5c45"] },
  { name: "Cashmere Sweater", price: "$110.00", img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop", colors: ["#4f3b2c", "#141210", "#c9b79c"] },
  { name: "Leather Ankle Boots", price: "$132.00", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop", colors: ["#1c1c1c", "#4f3b2c"] },
  { name: "Structured Tote Bag", price: "$89.00", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop", colors: ["#7a5c45", "#141210"] }
];

// ===================== Render Product Cards =====================
function renderProducts(list, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = list.map((p, i) => `
    <div class="product-card">
      <div class="product-image">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <button class="wishlist-heart" data-index="${i}" aria-label="Add to wishlist">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C.5 8 2 4.5 5.5 4c2-.3 3.9.6 5 2.2C11.6 4.6 13.5 3.7 15.5 4 19 4.5 20.5 8 19 11.7 16.5 16.4 12 21 12 21z"/></svg>
        </button>
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-price">${p.price}</div>
        <div class="color-options">
          ${p.colors.map((c, ci) => `<span class="color-dot${ci === 0 ? " selected" : ""}" style="background:${c}"></span>`).join("")}
        </div>
      </div>
    </div>
  `).join("");

  // Wishlist toggle
  container.querySelectorAll(".wishlist-heart").forEach(btn => {
    btn.addEventListener("click", () => btn.classList.toggle("active"));
  });

  // Color dot selection
  container.querySelectorAll(".product-card").forEach(card => {
    const dots = card.querySelectorAll(".color-dot");
    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        dots.forEach(d => d.classList.remove("selected"));
        dot.classList.add("selected");
      });
    });
  });
}

renderProducts(newInProducts, "newInRow");
renderProducts(bestSellerProducts, "bestSellersRow");

// ===================== Sticky Navbar Shadow =====================
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 10);
});

// ===================== Mobile Menu =====================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const mobileOverlay = document.getElementById("mobileOverlay");

function closeMenu() {
  navLinks?.classList.remove("open");
  mobileOverlay?.classList.remove("active");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  mobileOverlay?.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mobileOverlay?.addEventListener("click", closeMenu);
navLinks?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

// ===================== Hero Slider =====================
const slides = document.querySelectorAll(".hero-slide");
const dotsContainer = document.getElementById("heroDots");
let currentSlide = 0;
let heroInterval;

slides.forEach((_, i) => {
  if (!dotsContainer) return;
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer?.querySelectorAll("span") || [];

function goToSlide(index) {
  if (!slides.length || !dots.length) return;
  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

document.querySelector(".hero-next")?.addEventListener("click", () => {
  nextSlide();
  resetHeroInterval();
});
document.querySelector(".hero-prev")?.addEventListener("click", () => {
  prevSlide();
  resetHeroInterval();
});

function resetHeroInterval() {
  clearInterval(heroInterval);
  heroInterval = setInterval(nextSlide, 6000);
}
if (slides.length) resetHeroInterval();

// ===================== Newsletter Form =====================
const newsletterForm = document.getElementById("newsletterForm");
const newsletterMsg = document.getElementById("newsletterMsg");

newsletterForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = newsletterForm.querySelector("input").value.trim();
  if (email) {
    newsletterMsg.textContent = "Thank you for subscribing!";
    newsletterForm.reset();
  }
});

// ===================== Women Collection =====================
const womenProductGrid = document.getElementById("womenProductGrid");

if (womenProductGrid) {
  const womenProducts = [
    { name: "Ribbed Knit Sweater", price: 68, category: "basics", colors: ["beige", "white", "brown"], sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=85&w=800&auto=format&fit=crop", label: "Bestseller" },
    { name: "Classic Trench Coat", price: 168, category: "outerwear", colors: ["beige", "black"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?q=85&w=800&auto=format&fit=crop", label: "New in" },
    { name: "Square Neck Top", price: 48, category: "jeans-tops", colors: ["white", "black", "pink"], sizes: ["XS", "S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=85&w=800&auto=format&fit=crop" },
    { name: "Wide Leg Pants", price: 82, category: "jeans-tops", colors: ["beige", "black", "olive"], sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=85&w=800&auto=format&fit=crop" },
    { name: "Floral Midi Dress", price: 96, category: "dresses", colors: ["pink", "white"], sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=85&w=800&auto=format&fit=crop", label: "New in" },
    {
      id: "ruched-bell-sleeve-mini-dress",
      name: "Ruched Bell Sleeve Mini Dress",
      price: 40,
      categories: ["dresses", "going-out"],
      colors: ["black", "apricot", "burgundy", "khaki"],
      sizes: ["XS", "S", "M", "L", "XL"],
      image: "dress/Ruched%20Black%20Bell-Sleeve%20Mini%20Dress.png",
      description: "Elegant mini dress with a deep V-neck, ruched fitted waist, and dramatic bell sleeves. Perfect for dinners, parties, and evening looks.",
      details: "Deep V-neck, fitted ruched waist, mini length, and dramatic bell sleeves.",
      variants: {
        black: { name: "Black", front: "dress/Ruched%20Black%20Bell-Sleeve%20Mini%20Dress.png", back: "dress/Black%20Ruched%20Bell-Sleeve%20Dress%20Back.png" },
        apricot: { name: "Apricot", front: "dress/Ruched%20apricot%20Bell-Sleeve%20Mini%20Dress.png", back: "dress/apricot%20Ruched%20Bell-Sleeve%20Dress%20Back.png" },
        burgundy: { name: "Burgundy", front: "dress/Burgundy%20Ruched%20Bell-Sleeve%20Mini%20Dress-1.png", back: "dress/Ruched%20burgundy%20Bell-Sleeve%20Mini%20Dress.png" },
        khaki: { name: "Khaki", front: "dress/Ruched%20khaki%20Bell-Sleeve%20Mini%20Dress.png", back: "dress/khaki%20Ruched%20Bell-Sleeve%20Dress%20Back.png" }
      }
    },
    {
      id: "ruched-halter-tiered-mini-dress",
      name: "Ruched Halter Tiered Mini Dress",
      price: 39,
      categories: ["dresses", "going-out"],
      colors: ["black", "apricot"],
      sizes: ["XS", "S", "M", "L", "XL"],
      image: "dress/Black%20Halter%20Ruched%20Tiered%20Mini%20Dress.png",
      description: "Ruched halter mini dress with tiered ruffles and an open back.",
      details: "Halter neckline, ruched bodice, tiered ruffle skirt, and open back.",
      variants: {
        black: { name: "Black", front: "dress/Black%20Halter%20Ruched%20Tiered%20Mini%20Dress.png", back: "dress/Black%20Halter%20Dress%20with%20Tiered%20Ruffles.png" },
        apricot: { name: "Pale Apricot", front: "dress/Pale%20Apricot%20Ruched%20Halter%20Mini%20Dress.png", back: "dress/Pale%20Apricot%20Open-Back%20Halter%20Dress.png" }
      }
    },
    {
      id: "blue-floral-halter-tiered-dress",
      name: "Floral Ruched Sundress",
      price: 35,
      categories: ["dresses", "going-out"],
      colors: ["blue", "pink"],
      sizes: ["XS", "S", "M", "L", "XL"],
      image: "dress/Blue Floral Ruched Mini Dress.png",
      description: "A floral halter mini dress with a ruched bodice and tiered skirt.",
      details: "Halter neckline, ruched bodice, floral print, and tiered mini skirt.",
      variants: {
        blue: { name: "Blue Floral", front: "dress/Blue Floral Ruched Mini Dress.png", back: "dress/Blue Floral Ruched Summer Sundress back.png" },
        pink: { name: "Pink Floral", front: "dress/bink Floral Ruched Summer Sundress.png", back: "dress/bink Floral Ruched Summer Sundress back.png" }
      }
    },
    {
      id: "yellow-floral-summer-dress",
      name: "Yellow Floral Summer Dress",
      price: 50,
      categories: ["dresses", "going-out"],
      colors: ["yellow"],
      sizes: ["XS", "S", "M", "L", "XL"],
      image: "dress/multicolor Lace Halter Dress View-1 (2).png",
      description: "A yellow floral summer mini dress with a halter neckline and tiered skirt.",
      details: "Halter neckline, yellow floral print, and tiered mini skirt.",
      variants: {
        yellow: { name: "Yellow Floral", front: "dress/multicolor Lace Halter Dress View-1 (2).png", back: "dress/multicolor Lace Halter Dress Back View-1.png" }
      }
    },
    {
      id: "white-halter-tiered-dress",
      name: "White Floral Tiered Mini Dress",
      price: 50,
      categories: ["dresses", "going-out"],
      colors: ["white"],
      sizes: ["XS", "S", "M", "L", "XL"],
      image: "dress/White Floral Lace-Up Halter Dress-2.png",
      description: "A white floral halter dress with a tiered mini skirt.",
      details: "Halter neckline, white floral lace-up detail, and tiered mini skirt.",
      variants: {
        white: { name: "White", front: "dress/White Floral Lace-Up Halter Dress-2.png", back: "dress/White Lace Halter Dress Back View-1.png" }
      }
    },
    {
      id: "blue-floral-cutout-halter-mini-dress",
      name: "Blue Floral Cutout Halter Mini Dress",
      price: 54,
      categories: ["dresses", "going-out"],
      colors: ["blue"],
      sizes: ["XS", "S", "M", "L", "XL"],
      image: "dress/Blue Floral Cutout Halter Mini Dress.png",
      description: "A blue and white floral cutout halter mini dress.",
      details: "Blue and white floral print, cutout detail, and halter neckline.",
      variants: {
        blue: { name: "Blue and White", front: "dress/Blue Floral Cutout Halter Mini Dress.png", back: "dress/Blue Floral Cutout Halter Mini Dress back.png" }
      }
    },
    {
      id: "ruched-mock-neck-mini-dress",
      name: "Ruched Mock Neck Mini Dress",
      price: 29,
      categories: ["dresses", "going-out"],
      colors: ["black", "brown", "burgundy"],
      sizes: ["XS", "S", "M", "L", "XL"],
      image: "dress/black%20Floral%20Ruched%20Mini%20Dress%20View.png",
      description: "A sleek sleeveless mini dress featuring a softly ruched mock neckline and a cinched waist for a flattering silhouette. Designed for parties, dinners, and elevated evening looks.",
      details: "Sleeveless mock neckline, softly ruched bodice, cinched waist, and mini length.",
      variants: {
        black: { name: "Black", front: "dress/black%20Floral%20Ruched%20Mini%20Dress%20View.png", back: "dress/black%20Floral%20Ruched%20Mini%20Dress%20Back%20View.png" },
        brown: { name: "Brown", front: "dress/brown%20Floral%20Ruched%20Mini%20Dress%20View.png", back: "dress/brown%20Floral%20Ruched%20Mini%20Dress%20Back%20View.png" },
        burgundy: { name: "Burgundy Floral", front: "dress/Burgundy%20Ruched%20Floral%20Bodycon%20Dress.png", back: "dress/Burgundy%20Floral%20Ruched%20Mini%20Dress%20Back%20View.png" }
      }
    },
    {
      id: "ruched-mock-neck-long-sleeve-mini-dress",
      name: "Ruched Mock Neck Long Sleeve Dress",
      price: 55,
      categories: ["dresses", "going-out"],
      colors: ["black"],
      sizes: ["XS", "S", "M", "L", "XL"],
      image: "dress/Black%20Ruched%20Turtleneck%20Mini%20Dress.png",
      description: "A sleek fitted mini dress with a softly draped mock neckline, long sleeves, and flattering ruching through the waist and skirt. Perfect for dinners, parties, evening outings, and cooler-weather looks.",
      details: "Long sleeves, softly draped mock neckline, ruched waist and skirt, and mini length.",
      variants: {
        black: { name: "Black", front: "dress/Black%20Ruched%20Turtleneck%20Mini%20Dress.png", back: "dress/Black%20Ruched%20Back%20Mini%20Dress.png" }
      }
    },
    { name: "Tailored Blazer", price: 138, category: "workwear", colors: ["black", "beige", "brown"], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=85&w=800&auto=format&fit=crop" },
    { name: "Satin Dress", price: 112, category: "going-out", colors: ["brown", "black", "olive"], sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=85&w=800&auto=format&fit=crop" },
    { name: "Knit Cardigan", price: 74, category: "loungewear", colors: ["white", "beige", "pink"], sizes: ["XS", "S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=85&w=800&auto=format&fit=crop" }
  ];
  const categoryFilters = [...document.querySelectorAll('input[name="category"]')];
  const sizeFilters = [...document.querySelectorAll('input[name="size"]')];
  const colorFilters = [...document.querySelectorAll(".filter-swatch")];
  const priceRange = document.getElementById("priceRange");
  const priceOutput = document.getElementById("priceOutput");
  const sortProducts = document.getElementById("sortProducts");
  const womenSearch = document.getElementById("womenSearch");
  const visibleCount = document.getElementById("visibleCount");
  const emptyState = document.getElementById("emptyState");
  const sidebar = document.getElementById("collectionSidebar");
  const filtersToggle = document.getElementById("filtersToggle");
  const viewCategories = document.getElementById("viewCategories");
  const additionalCategories = document.getElementById("additionalCategories");
  const bagCount = document.querySelector(".women-page .bag-count");
  let bagItems = 0;
  let activeDressProduct = null;
  const dressDetail = document.getElementById("dressProductDetail");
  const detailFrontImage = document.getElementById("dressFrontImage");
  const detailBackImage = document.getElementById("dressBackImage");
  const detailBackFigure = detailBackImage.closest("figure");
  const detailImagePair = document.querySelector(".dress-detail-image-pair");
  const dressColorOptions = document.getElementById("dressColorOptions");
  const collectionLayout = document.querySelector(".collection-layout");
  const collectionToolbar = document.querySelector(".collection-toolbar");
  const collectionEndnote = document.querySelector(".collection-endnote");
  const colorValues = { black: "#252321", white: "#fff", beige: "#d7c7ae", pink: "#d9aeb0", brown: "#8a6955", olive: "#85836a", apricot: "#e7c8a3", burgundy: "#7d142b", khaki: "#b49a78", blue: "#6f91ad", yellow: "#e0bf50" };

  function showDressDetail(event) {
    activeDressProduct = womenProducts.find(product => product.id === event.currentTarget.dataset.productId);
    if (!activeDressProduct) return;

    document.getElementById("dressDetailTitle").textContent = activeDressProduct.name;
    document.getElementById("dressDetailPrice").textContent = `$${activeDressProduct.price.toFixed(2)}`;
    document.getElementById("dressDetailDescription").textContent = activeDressProduct.description;
    document.getElementById("dressCategoryLabel").textContent = `WOMEN / ${activeDressProduct.categories.join(" / ").replaceAll("-", " ").toUpperCase()}`;
    document.getElementById("dressProductDetailsText").textContent = activeDressProduct.details;
    document.getElementById("dressAvailableSizes").textContent = `Available sizes: ${activeDressProduct.sizes.join(", ")}.`;
    document.getElementById("dressSize").innerHTML = `<option value="">Select a size</option>${activeDressProduct.sizes.map(size => `<option value="${size}">${size}</option>`).join("")}`;
    document.getElementById("dressQuantity").value = "1";
    document.getElementById("dressActionMessage").textContent = "";
    const wishlistButton = document.getElementById("dressWishlist");
    wishlistButton.classList.remove("active");
    wishlistButton.setAttribute("aria-pressed", "false");
    wishlistButton.setAttribute("aria-label", `Add ${activeDressProduct.name} to wishlist`);
    dressColorOptions.innerHTML = activeDressProduct.colors.map(color => `
      <button class="dress-color-swatch" type="button" data-dress-color="${color}" aria-label="${activeDressProduct.variants[color].name}" title="${activeDressProduct.variants[color].name}" aria-pressed="false" style="--dress-swatch:${colorValues[color]}"></button>
    `).join("");
    selectDressColor(activeDressProduct.colors[0]);

    collectionLayout.classList.add("is-detail-open");
    collectionToolbar.hidden = true;
    collectionEndnote.hidden = true;
    womenProductGrid.hidden = true;
    emptyState.hidden = true;
    sidebar.hidden = true;
    dressDetail.hidden = false;
    dressDetail.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function closeDressDetail() {
    dressDetail.hidden = true;
    collectionLayout.classList.remove("is-detail-open");
    collectionToolbar.hidden = false;
    collectionEndnote.hidden = false;
    sidebar.hidden = false;
    renderWomenProducts();
    womenProductGrid.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function selectDressColor(color) {
    const variant = activeDressProduct?.variants[color];
    if (!variant) return;
    detailFrontImage.src = variant.front;
    detailFrontImage.alt = `${activeDressProduct.name} in ${variant.name}, front view`;
    detailBackFigure.hidden = !variant.back;
    detailImagePair.classList.toggle("single-image", !variant.back);
    if (variant.back) {
      detailBackImage.src = variant.back;
      detailBackImage.alt = `${activeDressProduct.name} in ${variant.name}, back view`;
    } else {
      detailBackImage.removeAttribute("src");
      detailBackImage.alt = "";
    }
    document.getElementById("selectedDressColor").textContent = variant.name;
    dressColorOptions.querySelectorAll("[data-dress-color]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.dressColor === color));
    });
  }

  function addDressToBag(isBuyNow) {
    const size = document.getElementById("dressSize");
    const quantityInput = document.getElementById("dressQuantity");
    const message = document.getElementById("dressActionMessage");
    if (!activeDressProduct) return;
    if (!size.value) {
      message.textContent = "Please select a size first.";
      size.focus();
      return;
    }
    const quantity = Math.max(1, Math.min(10, Number(quantityInput.value) || 1));
    quantityInput.value = String(quantity);
    bagItems += quantity;
    bagCount.textContent = String(bagItems);
    document.querySelector(".women-page .bag-btn").setAttribute("aria-label", `Shopping bag, ${bagItems} items`);
    message.textContent = isBuyNow ? "Added to your bag. Checkout is not available yet." : `${quantity} ${quantity === 1 ? "item" : "items"} added to your bag.`;
  }

  function renderWomenProducts() {
    const categories = categoryFilters.filter(input => input.checked).map(input => input.value);
    const sizes = sizeFilters.filter(input => input.checked).map(input => input.value);
    const colors = colorFilters.filter(button => button.getAttribute("aria-pressed") === "true").map(button => button.dataset.color);
    const query = womenSearch.value.trim().toLowerCase();
    let matches = womenProducts.filter(product => {
      const productCategories = product.categories || [product.category];
      return (!categories.length || categories.some(category => productCategories.includes(category))) &&
      (!sizes.length || sizes.some(size => product.sizes.includes(size))) &&
      (!colors.length || colors.some(color => product.colors.includes(color))) &&
      product.price <= Number(priceRange.value) &&
      (!query || `${product.name} ${productCategories.join(" ")}`.toLowerCase().includes(query));
    });

    if (sortProducts.value === "newest") matches = [...matches].reverse();
    if (sortProducts.value === "low-high") matches.sort((a, b) => a.price - b.price);
    if (sortProducts.value === "high-low") matches.sort((a, b) => b.price - a.price);

    womenProductGrid.innerHTML = matches.map((product, index) => `
      <article class="women-product-card" style="animation-delay:${index * 35}ms">
        <div class="women-product-image">
          ${product.id ? `<button class="product-open-image" type="button" data-product-id="${product.id}" aria-label="View ${product.name}"><img src="${product.image}" alt="${product.name}" loading="lazy"></button>` : `<img src="${product.image}" alt="${product.name}" loading="lazy">`}
          ${product.label ? `<span class="product-label">${product.label}</span>` : ""}
          <button class="wishlist-heart" type="button" aria-label="Add ${product.name} to wishlist" aria-pressed="false">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-10-9.3C.5 8 2 4.5 5.5 4c2-.3 3.9.6 5 2.2C11.6 4.6 13.5 3.7 15.5 4 19 4.5 20.5 8 19 11.7 16.5 16.4 12 21 12 21z"/></svg>
          </button>
        </div>
        <div class="women-product-info"><h3>${product.id ? `<button class="product-open-title" type="button" data-product-id="${product.id}">${product.name}</button>` : product.name}</h3><p>$${product.price.toFixed(2)}</p></div>
        <div class="product-colors" aria-label="Available colors">${product.colors.map(color => `<span class="product-color-dot" title="${color}" style="background:${colorValues[color]}"></span>`).join("")}</div>
      </article>
    `).join("");

    visibleCount.textContent = `· Showing ${matches.length} curated ${matches.length === 1 ? "piece" : "pieces"}`;
    const detailIsOpen = !dressDetail.hidden;
    emptyState.hidden = matches.length > 0 || detailIsOpen;
    womenProductGrid.hidden = matches.length === 0 || detailIsOpen;
    womenProductGrid.querySelectorAll(".wishlist-heart").forEach(button => {
      button.addEventListener("click", () => {
        const isActive = button.classList.toggle("active");
        button.setAttribute("aria-pressed", String(isActive));
      });
    });
    womenProductGrid.querySelectorAll("[data-product-id]").forEach(button => button.addEventListener("click", showDressDetail));
  }

  document.querySelectorAll('.collection-sidebar input[type="checkbox"]').forEach(input => input.addEventListener("change", renderWomenProducts));
  colorFilters.forEach(button => button.addEventListener("click", () => {
    const isSelected = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(isSelected));
    renderWomenProducts();
  }));
  priceRange.addEventListener("input", () => {
    priceOutput.value = `$${priceRange.value}`;
    priceOutput.textContent = `$${priceRange.value}`;
    renderWomenProducts();
  });
  sortProducts.addEventListener("change", renderWomenProducts);
  womenSearch.addEventListener("input", renderWomenProducts);
  document.getElementById("clearFilters").addEventListener("click", () => {
    document.querySelectorAll('.collection-sidebar input[type="checkbox"]').forEach(input => { input.checked = false; });
    colorFilters.forEach(button => button.setAttribute("aria-pressed", "false"));
    priceRange.value = 200;
    priceOutput.value = "$200";
    priceOutput.textContent = "$200";
    womenSearch.value = "";
    sortProducts.value = "featured";
    renderWomenProducts();
  });
  filtersToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    filtersToggle.setAttribute("aria-expanded", String(isOpen));
  });
  viewCategories.addEventListener("click", () => {
    const isExpanded = viewCategories.getAttribute("aria-expanded") !== "true";
    additionalCategories.hidden = !isExpanded;
    viewCategories.setAttribute("aria-expanded", String(isExpanded));
    viewCategories.firstChild.textContent = isExpanded ? "Show Featured Categories " : "View All Categories ";
  });
  dressColorOptions.addEventListener("click", event => {
    const button = event.target.closest("[data-dress-color]");
    if (button) selectDressColor(button.dataset.dressColor);
  });
  document.getElementById("backToWomenProducts").addEventListener("click", closeDressDetail);
  document.getElementById("dressWishlist").addEventListener("click", event => {
    const button = event.currentTarget;
    const isActive = button.classList.toggle("active");
    button.setAttribute("aria-pressed", String(isActive));
    button.setAttribute("aria-label", `${isActive ? "Remove" : "Add"} Ruched Bell Sleeve Mini Dress ${isActive ? "from" : "to"} wishlist`);
  });
  document.getElementById("addDressToBag").addEventListener("click", () => addDressToBag(false));
  document.getElementById("buyDressNow").addEventListener("click", () => addDressToBag(true));
  document.getElementById("dressQuantity").addEventListener("change", event => {
    event.currentTarget.value = String(Math.max(1, Math.min(10, Number(event.currentTarget.value) || 1)));
  });
  document.querySelectorAll(".women-category-card").forEach(card => card.addEventListener("click", event => {
    event.preventDefault();
    categoryFilters.forEach(input => { input.checked = input.value === card.dataset.category; });
    const extraFilters = document.querySelector(".extra-filter-categories");
    if (extraFilters && [...extraFilters.querySelectorAll('input[name="category"]')].some(input => input.value === card.dataset.category)) {
      extraFilters.open = true;
    }
    renderWomenProducts();
    document.getElementById("womenProductGrid").scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  renderWomenProducts();
}

// ===================== Men Collection =====================
const menProductGrid = document.getElementById("menProductGrid");

if (menProductGrid) {
  const menProducts = [
    { name: "Relaxed Fit T-Shirt", category: "t-shirts", price: 38, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=85&w=800&auto=format&fit=crop", colors: ["white", "black", "brown"], sizes: ["XS", "S", "M", "L", "XL", "XXL"] },
    { name: "Linen Shirt", category: "shirts", price: 74, image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=85&w=800&auto=format&fit=crop", colors: ["beige", "white", "gray"], sizes: ["S", "M", "L", "XL", "XXL"] },
    { name: "Straight Leg Jeans", category: "jeans", price: 88, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=85&w=800&auto=format&fit=crop", colors: ["navy", "black"], sizes: ["XS", "S", "M", "L", "XL"] },
    { name: "Tailored Trousers", category: "pants", price: 96, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=85&w=800&auto=format&fit=crop", colors: ["black", "beige", "gray"], sizes: ["S", "M", "L", "XL", "XXL"] },
    { name: "Classic Blazer", category: "suits", price: 168, image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=85&w=800&auto=format&fit=crop", colors: ["black", "brown", "navy"], sizes: ["S", "M", "L", "XL"] },
    { name: "Lightweight Jacket", category: "jackets-coats", price: 128, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=85&w=800&auto=format&fit=crop", colors: ["gray", "black", "beige"], sizes: ["S", "M", "L", "XL", "XXL"] },
    { name: "Knit Polo", category: "shirts", price: 68, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=85&w=800&auto=format&fit=crop", colors: ["beige", "brown", "black"], sizes: ["XS", "S", "M", "L", "XL"] },
    { name: "Everyday Hoodie", category: "hoodies-sweatshirts", price: 82, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=85&w=800&auto=format&fit=crop", colors: ["gray", "black", "beige"], sizes: ["S", "M", "L", "XL", "XXL"] }
  ];
  const search = document.getElementById("menSearch");
  const viewCategories = document.getElementById("viewCategories");
  const additionalCategories = document.getElementById("additionalCategories");
  const categoryFilters = [...document.querySelectorAll('input[name="men-category"]')];
  const sizeFilters = [...document.querySelectorAll('input[name="men-size"]')];
  const colorFilters = [...document.querySelectorAll("[data-men-color]")];
  const priceRange = document.getElementById("menPriceRange");
  const priceOutput = document.getElementById("menPriceOutput");
  const sortProducts = document.getElementById("menSortProducts");
  const visibleCount = document.getElementById("menVisibleCount");
  const emptyState = document.getElementById("menEmptyState");
  const sidebar = document.getElementById("menCollectionSidebar");
  const filtersToggle = document.getElementById("menFiltersToggle");
  const colorValues = { black: "#252321", white: "#fff", beige: "#d7c7ae", brown: "#8a6955", navy: "#26364a", gray: "#92918e" };

  function renderMenProducts() {
    const query = search.value.trim().toLowerCase();
    const categories = categoryFilters.filter(input => input.checked).map(input => input.value);
    const sizes = sizeFilters.filter(input => input.checked).map(input => input.value);
    const colors = colorFilters.filter(button => button.getAttribute("aria-pressed") === "true").map(button => button.dataset.menColor);
    let products = menProducts.filter(product =>
      (!categories.length || categories.includes(product.category)) &&
      (!sizes.length || sizes.some(size => product.sizes.includes(size))) &&
      (!colors.length || colors.some(color => product.colors.includes(color))) &&
      product.price <= Number(priceRange.value) &&
      (!query || `${product.name} ${product.category}`.toLowerCase().includes(query))
    );

    if (sortProducts.value === "newest") products = [...products].reverse();
    if (sortProducts.value === "low-high") products.sort((a, b) => a.price - b.price);
    if (sortProducts.value === "high-low") products.sort((a, b) => b.price - a.price);

    menProductGrid.innerHTML = products.map((product, index) => `
      <article class="women-product-card" style="animation-delay:${index * 35}ms">
        <div class="women-product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <button class="wishlist-heart" type="button" aria-label="Add ${product.name} to wishlist" aria-pressed="false">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-10-9.3C.5 8 2 4.5 5.5 4c2-.3 3.9.6 5 2.2C11.6 4.6 13.5 3.7 15.5 4 19 4.5 20.5 8 19 11.7 16.5 16.4 12 21 12 21z"/></svg>
          </button>
        </div>
        <div class="women-product-info"><h3>${product.name}</h3><p>$${product.price.toFixed(2)}</p></div>
        <div class="product-colors" aria-label="Available colors">${product.colors.map(color => `<span class="product-color-dot" style="background:${colorValues[color]}" title="${color}" aria-label="${color}"></span>`).join("")}</div>
      </article>
    `).join("");
    visibleCount.textContent = `· Showing ${products.length} curated ${products.length === 1 ? "piece" : "pieces"}`;
    emptyState.hidden = products.length > 0;
    menProductGrid.hidden = products.length === 0;
    menProductGrid.querySelectorAll(".wishlist-heart").forEach(button => button.addEventListener("click", () => {
      const isActive = button.classList.toggle("active");
      button.setAttribute("aria-pressed", String(isActive));
    }));
  }

  search.addEventListener("input", renderMenProducts);
  categoryFilters.forEach(input => input.addEventListener("change", renderMenProducts));
  sizeFilters.forEach(input => input.addEventListener("change", renderMenProducts));
  colorFilters.forEach(button => button.addEventListener("click", () => {
    button.setAttribute("aria-pressed", String(button.getAttribute("aria-pressed") !== "true"));
    renderMenProducts();
  }));
  priceRange.addEventListener("input", () => {
    priceOutput.value = `$${priceRange.value}`;
    priceOutput.textContent = `$${priceRange.value}`;
    renderMenProducts();
  });
  sortProducts.addEventListener("change", renderMenProducts);
  document.getElementById("menClearFilters").addEventListener("click", () => {
    categoryFilters.forEach(input => { input.checked = false; });
    sizeFilters.forEach(input => { input.checked = false; });
    colorFilters.forEach(button => button.setAttribute("aria-pressed", "false"));
    priceRange.value = 200;
    priceOutput.value = "$200";
    priceOutput.textContent = "$200";
    search.value = "";
    sortProducts.value = "featured";
    renderMenProducts();
  });
  filtersToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    filtersToggle.setAttribute("aria-expanded", String(isOpen));
  });
  viewCategories.addEventListener("click", () => {
    const isExpanded = viewCategories.getAttribute("aria-expanded") !== "true";
    additionalCategories.hidden = !isExpanded;
    viewCategories.setAttribute("aria-expanded", String(isExpanded));
    viewCategories.firstChild.textContent = isExpanded ? "Show Featured Categories " : "View All Categories ";
  });
  document.querySelectorAll(".women-category-card").forEach((card, index) => card.addEventListener("click", event => {
    event.preventDefault();
    const category = categoryFilters[index];
    if (category) {
      categoryFilters.forEach(input => { input.checked = input === category; });
      if (index >= 8) document.querySelector(".extra-filter-categories").open = true;
      renderMenProducts();
    }
    menProductGrid.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  renderMenProducts();
}

// ===================== Kids Collection =====================
const kidsProductGrid = document.getElementById("kidsProductGrid");

if (kidsProductGrid) {
  const kidsProducts = [
    { name: "Knit Sweater Set", price: 68, image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=85&w=800&auto=format&fit=crop", categories: ["sets", "newborn", "baby-girls", "baby-boys"], sizes: ["0-3M", "3-6M", "6-12M", "1-2Y", "2-3Y"], colors: ["beige", "pink", "blue"] },
    { name: "Cotton T-Shirt", price: 24, image: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?q=85&w=800&auto=format&fit=crop", categories: ["t-shirts-tops", "girls", "boys", "baby-girls", "baby-boys"], sizes: ["6-12M", "1-2Y", "2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"], colors: ["white", "pink", "blue", "beige"] },
    { name: "Denim Jeans", price: 42, image: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?q=85&w=800&auto=format&fit=crop", categories: ["pants-jeans", "girls", "boys"], sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"], colors: ["blue", "gray"] },
    { name: "Hooded Jacket", price: 78, image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=85&w=800&auto=format&fit=crop", categories: ["jackets-coats", "boys", "girls", "baby-boys", "baby-girls"], sizes: ["3-6M", "6-12M", "1-2Y", "2-3Y", "4-5Y", "6-7Y", "8-9Y"], colors: ["beige", "blue", "gray"] },
    { name: "Floral Dress", price: 58, image: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?q=85&w=800&auto=format&fit=crop", categories: ["dresses", "girls", "baby-girls"], sizes: ["6-12M", "1-2Y", "2-3Y", "4-5Y", "6-7Y", "8-9Y"], colors: ["pink", "white", "beige"] },
    { name: "Jogger Set", price: 54, image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=85&w=800&auto=format&fit=crop", categories: ["sets", "activewear", "boys", "girls", "baby-boys", "baby-girls"], sizes: ["0-3M", "3-6M", "6-12M", "1-2Y", "2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"], colors: ["gray", "blue", "beige"] },
    { name: "Pajama Set", price: 44, image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?q=85&w=800&auto=format&fit=crop", categories: ["sleepwear", "sets", "boys", "girls"], sizes: ["1-2Y", "2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"], colors: ["blue", "pink", "white"] },
    { name: "Everyday Sneakers", price: 62, image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=85&w=800&auto=format&fit=crop", categories: ["shoes", "boys", "girls"], sizes: ["1-2Y", "2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"], colors: ["white", "blue", "gray"] }
  ];
  const search = document.getElementById("kidsSearch");
  const categoryFilters = [...document.querySelectorAll('input[name="kids-category"]')];
  const sizeFilters = [...document.querySelectorAll('input[name="kids-size"]')];
  const colorFilters = [...document.querySelectorAll("[data-kids-color]")];
  const priceRange = document.getElementById("kidsPriceRange");
  const priceOutput = document.getElementById("kidsPriceOutput");
  const sortProducts = document.getElementById("kidsSortProducts");
  const visibleCount = document.getElementById("kidsVisibleCount");
  const emptyState = document.getElementById("kidsEmptyState");
  const sidebar = document.getElementById("kidsCollectionSidebar");
  const filtersToggle = document.getElementById("kidsFiltersToggle");
  const viewCategories = document.getElementById("kidsViewCategories");
  const additionalCategories = document.getElementById("kidsAdditionalCategories");
  const colorValues = { black: "#252321", white: "#fff", beige: "#d7c7ae", pink: "#d9aeb0", blue: "#7b9eb7", brown: "#8a6955", gray: "#92918e" };

  function renderKidsProducts() {
    const query = search.value.trim().toLowerCase();
    const categories = categoryFilters.filter(input => input.checked).map(input => input.value);
    const sizes = sizeFilters.filter(input => input.checked).map(input => input.value);
    const colors = colorFilters.filter(button => button.getAttribute("aria-pressed") === "true").map(button => button.dataset.kidsColor);
    let products = kidsProducts.filter(product =>
      (!categories.length || categories.some(category => product.categories.includes(category))) &&
      (!sizes.length || sizes.some(size => product.sizes.includes(size))) &&
      (!colors.length || colors.some(color => product.colors.includes(color))) &&
      product.price <= Number(priceRange.value) &&
      (!query || `${product.name} ${product.categories.join(" ")}`.toLowerCase().includes(query))
    );

    if (sortProducts.value === "newest") products = [...products].reverse();
    if (sortProducts.value === "low-high") products.sort((a, b) => a.price - b.price);
    if (sortProducts.value === "high-low") products.sort((a, b) => b.price - a.price);

    kidsProductGrid.innerHTML = products.map((product, index) => `
      <article class="women-product-card" style="animation-delay:${index * 35}ms">
        <div class="women-product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <button class="wishlist-heart" type="button" aria-label="Add ${product.name} to wishlist" aria-pressed="false">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-10-9.3C.5 8 2 4.5 5.5 4c2-.3 3.9.6 5 2.2C11.6 4.6 13.5 3.7 15.5 4 19 4.5 20.5 8 19 11.7 16.5 16.4 12 21 12 21z"/></svg>
          </button>
        </div>
        <div class="women-product-info"><h3>${product.name}</h3><p>$${product.price.toFixed(2)}</p></div>
        <div class="product-colors" aria-label="Available colors">${product.colors.map(color => `<span class="product-color-dot" style="background:${colorValues[color]}" title="${color}" aria-label="${color}"></span>`).join("")}</div>
      </article>
    `).join("");

    visibleCount.textContent = `· Showing ${products.length} curated ${products.length === 1 ? "piece" : "pieces"}`;
    emptyState.hidden = products.length > 0;
    kidsProductGrid.hidden = products.length === 0;
    kidsProductGrid.querySelectorAll(".wishlist-heart").forEach(button => button.addEventListener("click", () => {
      const isActive = button.classList.toggle("active");
      button.setAttribute("aria-pressed", String(isActive));
    }));
  }

  search.addEventListener("input", renderKidsProducts);
  categoryFilters.forEach(input => input.addEventListener("change", renderKidsProducts));
  sizeFilters.forEach(input => input.addEventListener("change", renderKidsProducts));
  colorFilters.forEach(button => button.addEventListener("click", () => {
    button.setAttribute("aria-pressed", String(button.getAttribute("aria-pressed") !== "true"));
    renderKidsProducts();
  }));
  priceRange.addEventListener("input", () => {
    priceOutput.value = `$${priceRange.value}`;
    priceOutput.textContent = `$${priceRange.value}`;
    renderKidsProducts();
  });
  sortProducts.addEventListener("change", renderKidsProducts);
  document.getElementById("kidsClearFilters").addEventListener("click", () => {
    categoryFilters.forEach(input => { input.checked = false; });
    sizeFilters.forEach(input => { input.checked = false; });
    colorFilters.forEach(button => button.setAttribute("aria-pressed", "false"));
    priceRange.value = 150;
    priceOutput.value = "$150";
    priceOutput.textContent = "$150";
    search.value = "";
    sortProducts.value = "featured";
    renderKidsProducts();
  });
  filtersToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    filtersToggle.setAttribute("aria-expanded", String(isOpen));
  });
  viewCategories.addEventListener("click", () => {
    const isExpanded = viewCategories.getAttribute("aria-expanded") !== "true";
    additionalCategories.hidden = !isExpanded;
    viewCategories.setAttribute("aria-expanded", String(isExpanded));
    viewCategories.firstChild.textContent = isExpanded ? "Show Featured Categories " : "View All Categories ";
  });
  document.querySelectorAll("[data-kids-category]").forEach(card => card.addEventListener("click", event => {
    event.preventDefault();
    const category = card.dataset.kidsCategory;
    categoryFilters.forEach(input => { input.checked = input.value === category; });
    const extraCategories = document.querySelector(".extra-filter-categories");
    if (extraCategories && [...extraCategories.querySelectorAll('input[name="kids-category"]')].some(input => input.value === category)) {
      extraCategories.open = true;
    }
    renderKidsProducts();
    kidsProductGrid.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  renderKidsProducts();
}

// ===================== Bags Collection =====================
const bagsProductGrid = document.getElementById("bagsProductGrid");

if (bagsProductGrid) {
  const bagsProducts = [
    { name: "Structured Shoulder Bag", price: 168, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=85&w=800&auto=format&fit=crop", categories: ["shoulder-bags", "handbags"], sizes: ["small", "medium"], colors: ["black", "beige", "brown"], materials: ["leather"] },
    { name: "Mini Crossbody Bag", price: 88, image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=85&w=800&auto=format&fit=crop", categories: ["crossbody-bags", "mini-bags"], sizes: ["mini", "small"], colors: ["beige", "red", "pink"], materials: ["faux-leather"] },
    { name: "Classic Tote Bag", price: 128, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=85&w=800&auto=format&fit=crop", categories: ["tote-bags", "work-bags", "laptop-bags"], sizes: ["large", "oversized"], colors: ["beige", "brown", "black"], materials: ["canvas", "fabric"] },
    { name: "Soft Hobo Bag", price: 148, image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=85&w=800&auto=format&fit=crop", categories: ["hobo-bags", "shoulder-bags"], sizes: ["medium", "large"], colors: ["brown", "tan", "black"], materials: ["leather", "suede"] },
    { name: "Evening Clutch", price: 96, image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=85&w=800&auto=format&fit=crop", categories: ["clutches", "evening-bags", "mini-bags"], sizes: ["mini", "small"], colors: ["black", "red", "pink"], materials: ["faux-leather", "fabric"] },
    { name: "Leather Work Bag", price: 218, image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=85&w=800&auto=format&fit=crop", categories: ["work-bags", "laptop-bags", "tote-bags"], sizes: ["large", "oversized"], colors: ["black", "brown", "tan"], materials: ["leather"] },
    { name: "Everyday Backpack", price: 112, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=85&w=800&auto=format&fit=crop", categories: ["backpacks", "belt-bags"], sizes: ["small", "medium"], colors: ["green", "blue", "black"], materials: ["nylon", "canvas"] },
    { name: "Travel Weekender", price: 198, image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=85&w=800&auto=format&fit=crop", categories: ["travel-bags", "backpacks"], sizes: ["large", "oversized"], colors: ["black", "tan", "beige"], materials: ["nylon", "fabric"] }
  ];
  const search = document.getElementById("bagsSearch");
  const categoryFilters = [...document.querySelectorAll('input[name="bags-category"]')];
  const sizeFilters = [...document.querySelectorAll('input[name="bags-size"]')];
  const colorFilters = [...document.querySelectorAll("[data-bags-color]")];
  const materialFilters = [...document.querySelectorAll('input[name="bags-material"]')];
  const priceRange = document.getElementById("bagsPriceRange");
  const priceOutput = document.getElementById("bagsPriceOutput");
  const sortProducts = document.getElementById("bagsSortProducts");
  const visibleCount = document.getElementById("bagsVisibleCount");
  const emptyState = document.getElementById("bagsEmptyState");
  const sidebar = document.getElementById("bagsCollectionSidebar");
  const filtersToggle = document.getElementById("bagsFiltersToggle");
  const viewCategories = document.getElementById("bagsViewCategories");
  const additionalCategories = document.getElementById("bagsAdditionalCategories");
  const colorValues = { black: "#252321", white: "#fff", beige: "#d7c7ae", brown: "#8a6955", tan: "#b88a61", red: "#a34a3f", pink: "#d9aeb0", green: "#697862", blue: "#71869b" };

  function renderBagsProducts() {
    const query = search.value.trim().toLowerCase();
    const categories = categoryFilters.filter(input => input.checked).map(input => input.value);
    const sizes = sizeFilters.filter(input => input.checked).map(input => input.value);
    const colors = colorFilters.filter(button => button.getAttribute("aria-pressed") === "true").map(button => button.dataset.bagsColor);
    const materials = materialFilters.filter(input => input.checked).map(input => input.value);
    let products = bagsProducts.filter(product =>
      (!categories.length || categories.some(category => product.categories.includes(category))) &&
      (!sizes.length || sizes.some(size => product.sizes.includes(size))) &&
      (!colors.length || colors.some(color => product.colors.includes(color))) &&
      (!materials.length || materials.some(material => product.materials.includes(material))) &&
      product.price <= Number(priceRange.value) &&
      (!query || `${product.name} ${product.categories.join(" ")} ${product.materials.join(" ")}`.toLowerCase().includes(query))
    );

    if (sortProducts.value === "newest") products = [...products].reverse();
    if (sortProducts.value === "low-high") products.sort((a, b) => a.price - b.price);
    if (sortProducts.value === "high-low") products.sort((a, b) => b.price - a.price);

    bagsProductGrid.innerHTML = products.map((product, index) => `
      <article class="women-product-card" style="animation-delay:${index * 35}ms">
        <div class="women-product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <button class="wishlist-heart" type="button" aria-label="Add ${product.name} to wishlist" aria-pressed="false">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-10-9.3C.5 8 2 4.5 5.5 4c2-.3 3.9.6 5 2.2C11.6 4.6 13.5 3.7 15.5 4 19 4.5 20.5 8 19 11.7 16.5 16.4 12 21 12 21z"/></svg>
          </button>
        </div>
        <div class="women-product-info"><h3>${product.name}</h3><p>$${product.price.toFixed(2)}</p></div>
        <div class="product-colors" aria-label="Available colors">${product.colors.map(color => `<span class="product-color-dot" style="background:${colorValues[color]}" title="${color}" aria-label="${color}"></span>`).join("")}</div>
      </article>
    `).join("");

    visibleCount.textContent = `· Showing ${products.length} curated ${products.length === 1 ? "piece" : "pieces"}`;
    emptyState.hidden = products.length > 0;
    bagsProductGrid.hidden = products.length === 0;
    bagsProductGrid.querySelectorAll(".wishlist-heart").forEach(button => button.addEventListener("click", () => {
      const isActive = button.classList.toggle("active");
      button.setAttribute("aria-pressed", String(isActive));
    }));
  }

  search.addEventListener("input", renderBagsProducts);
  categoryFilters.forEach(input => input.addEventListener("change", renderBagsProducts));
  sizeFilters.forEach(input => input.addEventListener("change", renderBagsProducts));
  materialFilters.forEach(input => input.addEventListener("change", renderBagsProducts));
  colorFilters.forEach(button => button.addEventListener("click", () => {
    button.setAttribute("aria-pressed", String(button.getAttribute("aria-pressed") !== "true"));
    renderBagsProducts();
  }));
  priceRange.addEventListener("input", () => {
    priceOutput.value = `$${priceRange.value}`;
    priceOutput.textContent = `$${priceRange.value}`;
    renderBagsProducts();
  });
  sortProducts.addEventListener("change", renderBagsProducts);
  document.getElementById("bagsClearFilters").addEventListener("click", () => {
    categoryFilters.forEach(input => { input.checked = false; });
    sizeFilters.forEach(input => { input.checked = false; });
    materialFilters.forEach(input => { input.checked = false; });
    colorFilters.forEach(button => button.setAttribute("aria-pressed", "false"));
    priceRange.value = 300;
    priceOutput.value = "$300";
    priceOutput.textContent = "$300";
    search.value = "";
    sortProducts.value = "featured";
    renderBagsProducts();
  });
  filtersToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    filtersToggle.setAttribute("aria-expanded", String(isOpen));
  });
  viewCategories.addEventListener("click", () => {
    const isExpanded = viewCategories.getAttribute("aria-expanded") !== "true";
    additionalCategories.hidden = !isExpanded;
    viewCategories.setAttribute("aria-expanded", String(isExpanded));
    viewCategories.firstChild.textContent = isExpanded ? "Show Featured Categories " : "View All Categories ";
  });
  document.querySelectorAll("[data-bags-category]").forEach(card => card.addEventListener("click", event => {
    event.preventDefault();
    const category = card.dataset.bagsCategory;
    categoryFilters.forEach(input => { input.checked = input.value === category; });
    const extraCategories = document.querySelector(".extra-filter-categories");
    if (extraCategories && [...extraCategories.querySelectorAll('input[name="bags-category"]')].some(input => input.value === category)) {
      extraCategories.open = true;
    }
    renderBagsProducts();
    bagsProductGrid.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  renderBagsProducts();
}

// ===================== Shoes Collection =====================
const shoesProductGrid = document.getElementById("shoesProductGrid");

if (shoesProductGrid) {
  const shoesProducts = [
    { name: "Classic White Sneakers", price: 88, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=85&w=800&auto=format&fit=crop", categories: ["sneakers", "casual-shoes"], sizes: ["35", "36", "37", "38", "39", "40", "41", "42"], colors: ["white", "beige", "blue"], materials: ["leather", "fabric"], heel: "flat" },
    { name: "Pointed Toe Heels", price: 148, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=85&w=800&auto=format&fit=crop", categories: ["heels", "pumps", "formal-shoes"], sizes: ["35", "36", "37", "38", "39", "40", "41"], colors: ["black", "beige", "red"], materials: ["leather", "suede"], heel: "high" },
    { name: "Leather Loafers", price: 128, image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=85&w=800&auto=format&fit=crop", categories: ["loafers", "casual-shoes", "formal-shoes"], sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"], colors: ["black", "brown", "tan"], materials: ["leather"], heel: "low" },
    { name: "Minimal Sandals", price: 78, image: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?q=85&w=800&auto=format&fit=crop", categories: ["sandals", "flats", "espadrilles"], sizes: ["35", "36", "37", "38", "39", "40", "41"], colors: ["beige", "tan", "brown"], materials: ["leather", "fabric"], heel: "flat" },
    { name: "Ankle Boots", price: 168, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=85&w=800&auto=format&fit=crop", categories: ["boots", "formal-shoes"], sizes: ["36", "37", "38", "39", "40", "41", "42"], colors: ["black", "brown", "gray"], materials: ["leather", "suede"], heel: "mid" },
    { name: "Everyday Flats", price: 82, image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=85&w=800&auto=format&fit=crop", categories: ["flats", "slip-ons", "mules"], sizes: ["35", "36", "37", "38", "39", "40", "41", "42"], colors: ["beige", "pink", "black"], materials: ["faux-leather", "fabric"], heel: "flat" },
    { name: "Platform Sneakers", price: 108, image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=85&w=800&auto=format&fit=crop", categories: ["platform-shoes", "sneakers"], sizes: ["35", "36", "37", "38", "39", "40", "41", "42", "43"], colors: ["white", "blue", "red"], materials: ["canvas", "fabric"], heel: "mid" },
    { name: "Elegant Pumps", price: 158, image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?q=85&w=800&auto=format&fit=crop", categories: ["pumps", "heels", "formal-shoes"], sizes: ["35", "36", "37", "38", "39", "40", "41"], colors: ["black", "beige", "red"], materials: ["leather", "faux-leather"], heel: "high" }
  ];
  const search = document.getElementById("shoesSearch");
  const categoryFilters = [...document.querySelectorAll('input[name="shoes-category"]')];
  const sizeFilters = [...document.querySelectorAll('input[name="shoes-size"]')];
  const colorFilters = [...document.querySelectorAll("[data-shoes-color]")];
  const materialFilters = [...document.querySelectorAll('input[name="shoes-material"]')];
  const heelFilters = [...document.querySelectorAll('input[name="shoes-heel"]')];
  const priceRange = document.getElementById("shoesPriceRange");
  const priceOutput = document.getElementById("shoesPriceOutput");
  const sortProducts = document.getElementById("shoesSortProducts");
  const visibleCount = document.getElementById("shoesVisibleCount");
  const emptyState = document.getElementById("shoesEmptyState");
  const sidebar = document.getElementById("shoesCollectionSidebar");
  const filtersToggle = document.getElementById("shoesFiltersToggle");
  const viewCategories = document.getElementById("shoesViewCategories");
  const additionalCategories = document.getElementById("shoesAdditionalCategories");
  const colorValues = { black: "#252321", white: "#fff", beige: "#d7c7ae", brown: "#8a6955", tan: "#b88a61", red: "#a34a3f", pink: "#d9aeb0", blue: "#71869b", gray: "#92918e" };

  function renderShoesProducts() {
    const query = search.value.trim().toLowerCase();
    const categories = categoryFilters.filter(input => input.checked).map(input => input.value);
    const sizes = sizeFilters.filter(input => input.checked).map(input => input.value);
    const colors = colorFilters.filter(button => button.getAttribute("aria-pressed") === "true").map(button => button.dataset.shoesColor);
    const materials = materialFilters.filter(input => input.checked).map(input => input.value);
    const heels = heelFilters.filter(input => input.checked).map(input => input.value);
    let products = shoesProducts.filter(product =>
      (!categories.length || categories.some(category => product.categories.includes(category))) &&
      (!sizes.length || sizes.some(size => product.sizes.includes(size))) &&
      (!colors.length || colors.some(color => product.colors.includes(color))) &&
      (!materials.length || materials.some(material => product.materials.includes(material))) &&
      (!heels.length || heels.includes(product.heel)) &&
      product.price <= Number(priceRange.value) &&
      (!query || `${product.name} ${product.categories.join(" ")} ${product.materials.join(" ")} ${product.heel}`.toLowerCase().includes(query))
    );

    if (sortProducts.value === "newest") products = [...products].reverse();
    if (sortProducts.value === "low-high") products.sort((a, b) => a.price - b.price);
    if (sortProducts.value === "high-low") products.sort((a, b) => b.price - a.price);

    shoesProductGrid.innerHTML = products.map((product, index) => `
      <article class="women-product-card" style="animation-delay:${index * 35}ms">
        <div class="women-product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <button class="wishlist-heart" type="button" aria-label="Add ${product.name} to wishlist" aria-pressed="false">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-10-9.3C.5 8 2 4.5 5.5 4c2-.3 3.9.6 5 2.2C11.6 4.6 13.5 3.7 15.5 4 19 4.5 20.5 8 19 11.7 16.5 16.4 12 21 12 21z"/></svg>
          </button>
        </div>
        <div class="women-product-info"><h3>${product.name}</h3><p>$${product.price.toFixed(2)}</p></div>
        <div class="product-colors" aria-label="Available colors">${product.colors.map(color => `<span class="product-color-dot" style="background:${colorValues[color]}" title="${color}" aria-label="${color}"></span>`).join("")}</div>
      </article>
    `).join("");

    visibleCount.textContent = `· Showing ${products.length} curated ${products.length === 1 ? "piece" : "pieces"}`;
    emptyState.hidden = products.length > 0;
    shoesProductGrid.hidden = products.length === 0;
    shoesProductGrid.querySelectorAll(".wishlist-heart").forEach(button => button.addEventListener("click", () => {
      const isActive = button.classList.toggle("active");
      button.setAttribute("aria-pressed", String(isActive));
    }));
  }

  search.addEventListener("input", renderShoesProducts);
  categoryFilters.forEach(input => input.addEventListener("change", renderShoesProducts));
  sizeFilters.forEach(input => input.addEventListener("change", renderShoesProducts));
  materialFilters.forEach(input => input.addEventListener("change", renderShoesProducts));
  heelFilters.forEach(input => input.addEventListener("change", renderShoesProducts));
  colorFilters.forEach(button => button.addEventListener("click", () => {
    button.setAttribute("aria-pressed", String(button.getAttribute("aria-pressed") !== "true"));
    renderShoesProducts();
  }));
  priceRange.addEventListener("input", () => {
    priceOutput.value = `$${priceRange.value}`;
    priceOutput.textContent = `$${priceRange.value}`;
    renderShoesProducts();
  });
  sortProducts.addEventListener("change", renderShoesProducts);
  document.getElementById("shoesClearFilters").addEventListener("click", () => {
    categoryFilters.forEach(input => { input.checked = false; });
    sizeFilters.forEach(input => { input.checked = false; });
    materialFilters.forEach(input => { input.checked = false; });
    heelFilters.forEach(input => { input.checked = false; });
    colorFilters.forEach(button => button.setAttribute("aria-pressed", "false"));
    priceRange.value = 250;
    priceOutput.value = "$250";
    priceOutput.textContent = "$250";
    search.value = "";
    sortProducts.value = "featured";
    renderShoesProducts();
  });
  filtersToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    filtersToggle.setAttribute("aria-expanded", String(isOpen));
  });
  viewCategories.addEventListener("click", () => {
    const isExpanded = viewCategories.getAttribute("aria-expanded") !== "true";
    additionalCategories.hidden = !isExpanded;
    viewCategories.setAttribute("aria-expanded", String(isExpanded));
    viewCategories.firstChild.textContent = isExpanded ? "Show Featured Categories " : "View All Categories ";
  });
  document.querySelectorAll("[data-shoes-category]").forEach(card => card.addEventListener("click", event => {
    event.preventDefault();
    const category = card.dataset.shoesCategory;
    categoryFilters.forEach(input => { input.checked = input.value === category; });
    const extraCategories = document.querySelector(".extra-filter-categories");
    if (extraCategories && [...extraCategories.querySelectorAll('input[name="shoes-category"]')].some(input => input.value === category)) {
      extraCategories.open = true;
    }
    renderShoesProducts();
    shoesProductGrid.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  renderShoesProducts();
}

// ===================== Accessories Collection =====================
const accessoriesProductGrid = document.getElementById("accessoriesProductGrid");

if (accessoriesProductGrid) {
  const accessoriesProducts = [
    { name: "Minimal Gold Earrings", price: 48, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=85&w=800&auto=format&fit=crop", categories: ["jewelry"], colors: ["gold", "silver"], materials: ["gold-tone", "metal"] },
    { name: "Classic Sunglasses", price: 78, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=85&w=800&auto=format&fit=crop", categories: ["sunglasses"], colors: ["black", "brown", "beige"], materials: ["acetate"] },
    { name: "Leather Belt", price: 68, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=85&w=800&auto=format&fit=crop", categories: ["belts"], colors: ["black", "brown", "beige"], materials: ["leather"] },
    { name: "Satin Scarf", price: 58, image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=85&w=800&auto=format&fit=crop", categories: ["scarves"], colors: ["beige", "pink", "red"], materials: ["fabric"] },
    { name: "Everyday Watch", price: 148, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=85&w=800&auto=format&fit=crop", categories: ["watches"], colors: ["gold", "silver", "black"], materials: ["metal", "leather"] },
    { name: "Pearl Hair Clip", price: 28, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=85&w=800&auto=format&fit=crop", categories: ["hair-accessories", "jewelry"], colors: ["white", "gold", "pink"], materials: ["pearl", "metal"] },
    { name: "Slim Cardholder", price: 62, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=85&w=800&auto=format&fit=crop", categories: ["wallets-cardholders"], colors: ["brown", "black", "red"], materials: ["leather", "faux-leather"] },
    { name: "Statement Necklace", price: 108, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=85&w=800&auto=format&fit=crop", categories: ["jewelry"], colors: ["gold", "silver", "white"], materials: ["gold-tone", "silver-tone", "pearl", "metal"] }
  ];
  const search = document.getElementById("accessoriesSearch");
  const categoryFilters = [...document.querySelectorAll('input[name="accessories-category"]')];
  const colorFilters = [...document.querySelectorAll("[data-accessory-color]")];
  const materialFilters = [...document.querySelectorAll('input[name="accessories-material"]')];
  const priceRange = document.getElementById("accessoriesPriceRange");
  const priceOutput = document.getElementById("accessoriesPriceOutput");
  const sortProducts = document.getElementById("accessoriesSortProducts");
  const visibleCount = document.getElementById("accessoriesVisibleCount");
  const emptyState = document.getElementById("accessoriesEmptyState");
  const sidebar = document.getElementById("accessoriesCollectionSidebar");
  const filtersToggle = document.getElementById("accessoriesFiltersToggle");
  const viewCategories = document.getElementById("accessoriesViewCategories");
  const additionalCategories = document.getElementById("accessoriesAdditionalCategories");
  const colorValues = { black: "#252321", white: "#fff", beige: "#d7c7ae", brown: "#8a6955", gold: "#c6a15b", silver: "#b9b9b6", pink: "#d9aeb0", red: "#a34a3f" };

  function renderAccessoriesProducts() {
    const query = search.value.trim().toLowerCase();
    const categories = categoryFilters.filter(input => input.checked).map(input => input.value);
    const colors = colorFilters.filter(button => button.getAttribute("aria-pressed") === "true").map(button => button.dataset.accessoryColor);
    const materials = materialFilters.filter(input => input.checked).map(input => input.value);
    let products = accessoriesProducts.filter(product =>
      (!categories.length || categories.some(category => product.categories.includes(category))) &&
      (!colors.length || colors.some(color => product.colors.includes(color))) &&
      (!materials.length || materials.some(material => product.materials.includes(material))) &&
      product.price <= Number(priceRange.value) &&
      (!query || `${product.name} ${product.categories.join(" ")} ${product.materials.join(" ")}`.toLowerCase().includes(query))
    );

    if (sortProducts.value === "newest") products = [...products].reverse();
    if (sortProducts.value === "low-high") products.sort((a, b) => a.price - b.price);
    if (sortProducts.value === "high-low") products.sort((a, b) => b.price - a.price);

    accessoriesProductGrid.innerHTML = products.map((product, index) => `
      <article class="women-product-card" style="animation-delay:${index * 35}ms">
        <div class="women-product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <button class="wishlist-heart" type="button" aria-label="Add ${product.name} to wishlist" aria-pressed="false">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-10-9.3C.5 8 2 4.5 5.5 4c2-.3 3.9.6 5 2.2C11.6 4.6 13.5 3.7 15.5 4 19 4.5 20.5 8 19 11.7 16.5 16.4 12 21 12 21z"/></svg>
          </button>
        </div>
        <div class="women-product-info"><h3>${product.name}</h3><p>$${product.price.toFixed(2)}</p></div>
        <div class="product-colors" aria-label="Available colors and finishes">${product.colors.map(color => `<span class="product-color-dot" style="background:${colorValues[color]}" title="${color}" aria-label="${color}"></span>`).join("")}</div>
      </article>
    `).join("");

    visibleCount.textContent = `· Showing ${products.length} curated ${products.length === 1 ? "piece" : "pieces"}`;
    emptyState.hidden = products.length > 0;
    accessoriesProductGrid.hidden = products.length === 0;
    accessoriesProductGrid.querySelectorAll(".wishlist-heart").forEach(button => button.addEventListener("click", () => {
      const isActive = button.classList.toggle("active");
      button.setAttribute("aria-pressed", String(isActive));
    }));
  }

  search.addEventListener("input", renderAccessoriesProducts);
  categoryFilters.forEach(input => input.addEventListener("change", renderAccessoriesProducts));
  materialFilters.forEach(input => input.addEventListener("change", renderAccessoriesProducts));
  colorFilters.forEach(button => button.addEventListener("click", () => {
    button.setAttribute("aria-pressed", String(button.getAttribute("aria-pressed") !== "true"));
    renderAccessoriesProducts();
  }));
  priceRange.addEventListener("input", () => {
    priceOutput.value = `$${priceRange.value}`;
    priceOutput.textContent = `$${priceRange.value}`;
    renderAccessoriesProducts();
  });
  sortProducts.addEventListener("change", renderAccessoriesProducts);
  document.getElementById("accessoriesClearFilters").addEventListener("click", () => {
    categoryFilters.forEach(input => { input.checked = false; });
    materialFilters.forEach(input => { input.checked = false; });
    colorFilters.forEach(button => button.setAttribute("aria-pressed", "false"));
    priceRange.value = 200;
    priceOutput.value = "$200";
    priceOutput.textContent = "$200";
    search.value = "";
    sortProducts.value = "featured";
    renderAccessoriesProducts();
  });
  filtersToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    filtersToggle.setAttribute("aria-expanded", String(isOpen));
  });
  viewCategories.addEventListener("click", () => {
    const isExpanded = viewCategories.getAttribute("aria-expanded") !== "true";
    additionalCategories.hidden = !isExpanded;
    viewCategories.setAttribute("aria-expanded", String(isExpanded));
    viewCategories.firstChild.textContent = isExpanded ? "Show Featured Categories " : "View All Categories ";
  });
  document.querySelectorAll("[data-accessory-category]").forEach(card => card.addEventListener("click", event => {
    event.preventDefault();
    const category = card.dataset.accessoryCategory;
    categoryFilters.forEach(input => { input.checked = input.value === category; });
    const extraCategories = document.querySelector(".extra-filter-categories");
    if (extraCategories && [...extraCategories.querySelectorAll('input[name="accessories-category"]')].some(input => input.value === category)) {
      extraCategories.open = true;
    }
    renderAccessoriesProducts();
    accessoriesProductGrid.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  renderAccessoriesProducts();
}
