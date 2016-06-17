'use strict';

// const util = require('util');
const fs = require('promised-io/fs');
const parseString = require('xml2js').parseString;

const capitalizeFirstLetter = require('../helper/capitalize-first-letter');
const dirhandler = require('../../src/dirhandler');
const configCheck = require('../config-check');
const parseModel = require('../helper/parse-model');
const createModel = require('../model-creator');
const wcmuseCreator = require('../wcmuse-creator');

module.exports = config => {
    configCheck(['compDir', 'outputDir', 'packageName'], config);
    const dialogTabsDir = `${config.compDir}/dialogTabs`;
    const componentModelFolder = config.compDir.substr(config.compDir.lastIndexOf('/') + 1);
    const modelFolderpath = `${config.outputDir}/${componentModelFolder}`;
    const createdModels = [];

    const sequence = Promise.resolve()
    .then(() => dirhandler.createFolder(modelFolderpath))
    .then(() => fs.readdir(dialogTabsDir))
    .then(xmlFiles => xmlFiles.filter(filterDotfiles))
    .then(filteredXmlFiles => {
        const promises = [];
        filteredXmlFiles.forEach(xmlFile => {
            const promise = Promise.resolve()
            .then(() => readFile(`${dialogTabsDir}/${xmlFile}`))
            .then(content => parseXmlToJs(content))
            .then(result => fixResult(result))
            .then(result => {
                const modelAttrs = parseModel(result).filter(removeListAttrs);
                const modelName = capitalizeFirstLetter(removeExtension(xmlFile));
                const options = {
                    packageName: config.packageName,
                    modelName,
                    componentModelFolder,
                    filepath: modelFolderpath,
                    modelAttrs
                };

                return createModel(options).then(() => {
                    createdModels.push(modelName);
                });
            });
            promises.push(promise);
        });
        return Promise.all(promises);
    }).then(() => {
        const options = {
            packageName: config.packageName,
            componentModelFolder,
            controllerName: config.controllerName,
            models: createdModels,
            filepath: config.outputDir
        };
        return wcmuseCreator(options);
    });

    return sequence;
};

function filterDotfiles(xmlFile) {
    return xmlFile.charAt(0) !== '.';
}

function readFile(path) {
    return fs.readFile(path, 'utf-8');
}

function fixResult(result) {
    return result['jcr:root'];
}

function removeListAttrs(attr) {
    return attr.type !== 'list';
}

function removeExtension(string) {
    return string.replace('.xml', '');
}

// function inspect(data) {
//     console.log(require('util').inspect(data, {depth: null}));
// }

function parseXmlToJs(content) {
    return new Promise((resolve, reject) => {
        parseString(content, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}
