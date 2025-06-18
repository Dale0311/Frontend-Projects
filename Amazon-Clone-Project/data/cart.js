import {
  getCartFromLocalStorage,
  setCartToLocalStorage,
} from '../scripts/utilities.js';

export let cart = getCartFromLocalStorage();

export const addToCart = (newItem) => {
  let matchItem;

  cart.forEach((item) => {
    if (item.id === newItem.id) {
      matchItem = item;
    }
  });

  if (matchItem) {
    matchItem.quantity += newItem.quantity;
  } else {
    cart.push(newItem);
  }

  setCartToLocalStorage(cart);
};

export const updatedCartItems = () => {
  let cartItems = 0;
  cart.forEach((item) => (cartItems += item.quantity));
  return cartItems;
};

export const deleteItemInCart = (id) => {
  const updatedCart = cart.filter((item) => item.id !== id);
  cart = updatedCart;
  setCartToLocalStorage(cart);
};

