/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

// We use an old version of `inquirer` to make it work with TypeScript and `ts-node`
import inquirer from 'inquirer';

const QUESTIONS = [
  {
    type: 'list',
    name: 'size',
    message: 'What size do you need?',
    choices: ['Large', 'Medium', 'Small'],
    filter(val) {
      return val.toLowerCase();
    },
  },
];

async function main() {
  const answers = await inquirer.prompt(QUESTIONS);
  console.log('\nAnswers:');
  console.log(JSON.stringify(answers, null, '  '));
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error: Error) => {
    console.error(error.message);
    process.exit(1);
  });
