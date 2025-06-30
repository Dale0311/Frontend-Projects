import {
  cart,
  deleteItemInCart,
  getTotalAmountInCart,
  updatedCartItems,
} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utilities.js';

// reference data, elements
let allShippingItemConfig = cart.map((item) => ({ id: item.id, fee: 0 }));
const totalAmountInCart = getTotalAmountInCart();
const checkoutCartItemsElements = document.querySelectorAll(
  '.checkout-current-items-count'
);
const totalItemsAmountElement = document.querySelector('.total-items-in-cart');
const shippingElement = document.querySelector('.total-shipping-cart');
const totalBeforeTaxElement = document.querySelector('.total-before-tax');
const estimatedTaxElement = document.querySelector('.estimated-tax');
const orderTotalElement = document.querySelector('.order-total');

const toRenderCards = generateCheckoutCards();

const currentCartCount = updatedCartItems();

// checkout functions
function generateCheckoutCards() {
  let toRender = '';
  const itemsInCart = formatCheckoutCart();

  itemsInCart.forEach((item) => {
    toRender += `
    <div class="cart-item-container cart-item-${item.id}">
      <div class="delivery-date">Delivery date: Tuesday, June 21</div>
      <div class="cart-item-details-grid">
        <img class="product-image" src="${item.image}" />

        <div class="cart-item-details">
          <div class="product-name">${item.name}</div>
          <div class="product-price">$${formatCurrency(item.priceCents)}</div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${item.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary"> Update </span>
            <span
              data-delete-id="${item.id}"
              class="delete-quantity-link link-primary"
            >
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">Choose a delivery option:</div>
          <label>
            <div class="delivery-option">
              <input
                type="radio"
                checked
                class="delivery-option-input"
                name="delivery-option-${item.id}"
                value="0"
              />
              <div>
                <div class="delivery-option-date">Tuesday, June 21</div>
                <div class="delivery-option-price">FREE Shipping</div>
              </div>
            </div>
          </label>
          <label>
            <div class="delivery-option">
              <input
                type="radio"
                class="delivery-option-input"
                name="delivery-option-${item.id}"
                value="499"
              />
              <div>
                <div class="delivery-option-date">Wednesday, June 15</div>
                <div class="delivery-option-price">$4.99 - Shipping</div>
              </div>
            </div>
          </label>
          <label>
            <div class="delivery-option">
              <input
                type="radio"
                class="delivery-option-input"
                name="delivery-option-${item.id}"
                value="999"
              />
              <div>
                <div class="delivery-option-date">Monday, June 13</div>
                <div class="delivery-option-price">$9.99 - Shipping</div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>`;
  });

  return toRender;
}
function setTotalShippingFees() {
  let totalShippingAmount = 0;
  allShippingItemConfig.forEach((item) => (totalShippingAmount += item.fee));
  totalShippingAmount = formatCurrency(totalShippingAmount);

  return totalShippingAmount;
}

function deleteItem(deleteItemElement) {
  // reference items, elements, data
  const id = deleteItemElement.dataset.deleteId;
  const toDeletElement = document.querySelector(`.cart-item-${id}`);

  // update data
  deleteItemInCart(id);
  deleteShippingAndTaxFees(id);
  const currentCartCount = updatedCartItems();
  const currentCartTotalAmount = getTotalAmountInCart();

  // update UI
  checkoutCartItemsElements.forEach((e) => (e.innerHTML = currentCartCount));
  setShippingAndTaxFees();
  totalItemsAmountElement.innerHTML = `$${currentCartTotalAmount}`;
  toDeletElement.remove();
}
function formatCheckoutCart() {
  return cart.map((item) => {
    const existProduct = products.find((product) => product.id === item.id);
    if (existProduct) {
      const { name, id, image, priceCents } = existProduct;
      return {
        name,
        id,
        image,
        priceCents,
        quantity: item.quantity,
      };
    }
  });
}
function setShippingAndTaxFees() {
  const totalInCart = getTotalAmountInCart() * 100;
  const totalShippingAmount = setTotalShippingFees() * 100;
  const totalBeforeTax = totalInCart + totalShippingAmount;

  const estimatedTax = totalBeforeTax * 0.1;

  const orderTotal = estimatedTax + totalBeforeTax;
  // render
  shippingElement.innerHTML = `$${formatCurrency(totalShippingAmount)}`;
  totalBeforeTaxElement.innerHTML = `$${formatCurrency(totalBeforeTax)}`;
  estimatedTaxElement.innerHTML = `$${formatCurrency(estimatedTax)}`;
  orderTotalElement.innerHTML = `$${formatCurrency(orderTotal)}`;
}
function setShippingAndHandlingFees(e) {
  const id = e.name.split('delivery-option-')[1];
  const fee = +e.value;
  allShippingItemConfig = cart.map((item, index) =>
    item.id === id ? { id, fee } : allShippingItemConfig[index]
  );

  setShippingAndTaxFees();
}
function deleteShippingAndTaxFees(id) {
  allShippingItemConfig = allShippingItemConfig.filter(
    (item) => item.id !== id
  );
}

//DOM Manipulation
document.querySelector('.order-summary').innerHTML = toRenderCards;

//reference element after the UI render
const deleteBtns = document.querySelectorAll('.delete-quantity-link');
const shippingInputElements = document.querySelectorAll(
  '.delivery-option-input'
);

// DOM Manipulation
checkoutCartItemsElements.forEach((e) => (e.innerHTML = currentCartCount));
totalItemsAmountElement.innerHTML = `$${totalAmountInCart}`;
setShippingAndTaxFees();

// deleteItem event listener
deleteBtns.forEach((btn) => {
  btn.addEventListener('click', () => deleteItem(btn));
});

shippingInputElements.forEach((e) => {
  e.addEventListener('change', () => setShippingAndHandlingFees(e));
});
