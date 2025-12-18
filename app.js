// js/app.js - SIMPLIFIED VERSION

// --- 1. CORE STATE MANAGEMENT ---
const CART_KEY = 'km_cart';
const WISHLIST_KEY = 'km_wishlist';
const TAX_RATE = 0.08;
const PROCESSING_FEE = 995;

// Initialize state
let cart = [];
let wishlist = [];

// Load from localStorage
try {
    const cartData = localStorage.getItem(CART_KEY);
    const wishlistData = localStorage.getItem(WISHLIST_KEY);
    
    cart = cartData ? JSON.parse(cartData) : [];
    wishlist = wishlistData ? JSON.parse(wishlistData) : [];
} catch (error) {
    console.error('Error loading from localStorage:', error);
    cart = [];
    wishlist = [];
}

// --- 2. CART FUNCTIONS ---
const addToCart = (productId, quantity = 1) => {
    // Check if carProducts is available
    if (typeof carProducts === 'undefined') {
        console.error('carProducts not loaded');
        return false;
    }
    
    const product = carProducts.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        return false;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            quantity: quantity,
            price: product.price,
            name: product.name,
            image: product.images[0]
        });
    }
    
    saveToLocalStorage(CART_KEY, cart);
    
    // Update UI if function exists
    if (typeof updateCartDisplay === 'function') {
        updateCartDisplay();
    }
    
    return true;
};

const removeFromCart = (productId) => {
    const initialLength = cart.length;
    cart = cart.filter(item => item.id !== productId);
    
    if (cart.length !== initialLength) {
        saveToLocalStorage(CART_KEY, cart);
        
        if (typeof updateCartDisplay === 'function') {
            updateCartDisplay();
        }
        
        return true;
    }
    
    return false;
};

const calculateCartTotals = () => {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + PROCESSING_FEE;
    
    return {
        subtotal: Math.round(subtotal),
        tax: Math.round(tax),
        processingFee: PROCESSING_FEE,
        total: Math.round(total)
    };
};

// --- 3. WISHLIST FUNCTIONS ---
const toggleWishlist = (productId) => {
    const index = wishlist.indexOf(productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(productId);
    }
    
    saveToLocalStorage(WISHLIST_KEY, wishlist);
    
    if (typeof updateWishlistIcons === 'function') {
        updateWishlistIcons(productId);
    }
    
    return !(index > -1); // Return true if added, false if removed
};

// --- 4. PRODUCT FILTERING ---
const filterProducts = (searchTerm, filters, sortBy) => {
    // Check if carProducts is available
    if (typeof carProducts === 'undefined') {
        console.error('carProducts not loaded');
        return [];
    }
    
    let results = [...carProducts];
    
    // Search filter
    if (searchTerm) {
        const lowerCaseSearch = searchTerm.toLowerCase();
        results = results.filter(p => 
            p.name.toLowerCase().includes(lowerCaseSearch) ||
            p.brand.toLowerCase().includes(lowerCaseSearch) ||
            p.model.toLowerCase().includes(lowerCaseSearch)
        );
    }
    
    // Attribute filters
    for (const key in filters) {
        const value = filters[key];
        if (value && value !== 'all' && value !== '' && key !== 'minPrice' && key !== 'maxPrice') {
            results = results.filter(p => p[key] === value);
        }
    }
    
    // Price range filter
    const minP = filters.minPrice || 0;
    const maxP = filters.maxPrice || Infinity;
    results = results.filter(p => p.price >= minP && p.price <= maxP);
    
    // Sorting
    switch (sortBy) {
        case 'price-asc':
            results.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            results.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
        default:
            results.sort((a, b) => b.year - a.year);
            break;
    }
    
    return results;
};

// --- 5. UTILITY FUNCTIONS ---
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

const calculateLoanPayment = (principal, annualRate, years) => {
    if (principal <= 0 || years <= 0) {
        return 0;
    }
    
    const monthlyRate = annualRate / 12;
    const numberOfPayments = years * 12;
    
    if (monthlyRate === 0) {
        return principal / numberOfPayments;
    }
    
    const factor = Math.pow(1 + monthlyRate, numberOfPayments);
    const monthlyPayment = principal * (monthlyRate * factor) / (factor - 1);
    
    return monthlyPayment;
};

const saveToLocalStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving ${key}:`, error);
    }
};

// --- 6. MAKE FUNCTIONS AVAILABLE GLOBALLY ---
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.calculateCartTotals = calculateCartTotals;
window.toggleWishlist = toggleWishlist;
window.filterProducts = filterProducts;
window.formatCurrency = formatCurrency;
window.calculateLoanPayment = calculateLoanPayment;
window.CART_KEY = CART_KEY;
window.WISHLIST_KEY = WISHLIST_KEY;
window.TAX_RATE = TAX_RATE;
window.PROCESSING_FEE = PROCESSING_FEE;

// Export cart and wishlist for ui.js to access
window.getCart = () => [...cart];
window.getWishlist = () => [...wishlist];

console.log('App.js loaded successfully');