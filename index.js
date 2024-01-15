const fs = require("fs");
// const path = require('path');
const inquirer = require("inquirer");
// const generateMarkdown = require("./utils/generateMarkdown");


// function to write README file
function writeToFile(title, description, contents) {


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
        ])

        .then((responses) => {
            const { title, description, contents} = responses;
            writeToFile(title, description, contents);
        });
}

// function call to initialize program
init();