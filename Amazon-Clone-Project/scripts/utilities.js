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
