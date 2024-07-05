import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage, qs } from "./utils.mjs";

const services = new ExternalServices()


export default class CheckoutProccess {
  constructor (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = []
    this.subtotal = "0.00";
    this.shipping = 0.00;
    this.tax = "0.00";
    this.orderTotal = "0.00";
  }
  init() {
    this.list = getLocalStorage(this.key)    
    this.CalcItemTotal()
  }

  CalcItemTotal() {
    this.subtotal = this.list.reduce((sub, item) => sub + (item.ListPrice * item.quantity), 0)
    this.orderTotal = parseFloat(this.tax) + parseFloat(this.shipping) + parseFloat(this.subtotal)
    this.DisplaySummary();
  }
  
  CalcSummary() {
    let count = this.list.reduce((acc, item) => acc + item.quantity, 0)
    if(count > 0) this.shipping = (count - 1) * 2 + 10
    this.tax = (this.subtotal * .06).toFixed(2)

    this.orderTotal = parseFloat(this.tax) + parseFloat(this.shipping) + parseFloat(this.subtotal)

    this.DisplaySummary()
  }
  
  DisplaySummary() {
    const tax = qs("#co-tax")
    const shipping = qs("#co-shipping")
    const total = qs("#co-total")
    const itemTotal = qs("#co-subtotal")

    itemTotal.innerHTML = `${this.subtotal}`
    tax.innerHTML = `${this.tax}`
    shipping.innerHTML = `${this.shipping.toFixed(2)}`
    total.innerHTML = `${this.orderTotal}`
  }

  async checkout() {
    const form = document.forms["checkout"]

    const json = formDataToJSON(form)
    json["orderDate"] = new Date()
    json["orderTotal"] = this.orderTotal.toFixed(2)
    json["tax"] = this.tax
    json["shipping"] = this.shipping
    json["items"] = packageItems(this.list)

    console.log(json)

    try {
      const res = await services.checkout(json)
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }
}
function formDataToJSON(formElement) {
  const formData = new FormData(formElement)
  const json = {};

  formData.forEach((val, key) => {
    json[key] = val;
  })

  return json
}

function packageItems(items) {
  return items.map(item => ({
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: item.quantity
    })
  )
}

const checkout = new CheckoutProccess("so-cart", "form")
checkout.init();