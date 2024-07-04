import { loadHeaderFooter, qs, getLocalStorage } from "./utils.mjs";
loadHeaderFooter();

let cart = getLocalStorage("so-cart")

function init() {
  const zipcode = qs("#zcode")
  zipcode.addEventListener("change", FillOrderSummary)

  DisplaySubtotal()
}

function CalcSubtotal() {
  let subtotal = 0
  let reducedCart = cart.reduce((sub, item) => sub + (item.ListPrice * item.quantity), subtotal)
  
  return reducedCart
}

function DisplaySubtotal() {
  const subtotal = qs("#co-subtotal")
  subtotal.innerHTML = `$${CalcSubtotal()}`
}

function FillOrderSummary() {
  const tax = qs("#co-tax")
  const shipping = qs("#co-shipping")
  const total = qs("#co-total")
  
  let shippingCost = 0
  let totalItemsToShip = cart.reduce((acc, item) => acc + item.quantity, 0)
  if(totalItemsToShip > 0) shippingCost = (totalItemsToShip - 1) * 2 + 10

  const subtotal = CalcSubtotal()
  
  const salesTax = parseFloat((subtotal * .06).toFixed(2))
  
  tax.innerHTML = `$${salesTax}`
  shipping.innerHTML = `$${shippingCost}`
  total.innerHTML = `$${subtotal + shippingCost + salesTax}`
}

CalcSubtotal()
init()