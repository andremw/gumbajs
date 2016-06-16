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

function createBasicStructure(config) {
    return new Promise((resolve, reject) => {
        const xmlFiles = ['.content.xml', '_cq_editConfig.xml', 'dialog.xml'];
        const htmlFile = 'component.html';
        const folderName = config.componentName;
        const folderPath = `${config.componentsDirPath}/${folderName}/`;
        let count = 0;

        xmlFiles.forEach(xmlFile => {
            readFile(`../templates/${xmlFile}`).then(fileContent => {
                const filepath = `${folderPath}/${xmlFile}`;
                const renderedFile = mustache.render(fileContent, config);
                return writeFile(filepath, renderedFile);
            }).then(() => {
                count++;
                if (count === 4) {
                    resolve();
                }
            }, reject);
        });

        readFile(`../templates/${htmlFile}`).then(fileContent => {
            const filepath = `${folderPath}/${config.componentName}.html`;
            const renderedFile = mustache.render(fileContent, config);
            return writeFile(filepath, renderedFile);
        }).then(() => {
            count++;
            if (count === 4) {
                resolve();
            }
        }, reject);
    });
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
