const productsContainerElement = document.querySelector('.products-grid');
function renderProduct(products) {
  return products.map((product) => {
    const price = product.priceCents / 100;
    const convertedToWholeNumber = (product.rating.stars * 100) / 10;
    const starRatingImg = `images/ratings/rating-${convertedToWholeNumber}.png`;
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
              src=${starRatingImg}
            />
            <div class="product-rating-count link-primary">${product.rating.count}</div>
          </div>

          <div class="product-price">$${price}</div>

          <div class="product-quantity-container ">
            <select class="js-quantity-selector-${product.id}">
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

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${product.id}" data-product-name="${product.name}">Add to Cart</button>
        </div>
    `;
  });
}
const toRenderProduct = renderProduct(products);
productsContainerElement.innerHTML = toRenderProduct;

// add event listeners to the btns

const addToCartBtns = document.querySelectorAll('.add-to-cart-button');
addToCartBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.productName;
    const id = btn.dataset.productId;
    const quantity = +document.querySelector(`.js-quantity-selector-${id}`)
      .value;

    const addedProduct = {
      name,
      id,
      quantity,
    };

    let matchingItem;
    cart.forEach((product) => {
      if (product.id === addedProduct.id) {
        matchingItem = product;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push(addedProduct);
    }

    let totalQuantity = 0;
    cart.forEach((product) => {
      totalQuantity += product.quantity;
    });

    document.querySelector('.cart-quantity').innerHTML = totalQuantity;
  });
});
