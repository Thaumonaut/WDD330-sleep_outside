import { loadHeaderFooter, qs } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

qs("#zip").addEventListener("blur", myCheckout.CalcSummary.bind(myCheckout));

document.forms["checkout"].addEventListener("submit", (evt) => {
  evt.preventDefault();
  const form = document.forms[0];
  const isValid = form.checkValidity();
  form.reportValidity();
  if (isValid) myCheckout.checkout();
});
