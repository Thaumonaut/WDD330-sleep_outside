const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  const json = await res.json()
  if (res.ok) {
    return json;
  } else {
    throw {name: "servicesError", messages: json};
  }
}

export default class ExternalServices {
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(order) {
    const options = {
      method: "POST",
      Headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    }

    return await fetch(baseURL + "checkout/", options).then(convertToJson)
  }

  async findProductById(id) {
    const res = await fetch(`${baseURL}product/${id}`)
    const data = await convertToJson(res)
    const product = data.Result
    return product
  }
}
