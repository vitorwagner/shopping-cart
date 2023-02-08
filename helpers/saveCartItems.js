const saveCartItems = (cartItem) => {
  const storage = JSON.parse(localStorage.getItem('cartItems')) || [];
  localStorage.setItem('cartItems', JSON.stringify([...storage, cartItem]));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
