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
    expect(isArray).toBe(true);
  });

  test('getTags', () => {
    const tags = getTags();
    const isSet = tags instanceof Set;
    expect(isSet).toBe(true);
  });

  test('validateTitle', () => {
    const validTitle = validateTitle('title');
    const invalidTitle = validateTitle(`'titlte'`);
    expect(typeof validTitle === 'string' 
    || typeof validTitle === 'boolean').toBe(true);
    expect(invalidTitle).toBe('You cannot input single/double quotes');
  });

  test('validateInput', () => {
    const validInput = validateInput('input');
    const invalidInput = validateInput(`'input'`);
    expect(validInput).toBe(true);
    expect(invalidInput).toBe('You cannot input single/double quotes');
  });
});