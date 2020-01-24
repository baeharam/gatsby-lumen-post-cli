const {
  getCategories,
  getTags,
  validateTitle,
  validateInput,
} = require('../utils');

describe('utils', () => {
  test('getCategories', async () => {
    const categories = await getCategories();
    const isArray = Array.isArray(categories);
    expect(isArray).toBeTruthy;
  });

  test('getTags', () => {
    const tags = getTags();
    const isSet = tags instanceof Set;
    expect(isSet).toBeTruthy;
  });

  test('validateTitle', () => {
    const validTitle = validateTitle('title');
    const invalidTitle = validateTitle(`'titlte'`);
    expect(typeof validTitle === 'string' 
    || typeof validTitle === 'boolean').toBeTruthy;
    expect(invalidTitle).toBe('You cannot input single/double quotes');
  });

  test('validateInput', () => {
    const validInput = validateInput('input');
    const invalidInput = validateInput(`'input'`);
    expect(validInput).toBeTruthy;
    expect(invalidInput).toBe('You cannot input single/double quotes');
  });
});