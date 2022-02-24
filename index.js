const inquirer = require('inquirer');
const fs = require('fs');

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'What is your GitHub username?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email address?'
    },
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your project?'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Please write a short description of your project'
    },
    {
      type: 'list',
      name: 'license',
      message: 'Which license should your project have?',
      choices: ['MIT', 'APACHE 2.0', 'GPL 3.0', 'BSD 3', 'None'],
      default: 0
    },
    {
      type: 'input',
      name: 'installation',
      message: 'What command should be run to install dependencies?',
      default: 'npm i'
    },
    {
      type: 'input',
      name: 'tests',
      message: 'What command should be run to run tests?',
      default: 'npm test'
    },
    {
      type: 'input',
      name: 'usage',
      message: 'What does the user need to know about using this repository?'
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'What does the user need to know about contributing to this repository?'
    }
  ]);
};

const generateMarkdown = ({ username, email, title, description, license, installation, tests, usage, contributing }) =>
  `# ${title}


## Description

${description}

## Table of Contents

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributing](#contributing)

* [Tests](#tests)

* [Questions](#questions)

## Installation

To install necessary dependencies, run the following command:

\`\`\`
${installation}
\`\`\`

## Usage

${usage}

## License

This project is licensed under the ${license} license.

## Contributing

${contributing}

## Tests

To run tests, run the following command:

${tests}

## Questions

If you have any questions about this repository, open an issue or contact me directly at ${email}. You can find more of my work at [${username}](https://github.com/${username}/).
`;

const init = () => {
  promptUser()
    .then((answers) => fs.writeFileSync('README.md', generateMarkdown(answers)))
    .then(() => console.log('Successfully wrote to README.md'))
    .catch((err) => console.error(err));
};

// const init = () => {
//   promptUser()
//     .then((answers) => {
//       fs.writeFile('README.md', generateMarkdown(answers), (err) =>
//         err ? console.log(err) : console.log('Successfully created README.md!')
//       );
//     });
// };

init();
