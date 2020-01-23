const path = require('path');
const fs = require('fs-extra');
const rr = require('recursive-readdir');
const mt = require('gray-matter');
const format = require('date-fns/format');
const { Signale } = require('signale');
const logger = new Signale({
  types: {
    error: {
      color: 'red'
    },
    success: {
      color: 'blue',
    },
    note: {
      color: 'yellow',
    }
  }
});
const inquirer = require('inquirer');
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

const RELATIVE_POST_DIR = '/content/posts';
const ABSOLUTE_POST_DIR = process.cwd() + RELATIVE_POST_DIR;
const UTF8 = 'UTF8';
let frontMatters;

const getCategories = async () => {
  const markdownFiles = await rr(ABSOLUTE_POST_DIR);
  frontMatters = markdownFiles
    .map((file) => fs.readFileSync(file, UTF8))
    .map((content) => mt(content).data);
  const refiendFrontMatters = frontMatters
    .map(({category}) => !!category && category)
    .map((category) => category.trim().toLowerCase());
  return [...new Set(refiendFrontMatters)];
};

const getTags = () => {
  const matterTags = new Set();
  frontMatters.forEach(({tags}) => {
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

const validateDescription = (description) => {
  if (description.includes(`'`) || description.includes(`"`)) {
    return 'You cannot input single/double quotes';
  }
  return true;
};

const getCategoryFromUser = async () => {
  const categories = await getCategories();
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
    validate: validateDescription,
  }]);
  return Description;
};

const getTagsFromUser = async () => {
  const tags = Array.from(getTags());
  const { Tags } = await inquirer.prompt([{
      type: 'checkbox',
      name: 'Tags',
      message: 'Choose tags: ',
      choices: tags,
    }]);
  return Tags;
};

module.exports = async () => {
  logger.log('Lumen Post Generator\n');

  const category = await getCategoryFromUser();
  const title = await getTitleFromUser();
  const description = await getDescriptionFromUser();
  const tags = await getTagsFromUser();
  const now = new Date();
  const date = format(now, "yyyy-MM-dd HH:mm:ss");
  const slug = title.trim().split(' ').join('-');
  const filename = format(now, 'yyyy-MM-dd') + '---' + slug;

  let yaml = '---\n';
  yaml += `title: "${title}"\n`;
  yaml += `date: "${date}"\n`;
  yaml += `template: "post"\n`;
  yaml += `draft: false\n`;
  yaml += `slug: "${slug}"\n`;
  yaml += `category: "${category}"\n`;
  yaml += `tags:\n`;
  tags.forEach((tag) => yaml += `  - "${tag}"\n`);
  yaml += `description: "${description}"\n`;
  yaml += '---\n';

  logger.log();
  try {
    fs.outputFileSync(`${ABSOLUTE_POST_DIR}/${filename}.md`, yaml);
    logger.success('You made new post!');
  } catch (e) {
    logger.fatal(new Error('You failed to make post!'));
  }
};