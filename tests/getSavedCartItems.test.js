const getSavedCartItems = require('../helpers/getSavedCartItems');

describe('4 - Teste a função getSavedCartItems', () => {
  beforeEach(() => {
    localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    global.localStorage = localStorageMock;
  });

  test('1 - Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    localStorageMock.getItem.mockReturnValue(null);
    getSavedCartItems();
    expect(localStorageMock.getItem).toHaveBeenCalled();
  });

  test('2 - Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o "cartItems" como parâmetro', () => {
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify([{ id: 1, name: 'item 1', price: 10 }])
    );
    getSavedCartItems();
    expect(localStorageMock.getItem).toHaveBeenCalledWith('cartItems');
  });
});
