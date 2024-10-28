// Utility functions
function getProducts() {
  const cartProducts = localStorage.getItem("cartItems");
  return cartProducts ? JSON.parse(cartProducts) : [];
}

function saveProducts(products) {
  localStorage.setItem("cartItems", JSON.stringify(products));
}

// DOM elements
const desertsBoxEl = document.getElementById("desertsBox");
const cartItemsEl = document.getElementById("cartItems");
const emptyCartBoxEl = document.querySelector(".emptyCartBox");
const cartDataEl = document.getElementById("cartData");
const orderTotalElement = document.getElementById("orderTotal");
const cartStatusElement = document.getElementById("cartSatus");
const confirmOrderModal = document.getElementById("confirmOrderModal");
const cartItemsInfoEl = document.getElementById("cartItemsInfo");
const orderBtn = document.getElementById("orderBtn");
const cancelBtn = document.getElementById("cancelBtn");

let products = [];
let listCards = [];

// Fetch products data
async function fetchProducts() {
  try {
    const response = await fetch("./data.json");
    products = await response.json();
    initApp();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Initialize the application
function initApp() {
  desertsBoxEl.innerHTML = products
    .map((desert, index) => generateProductHTML(desert, index))
    .join("");
}

function generateProductHTML(desert, index) {
  return `
    <div class="desertCard">
      <img src="${desert.image.desktop}" alt="${desert.name}">
      <div class="desert-data">
        <span>${desert.name}</span>
        <span>${desert.category}</span>
        <span>$${desert.price.toFixed(2)}</span>
      </div>
      <button onclick="addToCart(${index})" class="addToCart">
        <img src="/assets/images/icon-add-to-cart.svg" alt="cartIcon">
        <span>Add To Cart</span>
      </button>
    </div>`;
}

function addToCart(productId) {
  if (!listCards[productId]) {
    listCards[productId] = { ...products[productId], quantity: 1 };
  } else {
    listCards[productId].quantity += 1;
  }
  saveProducts(listCards);
  reloadProducts();
}

function generateCartItemHTML(item, index) {
  return `
    <div class="cart">
      <p class="productName">${item.category}</p>
      <div class="cartContent">
        <div>
          <span class="count">${item.quantity}x</span>
          <p>
            <span>@ $${item.price.toFixed(2)}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span> 
          </p>
        </div>
        <p class="closeIcon" onclick="removeItem(${index})">
          <img src="./assets/images/icon-remove-item.svg" alt="removeIcon"/>
        </p>
      </div>
    </div>`;
}

function updateCartDisplay(count, totalPrice) {
  orderTotalElement.textContent = `$${totalPrice.toLocaleString()}`;
  cartStatusElement.textContent = count;
  cartDataEl.style.display = count > 0 ? "block" : "none";
  emptyCartBoxEl.style.display = count > 0 ? "none" : "block";
}

function reloadProducts() {
  let count = 0;
  let totalPrice = 0;
  cartItemsEl.innerHTML = "";
  listCards.forEach((item, index) => {
    if (item) {
      totalPrice += item.price * item.quantity;
      count += item.quantity;
      cartItemsEl.innerHTML += generateCartItemHTML(item, index);
    }
  });
  updateCartDisplay(count, totalPrice);
  saveProducts(listCards);
}

function removeItem(productId) {
  listCards[productId] = null;
  reloadProducts();
  saveProducts(listCards);
}

function initCart() {
  const savedCart = getProducts();
  if (savedCart) {
    listCards = savedCart;
    reloadProducts();
  }
}
// Initialize cart and fetch products
initCart();
fetchProducts();
console.log(listCards)
function reloadCartProducts() {
  let count = 0;
  let totalPrice = 0;
  cartItemsInfoEl.innerHTML = "";
listCards.forEach((item) => {
    if (item) {
      totalPrice += item.price * item.quantity;
      count += item.quantity;
      cartItemsInfoEl.innerHTML += displayCart(item);
    }
  });
  document.querySelector(
    ".OrderTotalPriceValue"
  ).textContent = `$${totalPrice.toFixed(2)}`;
}
function displayCart(item) {
  return `
    <div>
      <div class="confirmCartItems">
        <div class="confirmCartImg">
          <img src="${item.image.desktop}" alt="cart Image"/>
          <div class="confirmCartText">
            <span class="productName">${item.category}</span>       
            <div class="cartPrice">
              <span class="count">${item.quantity}x</span>
              <span class="price">@ $${item.price.toFixed(2)}</span>
            </div>                      
          </div>
        </div>  
        <p class="totalPrice">
          <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </p>          
      </div>    
    </div>`;
}
// Event Listeners
orderBtn.addEventListener("click", () => {
  confirmOrderModal.style.display = "flex";
});

window.addEventListener("click", (e) => {
  if (e.target === confirmOrderModal) {
    confirmOrderModal.style.display = "none";
  }
});

cancelBtn.addEventListener("click", () => {
  confirmOrderModal.style.display = "none";
});

// Reload the cart products on page load
reloadCartProducts();
