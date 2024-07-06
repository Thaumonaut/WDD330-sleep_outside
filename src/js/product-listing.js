import ProductData from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParams, Capitalize } from "./utils.mjs";

let category = getParams("category") || "tents";

const dataSource = new ProductData(category);
const listElement = document.querySelector(".product-list");
const ProductListing = new ProductList(category, dataSource, listElement);

loadHeaderFooter();
ProductListing.init();

function Init() {
  const h2 = document.querySelector(".products h2");
  h2.textContent = `Top Products: ${Capitalize(category)}`;

  const icon = document.querySelector(`[data-category=${category}]`);
  icon.classList.add("selected");
}

Init();
