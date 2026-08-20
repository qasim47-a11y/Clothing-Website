// ===============================
// MOBILE MENU
// ===============================

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");
});


// Close mobile menu after clicking link

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {
        navbar.classList.remove("active");
    });

});


// ===============================
// SEARCH
// ===============================

const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {

    searchBox.classList.add("active");
    searchInput.focus();

});

closeSearch.addEventListener("click", () => {

    searchBox.classList.remove("active");
    searchInput.value = "";

    showAllProducts();

});


// Search products

searchInput.addEventListener("input", () => {

    const searchValue = searchInput.value.toLowerCase();

    document.querySelectorAll(".product-card").forEach(card => {

        const productName =
            card.dataset.name.toLowerCase();

        if (productName.includes(searchValue)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});


// ===============================
// CATEGORY FILTER
// ===============================

const filters = document.querySelectorAll(".filter");

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(btn => {
            btn.classList.remove("active");
        });

        filter.classList.add("active");

        const category = filter.dataset.category;

        document.querySelectorAll(".product-card").forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


function showAllProducts() {

    document.querySelectorAll(".product-card").forEach(card => {
        card.style.display = "block";
    });

}


// ===============================
// WISHLIST
// ===============================

const hearts = document.querySelectorAll(".heart");
const wishCount = document.getElementById("wishCount");

let wishlist = 0;

hearts.forEach(heart => {

    heart.addEventListener("click", () => {

        heart.classList.toggle("liked");

        if (heart.classList.contains("liked")) {

            heart.innerHTML = "♥";
            wishlist++;

        } else {

            heart.innerHTML = "♡";
            wishlist--;

        }

        wishCount.textContent = wishlist;

    });

});


// ===============================
// CART
// ===============================

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

let cart = [];


// Open cart

function openCart() {

    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");

}


// Close cart

function closeCartPanel() {

    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");

}


cartBtn.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartPanel);

cartOverlay.addEventListener("click", closeCartPanel);


// Add product to cart

const quickAddButtons =
    document.querySelectorAll(".quick-add");

quickAddButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingProduct =
            cart.find(item => item.name === name);

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        updateCart();

        openCart();

    });

});


// Update cart

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            `<p class="empty-cart">Your cart is empty.</p>`;

    }


    let total = 0;
    let count = 0;


    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div>

                <h4>${item.name}</h4>

                <p>
                    $${item.price.toFixed(2)}
                    ×
                    ${item.quantity}
                </p>

            </div>

            <button
                class="remove-item"
                data-index="${index}"
            >
                ✕
            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = count;

    cartTotal.textContent =
        "$" + total.toFixed(2);


    // Remove cart item

    document.querySelectorAll(".remove-item").forEach(button => {

        button.addEventListener("click", () => {

            const index =
                Number(button.dataset.index);

            cart.splice(index, 1);

            updateCart();

        });

    });

}


// ===============================
// NEWSLETTER
// ===============================

const newsletterForm =
    document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const email =
        newsletterForm.querySelector("input").value;

    alert(
        `Thank you! ${email} has been subscribed.`
    );

    newsletterForm.reset();

});


// ===============================
// CHECKOUT
// ===============================

const checkout =
    document.querySelector(".checkout");

checkout.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    alert(
        "Thank you for shopping with LUXE! Checkout page coming soon."
    );

});


// ===============================
// HEADER SHADOW ON SCROLL
// ===============================

window.addEventListener("scroll", () => {

    const header =
        document.querySelector(".header");

    if (window.scrollY > 30) {

        header.style.boxShadow =
            "0 5px 25px rgba(0,0,0,0.06)";

    } else {

        header.style.boxShadow = "none";

    }

});