const fs = require("fs");
// const path = require('path');
const inquirer = require("inquirer");
// const generateMarkdown = require("./utils/generateMarkdown");


// function to write README file
function writeToFile(title, description, contents, installation, usage, license, contributors, test, questions) {

    let installationSection = '';
    if (installation) {
        installationSection = 'Installation steps go here.\n';
    } else {
        installationSection = 'No installation required.\n';
    }

    let licenseSection = '';
    if (license && license.length > 0) {
        // Display selected licenses
        licenseSection = `## License\n${license.join(', ')}\n`;
    } 
    else {
        // Display "No license required" if no license selected
        licenseSection = '## License\nNo license required.\n';
    }

    let testSection = '';
    if (test) {
        // Display test instructions if a test is required
        testSection = '## Test\nTo run tests, run the following command:\n`npm test`\n';
    }

    const content = `# ${title}\n\n## Description\n${description}\n\n## Contents\n${contents}`;
    fs.appendFile('README.md', content, (err) =>
        err ? console.error(err) : console.log('Commit logged!')
    );
}

// function to initialize program
function init() {
    inquirer
        .createPromptModule([
            {
            type: 'input',
            message: 'What is title of your project?',
            name: 'title',
            },
            {
            type: 'input',
            message: 'Write a description about your project',
            name: 'description',
            },
            {
            type: 'input',
            message: 'Write your table of contents (separate items with commas)',
            name: 'contents',
            },
            {
            type: 'confirm',
            message: 'Does your project require installation?',
            name: 'installation',
            choices: ['Yes', 'No'],
            },
            {
            type: 'input',
            message: 'How do you use this project?',
            name: 'usage',
            },
            {
            type: 'checkbox',
            message: 'Does your project require a license?',
            name: 'license',
            choices: [
                // 'No License Required', 
                'Apache License 2.0', 
                'GNU General PUblic License', 
                'MIT licsense', 
                'BSD 2-Clause "Simplified" License', 
                'BSD 3-Clause "New" or "Revised" License', 
                'Boost Software License 1.0', 
                'Creative Commons Zero v1.0 Universal', 
                'Eclipse Public License', 
                'GNU Affero General Public License v3.0', 
                'GNU General Public License v2.0', 
                'GNU Lesser General Public License v2.1', 
                'Mozilla Public License 2.0', 
                'The Unilicense'
            ],
            },
            {
            type: 'input',
            message: 'Who are the contributors?',
            name: 'contributors',
            },
            {
            type: 'confirm',
            message: 'Does your project require a test?',
            name: 'test',
            choices: ['Yes', 'No'],
            },
            {
            type: 'input',
            message: 'Are there any questions that you have?',
            name: 'questions',
            },
        ])

        .then((responses) => {
            const { title, description, contents, installation, usage, license, contributors, test, questions} = responses;
            writeToFile(title, description, contents, installation, usage, license, contributors, test, questions);
        });
}

// function call to initialize program
init();