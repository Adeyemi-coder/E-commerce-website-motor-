/* =========================================
   js/ui.js - COMPLETE & FIXED VERSION
   ========================================= */

// 1. PRELOADER LOGIC (SAFE MODE)
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('loaded');
        
        // Init animations after curtain lifts
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100,
                easing: 'ease-out-cubic',
            });
        }
    }
}

// Normal Load: When page is ready, hide it
window.addEventListener('load', () => {
    setTimeout(hidePreloader, 500);
});

// SAFETY NET: If page is stuck loading for more than 4 seconds, force open
setTimeout(() => {
    hidePreloader();
}, 4000);

// Initialize Cinematic Animations (Backup)
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic',
        });
    }
});

// Header Scroll Effect
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (header) {
        header.classList.toggle("scrolled", window.scrollY > 20);
    }
});

// --- GLOBAL HELPERS ---
function getCartData() {
    try {
        const cartData = localStorage.getItem('km_cart');
        return cartData ? JSON.parse(cartData) : [];
    } catch (e) {
        console.error('Error getting cart:', e);
        return [];
    }
}

function getWishlistData() {
    try {
        const wishlistData = localStorage.getItem('km_wishlist');
        return wishlistData ? JSON.parse(wishlistData) : [];
    } catch (e) {
        console.error('Error getting wishlist:', e);
        return [];
    }
}

// --- CRITICAL FIX: FIXED IMAGE LOADER ---
function getProductImage(product, index = 0) {
    const fallbackImages = {
        'Mercedes-Benz': 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&auto=format&fit=crop',
        
        // FIXED: Replaced the broken local file with a working online link
        'Rolls-Royce': 'https://images.unsplash.com/photo-1631295868223-6326585125fe?w=800&auto=format&fit=crop',
        
        'Tesla': 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop',
        'Maserati': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop',
        'Aston Martin': 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop',
        'default': 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop'
    };
    
    // 1. Try to use the image from your data.js first (if it exists)
    if (product && product.images && product.images.length > 0) {
        // If the data.js image is a local file (starts with .), ignore it and use fallback
        if (!product.images[index].startsWith('.')) {
             return product.images[index];
        }
    }
    
    // 2. Otherwise use the safe online fallback
    return fallbackImages[product?.brand] || fallbackImages.default;
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    console.log('UI.js loaded');
    
    initMobileMenu();
    updateCartIconCount();
    
    // Page-specific initializations
    if (document.body.classList.contains('page-home')) {
        renderFeaturedCars();
    }
    if (document.body.classList.contains('page-products')) {
        initProductListing();
    }
    if (document.body.classList.contains('page-cart')) {
        initCartPage();
    }
    if (document.body.classList.contains('page-checkout')) {
        initCheckoutPage();
    }
});

// --- 1. GLOBAL UI FUNCTIONS ---
const initMobileMenu = () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            menuToggle.innerHTML = navLinks.classList.contains('open') ? 
                '<i class="fa-solid fa-xmark"></i>' : 
                '<i class="fa-solid fa-bars"></i>';
        });
    }
};

const updateCartIconCount = () => {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const cart = getCartData();
        const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        cartCountElement.textContent = count > 0 ? count : '';
        cartCountElement.style.display = count > 0 ? 'inline-block' : 'none';
    }
};

