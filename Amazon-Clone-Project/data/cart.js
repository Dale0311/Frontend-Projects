export const cart = [
  {
    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 1,
  },
  {
    id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
  },
];

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
