const inquirer = require('inquirer');
const fs = require('fs');

const generateMarkdown = ({ title, licenseBadge, licenseLink, description, installation, usage, license, contributing, tests, username, email }) =>
  `# ${title}

${license ? `[![License Badge](https://img.shields.io/badge/License-${licenseBadge}.svg)](https://opensource.org/licenses/${licenseLink})` : ''}

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

${license ? `This project is licensed under the ${license} license.` : 'This project is not licensed.'}

## Contributing

${contributing}

## Tests

To run tests, run the following command:

\`\`\`
${tests}
\`\`\`

## Questions

If you have any questions about this repository, open an issue or contact me directly at [${email}](mailto:${email}). You can find more of my work at [${username}](https://github.com/${username}/).
`;
const promptUser = () => {
  return inquirer.prompt([
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
      type: 'input',
      name: 'installation',
      message: 'What command should be run to install dependencies?',
      default: 'npm i'
    },
    {
      type: 'input',
      name: 'usage',
      message: 'What does the user need to know about using this repository?'
    },
    {
      type: 'list',
      name: 'license',
      message: 'Which license should your project have?',
      choices: ['Apache License', 'New BSD License', 'GNU General Public License', 'MIT License', 'Mozilla Public License', 'None'],
      default: 2
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'What does the user need to know about contributing to this repository?'
    },
    {
      type: 'input',
      name: 'tests',
      message: 'What command should be run to run tests?',
      default: 'npm test'
    },
    {
      type: 'input',
      name: 'username',
      message: 'What is your GitHub username?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email address?'
    }
  ]);
};

const init = () => {
  promptUser()
    .then((answers) => {
      switch (answers.license) {
        case 'Apache License':
          answers.licenseBadge = 'Apache_2.0-blue';
          answers.licenseLink = 'Apache-2.0';
          break;
        case 'New BSD License':
          answers.licenseBadge = 'BSD_3--Clause-blue';
          answers.licenseLink = 'BSD-3-Clause';
          break;
        case 'GNU General Public License':
          answers.licenseBadge = 'GPLv3-blue';
          answers.licenseLink = 'GPL-3.0';
          break;
        case 'MIT License':
          answers.licenseBadge = 'MIT-yellow';
          answers.licenseLink = 'MIT';
          break;
        case 'Mozilla Public License':
          answers.licenseBadge = 'MPL_2.0-brightgreen';
          answers.licenseLink = 'MPL-2.0';
          break;
        case 'None':
          answers.license = '';
          break;
      }
      fs.writeFileSync('README.md', generateMarkdown(answers))
    })
    .then(() => console.log('Successfully wrote to README.md!'))
    .catch((err) => console.error(err));
};

init();
