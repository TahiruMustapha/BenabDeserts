const desertsData = [
  {
    img: "./assets/images/image-waffle-desktop.jpg",
    name: "Waffle",
    desc: "Waffle with Berries",
    price: 6.5,
  },
  {
    img: "./assets/images/image-creme-brulee-desktop.jpg",
    name: "Crème Brûlée",
    desc: "Vanilla Bean Crème Brûlée",
    price: 7.0,
  },
  {
    img: "./assets/images/image-macaron-desktop.jpg",
    name: "Macaron",
    desc: "Macaron Mix of Five",
    price: 8.0,
  },
  {
    img: "./assets/images/image-tiramisu-desktop.jpg",
    name: "Tiramisu",
    desc: "Classic Tiramisu",
    price: 5.5,
  },
  {
    img: "./assets/images/image-baklava-desktop.jpg",
    name: " Baklava",
    desc: "Pistachio Baklava",
    price: 4.0,
  },
  {
    img: "./assets/images/image-meringue-desktop.jpg",
    name: " Pie",
    desc: "Lemon Meringue Pie",
    price: 5.0,
  },
  {
    img: "./assets/images/image-cake-desktop.jpg",
    name: " Cake",
    desc: " Red Velvet Cake",
    price: 4.5,
  },
  {
    img: "./assets/images/image-brownie-desktop.jpg",
    name: " Brownie",
    desc: " Salted Caramel Brownie",
    price: 4.5,
  },
  {
    img: "./assets/images/image-panna-cotta-desktop.jpg",
    name: "  Panna Cotta",
    desc: " Vanilla Panna Cotta",
    price: 6.5,
  },
];
// const desertInfo = desertsData.map((deserts) => deserts);
const desertsBoxEl = document.getElementById("desertsBox");

// desertsBoxElContent.className = "desertCard";
// desertsBoxEl.appendChild(desertsBoxElContent);

let cart = [];
//Add to cart
const addToCart = function () {
  e.preventDefault();
  console.log("Add to cart btn clicked!");
};
desertsData.map((desert) => {
  const desertsBoxElContent = document.createElement("div");
  desertsBoxElContent.className = "desertCard";

  // Create and set image element
  const imgEl = document.createElement("img");
  imgEl.src = desert.img;
  imgEl.alt = desert.name;

  // Create the container for desert data
  const desertDataEl = document.createElement("div");
  desertDataEl.className = "desert-data";

  // Create elements for name and description
  const desertName = document.createElement("span");
  desertName.textContent = desert.name;

  const desertDesc = document.createElement("span");
  desertDesc.textContent = desert.desc;

  const desertPrice = document.createElement("span");
  desertPrice.textContent = `$ ${desert.price.toFixed(2)}`;

  // Create the add to cart button
  const addToCartEl = document.createElement("button");
  const cartContent = document.createElement("span");
  cartContent.textContent = "Add To Cart";
  addToCartEl.className = "addToCart";

  // Create and set the cart image
  const cartImg = document.createElement("img");
  cartImg.src = "/assets/images/icon-add-to-cart.svg";

  // Append the cart image to the button
  addToCartEl.appendChild(cartImg);
  addToCartEl.appendChild(cartContent);

  // Append the name and description to the data container
  desertDataEl.appendChild(desertPrice);
  desertDataEl.appendChild(desertName);
  desertDataEl.appendChild(desertDesc);

  // Append everything to the main desert card container
  desertsBoxElContent.appendChild(imgEl);
  desertsBoxElContent.appendChild(desertDataEl);
  desertsBoxElContent.appendChild(addToCartEl);

  desertsBoxEl.innerHTML += desertsBoxElContent.outerHTML;
});
