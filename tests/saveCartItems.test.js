const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');
localStorageSimulator('getItem');

describe('3 - Teste a função saveCartItems', () => {
  test('1 - Teste se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado', () => {
    saveCartItems('cartItem');
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  test('2 - Teste se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado com dois parâmetros', () => {
    saveCartItems('cartItem');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', 'cartItem');
  });

  // fail('Teste vazio');
});
