import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  document.querySelectorAll(".cart-remove").forEach(element => {
    element.addEventListener("click", handleCartRemove)
  });
}

function handleCartRemove(elem) {
  const button = elem.srcElement;
  const index = button.getAttribute("data-index")

  const cartLS = getLocalStorage("so-cart") || [];
  cartLS.splice(index, 1);
  setLocalStorage("so-cart", cartLS)
  renderCartContents();
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="cart-remove" data-index=${index}>x</button>
</li>`;

  return newItem;
}

renderCartContents();
