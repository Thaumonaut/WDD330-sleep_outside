import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const ProductListing = new ProductList("tent", dataSource, listElement);

loadHeaderFooter();
ProductListing.init();
