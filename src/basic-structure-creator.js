'use strict';

const fs = require('promised-io/fs');
const mustache = require('mustache');
const configCheck = require('./config-check');

module.exports = config => {
    configCheck(['componentName', 'componentGroup'], config);
    const componentFolder = `${config.componentsDirPath}/${config.componentName}`;

    // creates the main component folder if it doesn't exist yet
    return Promise.resolve()
    .then(() => createDir(config.componentsDirPath))
    .then(() => createDir(componentFolder))
    .then(() => createBasicStructure(config));
};

function createBasicStructure(config) {
    let sequence = Promise.resolve();

    const xmlFiles = ['.content.xml', '_cq_editConfig.xml', 'dialog.xml'];
    const htmlFile = 'component.html';
    const folderName = config.componentName;
    const folderPath = `${config.componentsDirPath}/${folderName}/`;

    sequence = sequence.then(() => {
        return readFile(`../templates/${htmlFile}`).then(fileContent => {
            const renderedFile = mustache.render(fileContent, config);
            const filepath = `${folderPath}/${config.componentName}.html`;
            return writeFile(filepath, renderedFile);
        });
    });

    xmlFiles.forEach(xmlFile => {
        sequence = sequence.then(() => {
            return readFile(`../templates/${xmlFile}`).then(fileContent => {
                const renderedFile = mustache.render(fileContent, config);
                const filepath = `${folderPath}/${xmlFile}`;
                return writeFile(filepath, renderedFile);
            });
        });
    });

    return sequence;
}

function createDir(componentsDirPath) {
    return fs.access(componentsDirPath, fs.F_OK)
    .then(null, () => fs.mkdir(componentsDirPath));
}

function readFile(path) {
    return fs.readFile(path, 'utf-8');
}

function writeFile(path, content) {
    return fs.writeFile(path, content);
}
