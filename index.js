function getProducts() {
  const cartProducts = localStorage.getItem("cartItems");
  return cartProducts ? JSON.parse(cartProducts) : [];
}
const desertsBoxEl = document.getElementById("desertsBox");
const cartItemsEl = document.getElementById("cartItems");
const emptyCartBoxEl = document.querySelector(".emptyCartBox");
const cartDataEl = document.getElementById("cartData");
let products = [];
async function fetchProducts() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();
    products = data;
    initApp();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
// saveProducts(products);
function saveProducts(product) {
  localStorage.setItem("cartItems", JSON.stringify(product));
}

let listCards = [];
function initApp() {
  products.map((desert, index) => {
    const productHTML = ` 
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
    desertsBoxEl.innerHTML += productHTML;
  });
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
  const orderTotalElement = document.getElementById("orderTotal");
  const cartStatusElement = document.getElementById("cartSatus");
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
}
function initCart() {
  const savedCart = getProducts();
  if (savedCart) {
    listCards = savedCart;
    reloadProducts();
  }
}
initCart();
fetchProducts();
const cartItem = getProducts();
console.log(cartItem);
function reloadCartProducts() {
  const cartData = document.getElementById("cartItemsInfo");
  let count = 0;
  let totalPrice = 0;
  cartItem.forEach((item) => {
    if (item) {
      totalPrice += item.price * item.quantity;
      count += item.quantity;
      cartData.innerHTML += displayCart(item);
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
            <img src = ${item.image.desktop} alt= "cart Image"/>
              <div class="confirmCartText">
              <span class="productName">${item.category}</span>       
              <div class="cartPrice">
                  <span class="count">${item.quantity}x</span>
                    <span class="price">@ $${item.price.toFixed(2)}</span>
                </div>                      
              </div>
              </div>  
              <p class="totalPrice">  <span>$${(
                item.price * item.quantity
              ).toFixed(2)}</span></p>          
    </div>    
  </div>`;
}
document.getElementById("orderBtn").addEventListener("click", () => {
  document.getElementById("confirmOrderModal").style.display = "flex";
});
reloadCartProducts();
window.addEventListener("click", (e) => {
  if (e.target == document.getElementById("confirmOrderModal")) {
    document.getElementById("confirmOrderModal").style.display = "none";
  }
});
document.getElementById("cancelBtn").addEventListener("click", () => {
  document.getElementById("confirmOrderModal").style.display = "none";
});
