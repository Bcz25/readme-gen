const inquirer = require('inquirer')
const fs = require('fs')


inquirer.prompt([
    {
        message: 'What is the name of your project?',
        name: 'project'
    },
    {
        message: 'Pleaase write a short description of your project. (EX: Why did you build this project?, What problem does it solve?, What makes your project stand out?',
        name: 'desc'
    },
    {
        message: 'How do you install your application?',
        name: 'installation'
    },
    {
        message: 'What are your contribution guidlines?',
        name: 'guide'
    },
    {
        message: 'What tests can we run to enmsure the application is running as it should?',
        name: 'test'
    },
    {
        type: 'list',
        message: 'What license did you use?',
        choices: ['None', 'Apache 2.0', 'MIT', 'GPL v3.0'],
        name: 'lic'
    },
    {
        message: 'What is your GitHub username?',
        name: 'github'
    },
    {
        message: 'What is your email?',
        name: 'email'
    },
]).then((response) => {
    fs.writeFile(`${response.project}-README.md`, generateReadMe(response) , err => {
        if (err) {
          console.error(err);
        } else {
          console.log('README successfully created!')
        }
    })
})

function generateReadMe(response) {
return`
# ${response.project}
${response.desc}

## Table Of Contents
* [License](#license)   
* [Installation](#install)
* [Usage](#use)
* [Contributing](#contributing)
* [Tests](#test)
* [Questions](#questions)

<a name="license"></a>
## License
## ${response.lic} ${renderLicenseBadge(response.lic)}
## ${renderLicenseLink(response.lic)}

<a name="install"></a>
## Installation
${response.installation}

<a name="use"></a>
## Usage
${response.usage}

<a name="contributing"></a>
## Contributing
${response.guide}

<a name="test"></a>
## Tests
${response.test}

<a name="questions"></a>
## Questions
Please feel free to contact me with any questions or ideas for future projects!
GitHub: [${response.github}](https://github.com/${response.github})
Email: ${response.email}
`;
}

function renderLicenseBadge(response) {
    let badge = '';
    if(response.lic === 'MIT') {
        badge = '![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)'
    } else if (response.lic === 'Apache 2.0') {
        badge = '![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)'
    } else if (response.lic === 'GPL v3.0') {
        badge = '![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)'
    } else {
      badge = ""
    }
    return badge;
}

function renderLicenseLink(response) {
    let licenseLink = '';
      if(response.lic === 'MIT') {
        licenseLink = 'https://choosealicense.com/licenses/mit/'
      } else if (response.lic === 'Apache 2.0') {
        licenseLink = 'http://www.apache.org/licenses/LICENSE-2.0'
      } else if (response.lic === 'GPL v3.0') {
        licenseLink = 'https://www.gnu.org/licenses'
      } else {
        licenseLink = ""
      }
      return licenseLink;
  }