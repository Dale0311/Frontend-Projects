import {
  formatCurrency,
  getCartFromLocalStorage,
  setCartToLocalStorage,
} from '../scripts/utilities.js';
import { getItemFromProducts } from './products.js';

export let cart = getCartFromLocalStorage();

// cart main function
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
export const deleteItemInCart = (id) => {
  const updatedCart = cart.filter((item) => item.id !== id);
  cart = updatedCart;
  setCartToLocalStorage(cart);
};

// utilities for cart, does not modify the cart data.
export const updatedCartItems = () => {
  let cartItems = 0;
  cart.forEach((item) => (cartItems += item.quantity));
  return cartItems;
};

export const getTotalAmountInCart = () => {
  let total = 0;
  cart.forEach((item) => {
    const { priceCents } = getItemFromProducts(item.id);
    total += priceCents * item.quantity;
  });

  return formatCurrency(total);
};
