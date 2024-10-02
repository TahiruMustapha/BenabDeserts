const url = "./data.json";
const cartDataEl = document.getElementById("cartData");
let cart = [];
const addToCart = function (productId) {
  const checkProductExixtence = cart.findIndex(
    (value) => value.product_id == productId
  );
  if (cart.length <= 0) {
    cart = [
      {
        product_id: productId,
        quantity: 1,
      },
    ];
  } else if (checkProductExixtence < 0) {
    cart.push({
      product_id: productId,
      quantity: 1,
    });
  } else {
    cart[checkProductExixtence].quantity =
      cart[checkProductExixtence].quantity + 1;
  }
  // console.log(cart);
  // addProductToCart();
};
function addProductToCart() {
  cart.map((item) => {
    const products = `<div class="cart">
              <p class="productName">Classic Tiramisu</p>
              <div class="cartContent">
                <div>
                  <span class="count">1x</span>
                  <p>
                    <span> <span>@</span> $4.50</span> <span>$10.20</span>
                  </p>
                </div>
                <p class="closeIcon">
                  <img
                  src="./assets/images/icon-remove-item.svg"
                  alt="removeIcon"
                />
                </p> 
              </div>
            </div>`;
    cartDataEl.innerHTML += products;
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const desertsBoxEl = document.getElementById("desertsBox");
  async function getData(url) {
    let data = await fetch(url);
    let response = await data.json();
    response.map((desert, index) => {
      const products = ` <div class="desertCard">
              <img src= ${desert.image.desktop} alt= ${desert.name}>
              <div class="desert-data">
                <span>${desert.name}</span>
                <span>${desert.category}</span>
                <span>${desert.price.toFixed(2)}</span>
              </div>
              <button onclick="addToCart(${index})"  class="addToCart">
                <img src="/assets/images/icon-add-to-cart.svg" alt="cartIcon">
                <span>Add To Cart</span>
              </button>
            </div>`;
      desertsBoxEl.innerHTML += products;
    });
  }

  getData(url);
  // addProductToCart();
});
