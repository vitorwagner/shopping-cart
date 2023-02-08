// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// const saveCartItems = require("./helpers/saveCartItems");

// const getSavedCartItems = require("./helpers/getSavedCartItems");

// const saveCartItems = require("./helpers/saveCartItems");

// const getSavedCartItems = require("./helpers/getSavedCartItems");

// const saveCartItems = require("./helpers/saveCartItems");

// const { fetchItem } = require("./helpers/fetchItem");

// const { fetchProducts } = require("./helpers/fetchProducts");

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

const totalPrice = async (price, remove) => {
  const totalElement = document.querySelector('.total-price');
  const currTotal = parseFloat(totalElement.innerText);
  const newTotal = Math.round((!remove ? currTotal + price : currTotal - price) * 100) / 100;
  totalElement.innerText = newTotal;
};

const cartItemClickListener = (event) => {
  const item = event.target;
  totalPrice(item.price, true);
  item.remove();
  const storage = JSON.parse(localStorage.getItem('cartItems')) || [];
  localStorage.setItem('cartItems', 
  JSON.stringify(storage.filter((cartItem) => cartItem.id !== item.id)));
};

 const createCartItemElement = ({ id, title, price }) => {
  const cart = document.querySelector('.cart__items');
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = id;
  li.price = price;
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  cart.appendChild(li);
  totalPrice(price);
};

const fetchClickedItem = async (event) => {
  const button = event.target;
  const shopItem = button.parentElement;
  const id = shopItem.querySelector('.item_id').innerText;
  const fetchedItem = await fetchItem(id);
  console.log(fetchedItem);
  createCartItemElement(fetchedItem);
  saveCartItems(fetchedItem);
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  const button = (createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  button.addEventListener('click', fetchClickedItem);
  section.appendChild(button);
  return section;
};

async function loadProducts() {
  const itemsList = document.querySelector('.items');
  const products = await fetchProducts('computador');
  products.results
    .forEach((product) => itemsList.appendChild(createProductItemElement(product)));
  document.querySelector('.loading').remove();
}

const clearCart = (event) => {
  const item = event.target;
  const list = item.parentElement.querySelector('.cart__items');
  list.innerHTML = '';
  const totalElement = document.querySelector('.total-price');
  totalElement.innerText = 0;
};

const emptyCart = () => {
  const emptyButton = document.querySelector('.empty-cart');
  emptyButton.addEventListener('click', clearCart);
};

const loading = () => {
  const itemsList = document.querySelector('.items');
  const loadingMessage = document.createElement('p');
  loadingMessage.className = 'loading';
  loadingMessage.textContent = 'carregando...';
  itemsList.appendChild(loadingMessage);
};

const loadSavedCart = () => {
  if (localStorage.getItem('cartItems') !== null) {
  const savedCart = getSavedCartItems();
  for (const item of savedCart) {
    createCartItemElement(item);
  }
  // savedCart.forEach(async (id) => {
  //   const fetchedItem = await fetchItem(id);
  //   createCartItemElement(fetchedItem);
  }
};
// Problemas no forEach com async: https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop 
// Fix await loop lint: https://stackoverflow.com/questions/52152842/fix-no-await-in-loop-lint-warning

// /**
//  * Função que recupera o ID do produto passado como parâmetro.
//  * @param {Element} product - Elemento do produto.
//  * @returns {string} ID do produto.
//  */
// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

window.onload = async () => {
  loading();
  await loadProducts();
  emptyCart();
  loadSavedCart();
 };
