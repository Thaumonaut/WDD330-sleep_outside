// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParams(params) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get(params)
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if(clear) parentElement.innerHTML = ""
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template.innerHTML)
  if(callback) callback(data)
}

export async function loadHeaderFooter() {
  //load header footer from partials
  const footerTemplate = (await loadTemplate("/partials/footer.html"))
  const headerTemplate = (await loadTemplate("/partials/header.html"))
  // grab the header/footer from DOM
  const footerParent = qs("#main-footer")
  const headerParent = qs("#main-header")
  // render the header/footer
  renderWithTemplate(footerTemplate, footerParent)
  renderWithTemplate(headerTemplate, headerParent)
}

export async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

function convertToText(res) {
  if (res.ok) {
    return res.text();
  } else {
    throw new Error("Bad Response");
  }
}

export function Capitalize(text) {
  const textSplit = text.split("")
  let textSpaces = textSplit.map((char, index) => {if(char == " " || char == "_" || char == "-") return index}).filter(x=>x);
  textSplit[0] = textSplit[0].toUpperCase();
  textSpaces.forEach(spaceIndex => {
    textSplit[spaceIndex + 1] = textSplit[spaceIndex + 1].toUpperCase()
  });
  return textSplit.join("")
}