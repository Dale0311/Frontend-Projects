import {
  cart,
  deleteItemInCart,
  getTotalAmountInCart,
  updatedCartItems,
} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utilities.js';

const itemsInCart = [];
const totalAmountInCart = getTotalAmountInCart();
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
});

function generateCheckoutCards() {
  let toRender = '';
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
    </div>`;
    // toRender += `
    //     <div class="cart-item-container cart-item-${item.id}">
    //         <div class="delivery-date">Delivery date: Tuesday, June 21</div>
    //         <div class="cart-item-details-grid">
    //             <img
    //             class="product-image"
    //             src="${item.image}"
    //             />

    //             <div class="cart-item-details">
    //               <div class="product-name">
    //                   ${item.name}
    //               </div>
    //               <div class="product-price">$${formatCurrency(
    //                 item.priceCents
    //               )}</div>
    //               <div class="product-quantity">
    //                   <span> Quantity: <span class="quantity-label">${
    //                     item.quantity
    //                   }</span> </span>
    //                   <span class="update-quantity-link link-primary">
    //                   Update
    //                   </span>
    //                   <span data-delete-id="${
    //                     item.id
    //                   }" class="delete-quantity-link link-primary">
    //                   Delete
    //                   </span>
    //               </div>
    //             </div>

    //             <div class="delivery-options">
    //               <div class="delivery-options-title">
    //                   Choose a delivery option:
    //               </div>
    //               <label>
    //                 <div class="delivery-option">
    //                     <input
    //                     type="radio"
    //                     checked
    //                     class="delivery-option-input"
    //                     name="delivery-option-${item.id}"
    //                     />
    //                     <div>
    //                       <div class="delivery-option-date">Tuesday, June 21</div>
    //                       <div class="delivery-option-price">FREE Shipping</div>
    //                     </div>
    //                 </div>
    //               </label>
    //             <label >
    //               <div class="delivery-option">
    //                 <input
    //                   type="radio"
    //                   class="delivery-option-input"
    //                   name="delivery-option-${item.id}"
    //                   />
    //                   <div>
    //                     <div class="delivery-option-date">Wednesday, June 15</div>
    //                     <div class="delivery-option-price">$4.99 - Shipping</div>
    //                   </div>
    //               </div>
    //             </label>
    //             <label>
    //               <div class="delivery-option">
    //                   <input
    //                   type="radio"
    //                   class="delivery-option-input"
    //                   name="delivery-option-${item.id}"
    //                   />
    //                   <div>
    //                   <div class="delivery-option-date">Monday, June 13</div>
    //                   <div class="delivery-option-price">$9.99 - Shipping</div>
    //                   </div>
    //               </div>
    //             </label>
    //             </div>
    //         </div>
    //     </div>
    // `;
  });

  return toRender;
}

// elements
const checkoutCartItemsElements = document.querySelectorAll(
  '.checkout-current-items-count'
);
const totalItemsAmountElement = document.querySelector('.total-items-in-cart');

const toRenderCards = generateCheckoutCards();
const currentCartCount = updatedCartItems();

// rendering
document.querySelector('.order-summary').innerHTML = toRenderCards;
checkoutCartItemsElements.forEach((e) => (e.innerHTML = currentCartCount));
totalItemsAmountElement.innerHTML = `$${totalAmountInCart}`;

const deleteBtns = document.querySelectorAll('.delete-quantity-link');

deleteBtns.forEach((btn) =>
  btn.addEventListener('click', () => {
    // reference items, elements, data
    const id = btn.dataset.deleteId;
    const toDeletElement = document.querySelector(`.cart-item-${id}`);
    const currentCartCount = updatedCartItems();

    // update data
    deleteItemInCart(id);
    const updatedTotalAmountInCart = getTotalAmountInCart();

    // update UI
    totalItemsAmountElement.innerHTML = `$${updatedTotalAmountInCart}`;
    checkoutCartItemsElements.forEach((e) => (e.innerHTML = currentCartCount));
    toDeletElement.remove();
  })
);
