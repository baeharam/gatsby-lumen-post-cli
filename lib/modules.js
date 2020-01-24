const fs = require('fs-extra');
const rr = require('recursive-readdir');
const mt = require('gray-matter');
const format = require('date-fns/format');
const makeDir = require('make-dir');
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
      color: 'green',
      label: 'file',
      badge: '◆'
    }
  }
});
const inquirer = require('inquirer');
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

module.exports = {
  fs,
  rr,mt,
  format,makeDir,
  logger,inquirer
};