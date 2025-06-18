let timeoutId;
export function toggleAddedToCartElement(id) {
  const addedToCartNotifElement = document.querySelector(`.added-${id}`);

  addedToCartNotifElement.classList.add('show-element');

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    addedToCartNotifElement.classList.remove('show-element');
  }, 500);
}

export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2);
}

export function setCartToLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function getCartFromLocalStorage() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}
