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
    let filepath = null;

    sequence = sequence.then(() => {
        filepath = `${folderPath}/${config.componentName}.html`;
        return readFile(`../templates/${htmlFile}`).then(handleReadFile);
    });

    xmlFiles.forEach(xmlFile => {
        sequence = sequence.then(() => {
            filepath = `${folderPath}/${xmlFile}`;
            return readFile(`../templates/${xmlFile}`).then(handleReadFile);
        });
    });

    function handleReadFile(fileContent) {
        return Promise.resolve()
        .then(() => mustache.render(fileContent, config))
        .then(renderedFile => writeFile(filepath, renderedFile));
    }

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
