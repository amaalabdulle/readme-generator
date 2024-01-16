const fs = require("fs");
// const path = require('path');
const inquirer = require("inquirer");
// const generateMarkdown = require("./utils/generateMarkdown");


// function to write README file
function writeToFile(github, title, description, contents, installation, usage, license, contributors, test, questions) {
    // Installation section
    const installationSection = installation
        ? 'Installation steps go here.\n'
        : 'No installation required.\n';

    // License section

    const licenseBadge = license && license.length > 0
        ? `![License](https://img.shields.io/badge/License-${encodeURIComponent(license[0])}-brightgreen.svg)\n`
        : '';

    const licenseSection = license && license.length > 0
        ? `${license.join(', ')}\n`
        : 'No license required.\n';

    // Test section
    const testSection = test
        ? 'To run tests, run the following commands:\n\n npm test\n npm init -y \n npm i inquirer@6.5.0 --save \n'
        : '';

    // Add GitHub username to README
    const githubSection = github
        ? `Find me on GitHub: [${github}](https://github.com/${github})\n`
        : '';

    // Create content for README
    const content = `# ${title}\n${licenseBadge}\n## Description\n${description}\n\n## Contents\n${contentLinks(contents)}\n\n## Installation\n${installationSection}\n## Usage\n${usage}\n\n## License\n${licenseSection}\n## Contributing\n${contributors}\n\n## Test\n${testSection}\n## GitHub\n${githubSection}\n## Questions\n${questions}`;

    // Write content to README.md
    fs.writeFile('README.md', content, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('README.md file created successfully!');
        }
    });
}

// Function for table of content links
function contentLinks(contents) {
    const items = contents.split(',').map(item => item.trim());
    const links = items.map(section => `- [${section}](#${anchorLinks(section)})`);
    
    return links.join('\n');
}

// Function for anchor links
function anchorLinks(item) {
    return item.toLowerCase().replace(/\s+/g, '-');
}

// function to initialize program
function init() {
    inquirer
        .prompt([
            {
            type: 'input',
            message: 'What is your GitHub username?',
            name: 'github',
            },
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
            const { github, title, description, contents, installation, usage, license, contributors, test, questions} = responses;
            writeToFile(github, title, description, contents, installation, usage, license, contributors, test, questions);
        });
}

// function call to initialize program
init();