import { getLocalStorage, setLocalStorage } from "./utils.mjs"

export default class ProductDetails {
  constructor(productId, dataSource){
    this.productId = productId
    this.product = {}
    this.dataSource = dataSource
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId)
    this.renderProductDetails();
    document.getElementById("addToCart")
      .addEventListener("click", () => this.addToCart())
  }
  addToCart(){
    let currentCart = getLocalStorage("so-cart") || [];
    currentCart.push(this.product);
    setLocalStorage("so-cart", currentCart)
  }
  renderProductDetails(){
    const productHTML = `
        <h3>${this.product["Name"]}</h3>

        <h2 class="divider">${this.product["NameWithoutBrand"]}</h2>

        <img
          class="divider"
          src="${this.product["Image"]}"
          alt="Talus Tent - 4-Person, 3-Season"
        />

        <p class="product-card__price">$${this.product["FinalPrice"]}</p>

        <p class="product__color">${this.product["Colors"][0]["ColorName"]}</p>

        <p class="product__description">${this.product["DescriptionHtmlSimple"]}</p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.productId}">Add to Cart</button>
        </div>
      `
    const detailsHTML = document.querySelector(".product-detail")
    detailsHTML.innerHTML = productHTML
  }
}