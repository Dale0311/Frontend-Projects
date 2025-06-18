import { cart, deleteItemInCart, updatedCartItems } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utilities.js';

function generateCheckoutCards() {
  const itemsInCart = [];

  cart.forEach((item) => {
    const existProduct = products.find((product) => product.id === item.id);
    if (existProduct) {
      const { name, id, image, priceCents } = existProduct;
      itemsInCart.push({
        name,
        id,
        image,
        priceCents,
        quantity: item.quantity,
      });
    }
    // const itemsInCart = [];

    // cart.forEach((item) => {
    //   const existProduct = products.find((product) => product.id === item.id);
    //   if (existProduct) {
    //     const { name, id, image, priceCents } = existProduct;
    //     itemsInCart.push({
    //       name,
    //       id,
    //       image,
    //       priceCents,
    //       quantity: item.quantity,
    //     });
    //   }
  });

  return itemsInCart.map((item) => {
    return `
        <div class="cart-item-container cart-item-${item.id}">
            <div class="delivery-date">Delivery date: Tuesday, June 21</div>
            <div class="cart-item-details-grid">
                <img
                class="product-image"
                src="${item.image}"
                />

                <div class="cart-item-details">
                  <div class="product-name">
                      ${item.name}
                  </div>
                  <div class="product-price">$${formatCurrency(
                    item.priceCents
                  )}</div>
                  <div class="product-quantity">
                      <span> Quantity: <span class="quantity-label">${
                        item.quantity
                      }</span> </span>
                      <span class="update-quantity-link link-primary">
                      Update
                      </span>
                      <span data-delete-id="${
                        item.id
                      }" class="delete-quantity-link link-primary">
                      Delete
                      </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                      Choose a delivery option:
                  </div>
                  <label>
                    <div class="delivery-option">
                        <input
                        type="radio"
                        checked
                        class="delivery-option-input"
                        name="delivery-option-${item.id}"
                        />
                        <div>
                          <div class="delivery-option-date">Tuesday, June 21</div>
                          <div class="delivery-option-price">FREE Shipping</div>
                        </div>
                    </div>
                  </label>
                <label >
                  <div class="delivery-option">
                    <input
                      type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${item.id}"
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
                      />
                      <div>
                      <div class="delivery-option-date">Monday, June 13</div>
                      <div class="delivery-option-price">$9.99 - Shipping</div>
                      </div>
                  </div>
                </label>
                </div>
            </div>
        </div>
    `;
  });
}

// elements
const checkoutCartItemsElement = document.querySelector(
  '.checkout-current-items-count'
);

const toRenderCards = generateCheckoutCards();
const currentCartCount = updatedCartItems();
document.querySelector('.order-summary').innerHTML = toRenderCards;
checkoutCartItemsElement.innerHTML = currentCartCount;

const deleteBtns = document.querySelectorAll('.delete-quantity-link');

deleteBtns.forEach((btn) =>
  btn.addEventListener('click', () => {
    const id = btn.dataset.deleteId;
    deleteItemInCart(id);
    const toDeletElement = document.querySelector(`.cart-item-${id}`);
    const currentCartCount = updatedCartItems();
    checkoutCartItemsElement.innerHTML = currentCartCount;
    toDeletElement.remove();
  })
);