// --- 2. PRODUCT CARD FUNCTIONS ---
const createProductCard = (product, index = 0) => {
    const wishlist = getWishlistData();
    const isFeaturedBadge = product.featured ? '<span class="badge">Featured</span>' : '';
    const isWishlisted = wishlist.includes(product.id);
    const wishlistIconClass = isWishlisted ? 'fa-solid active' : 'fa-regular';
    const imageUrl = getProductImage(product, 0);
    
    // Stagger animation delay
    const delay = (index % 6) * 100;

    return `
        <div class="product-card" data-aos="fade-up" data-aos-delay="${delay}">
            ${isFeaturedBadge}
            <a href="product-details.html?id=${product.id}">
                <img src="${imageUrl}" 
                     alt="${product.name}" 
                     class="product-card-image">
            </a>
            <div class="product-card-body">
                <span class="brand">${product.brand}</span>
                <h3><a href="product-details.html?id=${product.id}">${product.name}</a></h3>
                <p>${product.year} | ${product.mileage.toLocaleString()} mi | ${product.fuel}</p>
                <div class="product-card-price">${window.formatCurrency ? window.formatCurrency(product.price) : '$' + product.price.toLocaleString()}</div>
                <div class="card-actions">
                    <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">
                        Add to Cart
                    </button>
                    <button class="btn btn-secondary wishlist-btn" data-id="${product.id}">
                        <i class="fa-star ${wishlistIconClass}"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
};

const attachProductCardListeners = (container) => {
    // 1. EXISTING BUTTON LISTENERS (Kept exactly the same)
    container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.addToCart && window.addToCart(this.dataset.id)) {
                this.textContent = 'Added!';
                this.style.backgroundColor = '#28a745';
                setTimeout(() => { this.textContent = 'Add to Cart'; this.style.backgroundColor = ''; }, 1500);
                updateCartIconCount();
            }
        });
    });
    
    container.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.toggleWishlist) {
                const added = window.toggleWishlist(this.dataset.id);
                const icon = this.querySelector('i');
                icon.className = added ? 'fa-solid fa-star active' : 'fa-regular fa-star';
            }
        });
    });

    // 2. NEW: 3D TILT LOGIC (The "Modern Luxury" Feature)
    container.querySelectorAll('.product-card').forEach(card => {
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            
            // Calculate mouse position relative to the card (0 to 1)
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation (Max tilt: 10 degrees)
            // If mouse is left, rotate Y negative. If mouse is top, rotate X positive.
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -8; // -8 to +8 degrees
            const rotateY = ((x - centerX) / centerX) * 8;  // -8 to +8 degrees

            // Apply the 3D Rotation
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Move the "Glare" light
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        // Reset when mouse leaves
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
};

// --- 3. HOMEPAGE FUNCTIONS ---
const renderFeaturedCars = () => {
    const featuredSection = document.getElementById('featured-cars');
    if (!featuredSection || typeof carProducts === 'undefined') return;

    const featuredProducts = carProducts.filter(p => p.featured);
    
    if (featuredProducts.length === 0) {
        featuredSection.innerHTML = '<p>No featured vehicles at the moment.</p>';
        return;
    }
    
    let html = '';
    // Pass index to card creator for animation delay
    featuredProducts.forEach((product, index) => {
        html += createProductCard(product, index);
    });

    featuredSection.innerHTML = html;
    attachProductCardListeners(featuredSection);
};

// --- 4. PRODUCT LISTING FUNCTIONS ---
let currentFilters = {
    searchTerm: '',
    brand: '',
    fuel: '',
    transmission: '',
    year: '',
    minPrice: 0,
    maxPrice: 550000
};
let currentSortBy = 'newest';

const initProductListing = () => {
    const brandFilter = document.getElementById('filter-brand');
    if (brandFilter && typeof carProducts !== 'undefined') {
        const allBrands = [...new Set(carProducts.map(p => p.brand))];
        allBrands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            brandFilter.appendChild(option);
        });
    }
    
    const maxPriceInput = document.getElementById('filter-max-price');
    if (maxPriceInput && typeof carProducts !== 'undefined') {
        const maxPrice = Math.max(...carProducts.map(p => p.price));
        maxPriceInput.value = maxPrice;
        currentFilters.maxPrice = maxPrice;
    }
    
    const filterForm = document.getElementById('product-filters');
    if (filterForm) filterForm.addEventListener('change', handleFilterChange);
    
    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) sortSelect.addEventListener('change', handleSortChange);
    
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.addEventListener('input', handleSearchChange);
    
    renderProductList();
};

const handleFilterChange = (e) => {
    const target = e.target;
    if (target.id === 'filter-brand') currentFilters.brand = target.value;
    if (target.id === 'filter-fuel') currentFilters.fuel = target.value;
    if (target.id === 'filter-transmission') currentFilters.transmission = target.value;
    if (target.id === 'filter-year') currentFilters.year = target.value;
    if (target.id === 'filter-min-price') currentFilters.minPrice = parseInt(target.value) || 0;
    if (target.id === 'filter-max-price') currentFilters.maxPrice = parseInt(target.value) || Infinity;
    renderProductList();
};

const handleSearchChange = (e) => {
    currentFilters.searchTerm = e.target.value;
    renderProductList();
};

const handleSortChange = (e) => {
    currentSortBy = e.target.value;
    renderProductList();
};

const renderProductList = () => {
    const productListContainer = document.getElementById('product-list');
    if (!productListContainer) return;

    if (typeof window.filterProducts === 'undefined' || typeof carProducts === 'undefined') {
        productListContainer.innerHTML = '<p>Error loading products. Please refresh the page.</p>';
        return;
    }

    const filteredProducts = window.filterProducts(currentFilters.searchTerm, currentFilters, currentSortBy);

    if (filteredProducts.length === 0) {
        productListContainer.innerHTML = '<p class="text-center">No vehicles match your criteria.</p>';
        return;
    }

    let html = '';
    // Pass index for animation
    filteredProducts.forEach((product, index) => {
        html += createProductCard(product, index);
    });

    productListContainer.innerHTML = html;
    attachProductCardListeners(productListContainer);
};

// --- 5. CART PAGE FUNCTIONS ---
const initCartPage = () => {
    renderCartItems();
    updateCartTotals();
};

const renderCartItems = () => {
    const cartItemsContainer = document.getElementById('cart-items-container');
    if (!cartItemsContainer) return;
    
    const cart = getCartData();
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <h3 style="color: var(--color-accent-gold);">Your Cart is Empty</h3>
                <p>Browse our exclusive collection of luxury vehicles.</p>
                <a href="products.html" class="btn btn-primary" style="margin-top: 1rem;">
                    Explore Inventory
                </a>
            </div>
        `;
        return;
    }

    let html = '';
    cart.forEach(item => {
        const productData = typeof carProducts !== 'undefined' ? carProducts.find(p => p.id === item.id) : null;
        const imageUrl = productData ? getProductImage(productData, 0) : 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&auto=format&fit=crop';
        
        html += `
            <div class="cart-item">
                <img src="${imageUrl}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p style="color: var(--color-accent-gold);">${window.formatCurrency ? window.formatCurrency(item.price) : '$' + item.price.toLocaleString()}</p>
                    <p>Quantity: ${item.quantity || 1}</p>
                </div>
                <button class="btn btn-secondary remove-cart-item" data-id="${item.id}">
                    Remove
                </button>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = html;
    
    cartItemsContainer.querySelectorAll('.remove-cart-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.id;
            if (confirm('Remove this item from cart?')) {
                if (window.removeFromCart) {
                    window.removeFromCart(productId);
                    renderCartItems();
                    updateCartTotals();
                    updateCartIconCount();
                }
            }
        });
    });
};

const updateCartTotals = () => {
    if (typeof window.calculateCartTotals === 'undefined') return;
    const totals = window.calculateCartTotals();
    const cart = getCartData();
    
    const subtotalEl = document.getElementById('cart-subtotal');
    const taxEl = document.getElementById('cart-tax');
    const totalEl = document.getElementById('cart-grand-total');
    const taxRateEl = document.getElementById('tax-rate');
    const checkoutBtn = document.querySelector('a[href="checkout.html"]');

    if (subtotalEl) subtotalEl.textContent = window.formatCurrency(totals.subtotal);
    if (taxEl) taxEl.textContent = window.formatCurrency(totals.tax);
    if (totalEl) totalEl.textContent = window.formatCurrency(totals.total);
    if (taxRateEl) taxRateEl.textContent = '8%';
    
    if (checkoutBtn) {
        if (cart.length === 0) {
            checkoutBtn.style.opacity = '0.5';
            checkoutBtn.style.pointerEvents = 'none';
        } else {
            checkoutBtn.style.opacity = '1';
            checkoutBtn.style.pointerEvents = 'auto';
        }
    }
};

// --- 6. CHECKOUT PAGE FUNCTIONS ---
const initCheckoutPage = () => {
    const cart = getCartData();
    
    if (cart.length === 0) {
        document.querySelector('.checkout-layout').innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <h2 style="color: var(--color-accent-gold);">Your Cart is Empty</h2>
                <p>Add items to your cart before checking out.</p>
                <a href="products.html" class="btn btn-primary">Browse Vehicles</a>
            </div>
        `;
        return;
    }
    
    if (typeof window.calculateCartTotals !== 'undefined') {
        const totals = window.calculateCartTotals();
        document.getElementById('checkout-summary-subtotal').textContent = window.formatCurrency(totals.subtotal);
        document.getElementById('checkout-summary-tax').textContent = window.formatCurrency(totals.tax);
        document.getElementById('checkout-summary-total').textContent = window.formatCurrency(totals.total);
        document.getElementById('checkout-item-count').textContent = cart.length;
    }
    
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            
            if (!name || !email) {
                alert('Please fill in all required fields.');
                return;
            }
            localStorage.removeItem('km_cart');
            alert(`Thank you ${name}! Your order has been placed. Confirmation sent to ${email}.`);
            window.location.href = 'index.html';
        });
    }
};

