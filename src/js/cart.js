import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  document.querySelectorAll(".cart-remove").forEach(element => {
    element.addEventListener("click", handleCartRemove)
  });

  document.querySelectorAll(".cart-card__quantity input").forEach(element => {
    element.addEventListener("change", handleQuantityChange)
  })
}

function handleCartRemove(elem) {
  const button = elem.srcElement;
  const index = button.getAttribute("data-index")

  const cartLS = getLocalStorage("so-cart") || [];
  cartLS.splice(index, 1);
  setLocalStorage("so-cart", cartLS)
  renderCartContents();
}

function handleQuantityChange(elem) {
  const index = elem.target.dataset.index
  const cartLS = getLocalStorage("so-cart");
  if(parseInt(elem.target.value) < 1) {
    if(!window.confirm("Do you want to remove this item?")) {
      cartLS[index].quantity = 1
      elem.target.value = 1;
      return;
    }
    handleCartRemove(elem) 
    return;
  }

  cartLS[index].quantity = parseInt(elem.target.value)

  setLocalStorage("so-cart", cartLS)
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="cart-card__quantity">
    <label for="quantity">qty: </label>
    <input data-index=${index} type="number" id="quantity" value="${item.quantity}"/>
  </div>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="cart-remove" data-index=${index}></button>
</li>`;

  return newItem;
}
renderCartContents();
loadHeaderFooter();
