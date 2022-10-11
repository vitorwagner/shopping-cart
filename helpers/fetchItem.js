const fetchItem = async (itemID) => {
  if (!itemID) {
    throw new Error('You must provide an url');
  }
  const response = await fetch(`https://api.mercadolibre.com/items/${itemID}`);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