// Global Exposure
window.updateCartDisplay = () => {
    updateCartIconCount();
    if (document.body.classList.contains('page-cart')) {
        renderCartItems();
        updateCartTotals();
    }
    if (document.body.classList.contains('page-checkout')) {
        initCheckoutPage();
    }
};

window.updateWishlistIcons = (productId) => {
    const wishlist = getWishlistData();
    const selector = productId ? `.wishlist-btn[data-id="${productId}"]` : '.wishlist-btn';
    document.querySelectorAll(selector).forEach(button => {
        const icon = button.querySelector('i');
        if (icon) {
            icon.className = wishlist.includes(productId) ? 'fa-solid fa-star active' : 'fa-regular fa-star';
        }
    });
};

/* =========================================
   THE VOGUE REVEAL (Trigger Logic)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Select the headings you want to animate
    const luxuryTitles = document.querySelectorAll('.section-title, .history-content h2, .hero-content h1');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Wait 200ms then slide up
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, 200);
                observer.unobserve(entry.target); // Run only once
            }
        });
    }, { threshold: 0.1 });

    luxuryTitles.forEach(title => {
        // Only wrap if not already wrapped
        if (!title.querySelector('.reveal-mask')) {
            const originalText = title.innerText;
            // Wrap text in the mask
            title.innerHTML = `
                <span class="reveal-mask">
                    <span class="reveal-text">${originalText}</span>
                </span>
            `;
            observer.observe(title);
        }
    });
});