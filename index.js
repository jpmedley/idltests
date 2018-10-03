'use strict';

const Enquirer = require('enquirer');
const Prompt = require('prompt-choices');

// const choices = new Prompt(['One', 'Two', 'Three']);
// choices.render = (choice, position, options) => {
//   return '';
// }
// choices.render();

const enquirer = new Enquirer();
enquirer.question('first', 'First name?');
enquirer.question('last', 'Last name?');


enquirer.prompt(['first', 'last'])
  .then(function(answers) {
    console.log(answers)
  });
