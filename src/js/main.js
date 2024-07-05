import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ExternalServices("tents");
const listElement = document.querySelector(".product-list");
const ProductListing = new ProductList("tents", dataSource, listElement);

loadHeaderFooter();
ProductListing.init();
