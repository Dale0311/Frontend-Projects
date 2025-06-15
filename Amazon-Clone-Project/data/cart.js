export const cart = [];

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
};

export const updatedCartItems = () => {
  let cartItems = 0;
  cart.forEach((item) => (cartItems += item.quantity));
  return cartItems;
};
