const saveCartItems = require('../helpers/saveCartItems');


describe('saveCartItems', () => {

  beforeEach(() => {
    localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    global.localStorage = localStorageMock;
  });

  it('should add a cart item to local storage', () => {
    localStorageMock.getItem.mockReturnValue(null);
    saveCartItems({ id: 1, name: 'item 1', price: 10 });
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'cartItems',
      JSON.stringify([{ id: 1, name: 'item 1', price: 10 }])
    );
  });

  it('should add multiple cart items to local storage', () => {
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify([{ id: 1, name: 'item 1', price: 10 }])
    );
    saveCartItems({ id: 2, name: 'item 2', price: 20 });
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'cartItems',
      JSON.stringify([
        { id: 1, name: 'item 1', price: 10 },
        { id: 2, name: 'item 2', price: 20 },
      ])
    );
  });
});
