const { inquirer } = require('./modules');
const {
  getTags,
  validateTitle,
  validateInput
} = require('./utils');

const getCategoryOptionFromUser = async () => {
  const { answer } = await inquirer.prompt([{
    type: 'confirm',
    name: 'answer',
    message: 'Do you want to add category? ',
  }]);
  return answer;
};

const getExistingCategoryFromUser = async (categories) => {
  const { Category } = await inquirer.prompt([{
      type: 'autocomplete',
      name: 'Category',
      message: 'Choose category: ',
      source: (answersSoFar, input) => {
        return Promise.resolve(
          categories
            .filter((category) =>
              (!input || category.indexOf(input.toLowerCase()) !== -1))
        );
      }
    }]);
  return Category;
};

const getNewCategoryFromUser = async () => {
  const { Category } = await inquirer.prompt([{
    type: 'input',
    name: 'Category',
    message: 'Input category: ',
    validate: validateTitle,
  }]);
  return Category;
};

const getTitleFromUser = async () => {
  const { Title } = await inquirer.prompt([{
    type: 'input',
    name: 'Title',
    message: 'Input title: ',
    validate: validateTitle,
  }]);
  return Title;
};

const getDescriptionFromUser = async () => {
  const { Description } = await inquirer.prompt([{
    type: 'input',
    name: 'Description',
    message: 'Input description: ',
    validate: validateInput,
  }]);
  return Description;
};

const getTagsFromUser = async () => {
  const tags = Array.from(getTags());
  if (tags.length === 0) {
    return tags;
  }
  const { Tags } = await inquirer.prompt([{
      type: 'checkbox',
      name: 'Tags',
      message: 'Choose tags: ',
      choices: tags,
    }]);
  return Tags;
};

const getMoreTagsFromUser = async () => {
  const { stringTags } = await inquirer.prompt([{
    type: 'input',
    name: 'stringTags',
    message: 'Input tags: ',
    validate: validateInput,
  }]);
  if (stringTags.length === 0) return [];
  return stringTags.split(' ');
};

module.exports = {
  getExistingCategoryFromUser,
  getCategoryOptionFromUser,
  getNewCategoryFromUser,
  getTitleFromUser,
  getDescriptionFromUser,
  getTagsFromUser,
  getMoreTagsFromUser
};