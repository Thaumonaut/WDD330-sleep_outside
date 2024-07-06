import { getParams } from "./utils.mjs";
import ProductData from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParams("product");
const dataSource = new ProductData();

const product = new ProductDetails(productId, dataSource);
product.init();
