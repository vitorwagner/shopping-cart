require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('1 - Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  test('2 - Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  test('3 - Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint correto', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  test('4 - Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto importado', async () => {
    await expect(fetchItem('MLB1615760527')).resolves.toEqual(item);
  });

  test('5 - Teste se, ao chamar a função fetchItem sem argumento, retorna um erro', async () => {
    await expect(fetchItem()).rejects.toThrow(new Error('You must provide an url'));
  });

  // fail('Teste vazio');
});
