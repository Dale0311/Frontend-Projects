import { addToCart, updatedCartItems } from '../data/cart.js';
import { products } from '../data/products.js';
import { toggleAddedToCartElement } from './utilities.js';

const productSectionElement = document.querySelector('.products-grid');
function generateProductCards() {
  return products.map((product) => {
    const starRating = (product.rating.stars * 100) / 10;
    const price = product.priceCents / 100;

    return `        
    <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${starRating}.png"
            />
            <div class="product-rating-count link-primary">${product.rating.count}</div>
          </div>

          <div class="product-price">$${price}</div>

          <div class="product-quantity-container">
            <select class="selected-quantity-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart added-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${product.id}">Add to Cart</button>
        </div>`;
  });
}
const toRenderProduct = generateProductCards();
productSectionElement.innerHTML = toRenderProduct;

const addToCartBtns = document.querySelectorAll('.add-to-cart-button');

addToCartBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.productId;
    const quantity = +document.querySelector(`.selected-quantity-${id}`).value;

    toggleAddedToCartElement(id); //show added to cart element when click for 500 ms

    addToCart({ id, quantity });
    const cartItems = updatedCartItems();
    document.querySelector('.cart-quantity').innerHTML = cartItems;
  });
});
