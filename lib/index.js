const { fs, format, makeDir, logger } = require('./modules');
const { getCategories } = require('./utils');
const { 
  getNewCategoryFromUser, 
  getCategoryOptionFromUser, 
  getExistingCategoryFromUser,
  getTitleFromUser,
  getDescriptionFromUser,
  getTagsFromUser,
  getMoreTagsFromUser
} = require('./prompts');
const { RELATIVE_POST_DIR, ABSOLUTE_POST_DIR } = require('./constants');

module.exports = async () => {
  logger.log('\x1b[33m','\n★ Lumen Post Generator ★\n');

  const categories = await getCategories();
  let category;
  if (categories.length === 0) {
    category = await getNewCategoryFromUser();
  } else {
    const addNew = await getCategoryOptionFromUser();
    if (addNew) {
      category = await getNewCategoryFromUser();
    } else {
      category = await getExistingCategoryFromUser(categories);
    }
  }

  const title = await getTitleFromUser();
  const description = await getDescriptionFromUser();
  const tagsFromExisting = await getTagsFromUser();
  const tagsFromUser = await getMoreTagsFromUser();
  const tagsArray = [...tagsFromExisting, ...tagsFromUser];
  const now = new Date();
  const date = format(now, "yyyy-MM-dd HH:mm:ss");
  const refinedTitle = title.trim().split(' ').join('-');
  const filename = format(now, 'yyyy-MM-dd') + '---' + refinedTitle;
  const slug = refinedTitle.replace(/\[|\]/g,'');

  let tags = '';
  if (tagsArray.length) {
    tags += `tags:\n`;
    tagsArray.forEach((tag) => tags += `  - "${tag}"\n`);
  }

  const frontMatter = 
  `---\n`+
  `title: "${title}"\n` +
  `date: "${date}"\n` +
  `template: "post"\n` +
  `draft: false\n` +
  `slug: "${slug}"\n` +
  `category: "${category}"\n` +
  `${tags}` +
  `description: "${description}"\n` +
  `---\n`;

  logger.log();
  try {
    fs.outputFileSync(`${ABSOLUTE_POST_DIR}/${category}/${filename}.md`, frontMatter);
    logger.success('You made new post!');
    logger.note(`${RELATIVE_POST_DIR}/${category}/${filename}.md`);
  } catch (e) {
    logger.fatal(new Error('You failed to make post!'));
  }
};