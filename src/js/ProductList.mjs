import { renderListWithTemplate } from "./utils.mjs"

const productCardTemplate = function(product) {
  return `<li class="product-card">
            <a href="/product_pages/?product=${product.Id}">
              <img src="${product.Images.PrimaryMedium}" alt="${product.NameWithoutBrand}" />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.Name}</h2>
              <p class="product-card__price">${product.ListPrice}</p>
            </a>
          </li>`
}

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category
    this.dataSource = dataSource
    this.listElement = listElement
  }

  renderList(list) {
    const filteredList = list.filter((p) => p.Id != "989CG" && p.Id != "880RT")
    renderListWithTemplate(productCardTemplate, this.listElement, filteredList)
  }

  async init() {
    const list = await this.dataSource.getData(this.category)
    this.renderList(list)
  }
}