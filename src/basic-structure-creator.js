'use strict';

const fs = require('promised-io/fs');
const Deferred = require('promised-io/promise').Deferred;
const mustache = require('mustache');
const configCheck = require('./config-check');

let deferred = null;

module.exports = config => {
    configCheck(['componentName', 'componentGroup'], config);

    deferred = new Deferred();

    createFolder(config.componentName, config.componentsFolderPath).then(() => {
        createBasicStructure(config);
    });

    createFolder('clientlibs', `${config.componentsFolderPath}/${config.componentName}`);

    return deferred.promise;
};

function createBasicStructure(config) {
    const basicFiles = ['.content.xml', '_cq_editConfig.xml', 'dialog.xml', `${config.componentName}.html`];
    const folderName = config.componentName;

    basicFiles.forEach(basicFile => {
        const filepath = `${config.componentsFolderPath}/${folderName}/${basicFile}`;

        readFile(`../fileTemplates/${basicFile}`).then(fileContent => {
            const renderedFile = mustache.render(fileContent, config);
            fs.writeFile(filepath, renderedFile).then(resolve, reject);
        });
    });
}

function createFolder(folderName, componentsFolderPath) {
    const promise = new Promise((resolve, reject) => {
        fs.access(componentsFolderPath, fs.F_OK).then(noop, () => {
            fs.mkdir(componentsFolderPath).then(noop, error => {
                reject(error);
            });
        });

        function noop() {
            resolve();
        }
    });
    return promise;
}

function readFile(path) {
    return fs.readFile(path, 'utf-8');
}

function resolve() {
    deferred.resolve();
}

function reject(error) {
    deferred.reject(error);
}
