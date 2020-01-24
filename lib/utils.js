const { fs, rr, mt } = require('./modules');
const { RELATIVE_POST_DIR, ABSOLUTE_POST_DIR } = require('./constants');
let frontMatters = [];

const getCategories = async () => {
  const markdownFiles = await rr(ABSOLUTE_POST_DIR);
  frontMatters = markdownFiles
    .map((file) => fs.readFileSync(file, 'utf8'))
    .map((content) => mt(content).data);
  const refiendFrontMatters = frontMatters
    .filter(({category}) => !!category)
    .map(({category}) => category.trim().toLowerCase());
  return [...new Set(refiendFrontMatters)];
};

const getTags = () => {
  const matterTags = new Set();
  frontMatters
    .filter(({tags}) => !!tags)
    .forEach(({tags}) => {
      tags
        .map((tag) => tag.trim())
        .forEach((tag) => matterTags.add(tag));
    });
  return matterTags;
};

const isExistingTitle = (userInput) => {
  return frontMatters
    .find(({title}) => title === userInput) !== undefined;
};

const validateTitle = (title) => {
  const isTitleExist = isExistingTitle(title);
  if (isTitleExist) {
    return 'Title is already exist, please input other title';
  }
  if (title.includes(`'`) || title.includes(`"`)) {
    return 'You cannot input single/double quotes';
  }
  return true;
};

const validateInput = (input) => {
  if (input.includes(`'`) || input.includes(`"`)) {
    return 'You cannot input single/double quotes';
  }
  return true;
};

module.exports = {
  getCategories,
  getTags,
  validateTitle,
  validateInput,
};