'use strict';

const fs = require('promised-io/fs');
const mustache = require('mustache');
const configCheck = require('./config-check');

module.exports = config => {
    configCheck(['componentName', 'componentGroup'], config);
    const componentFolder = `${config.componentsDirPath}/${config.componentName}`;

    // creates the main component folder if it doesn't exist yet
    return createDir(config.componentsDirPath)
    .then(() => createDir(componentFolder))
    .then(() => createBasicStructure(config));
};

function createDir(componentsDirPath) {
    return fs.access(componentsDirPath, fs.F_OK)
    .then(null, () => fs.mkdir(componentsDirPath));
}

function createBasicStructure(config) {
    return new Promise((resolve, reject) => {
        const xmlFiles = ['.content.xml', '_cq_editConfig.xml', 'dialog.xml'];
        const htmlFile = 'component.html';
        const folderName = config.componentName;
        const folderPath = `${config.componentsDirPath}/${folderName}/`;
        let count = 0;

        xmlFiles.forEach(xmlFile => {
            const filepath = mountFilePath(folderPath, xmlFile);
            readFile(`../templates/${xmlFile}`)
            .then(fileContent => mustache.render(fileContent, config))
            .then(renderedFile => writeFile(filepath, renderedFile))
            .then(() => {
                count++;
                if (count === 4) {
                    resolve();
                }
            }, reject);
        });

        const filepath = `${mountFilePath(folderPath, config.componentName)}.html`;
        readFile(`../templates/${htmlFile}`)
        .then(fileContent => mustache.render(fileContent, config))
        .then(renderedFile => writeFile(filepath, renderedFile))
        .then(() => {
            count++;
            if (count === 4) {
                resolve();
            }
        }, reject);
    });
}

function mountFilePath(folderPath, resource) {
    return `${folderPath}/${resource}`;
}

function readFile(path) {
    return fs.readFile(path, 'utf-8');
}

function writeFile(path, content) {
    return fs.writeFile(path, content);
}
