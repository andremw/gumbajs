'use strict';

// const util = require('util');
const fs = require('promised-io/fs');
const parseXmlToJs = require('xml2js').parseString;

const capitalizeFirstLetter = require('../helper/capitalize-first-letter');
const dirhandler = require('../../src/dirhandler');
const configCheck = require('../config-check');
const parseModel = require('../helper/parse-model');
const createModel = require('../model-creator');

module.exports = config => {
    configCheck(['compDir', 'outputDir', 'packageName'], config);
    const dialogTabsDir = `${config.compDir}/dialogTabs`;
    const componentModelFolder = config.compDir.substr(config.compDir.lastIndexOf('/') + 1);
    const folderpath = `${config.outputDir}/${componentModelFolder}`;
    const createdModels = [];
    let xmlFilesCount = 0;

    return new Promise((resolve, reject) => {
        dirhandler.createFolder(folderpath).then(() => {
            return fs.readdir(dialogTabsDir);
        }).then(xmlFiles => {
            const filteredXmlFiles = xmlFiles.filter(filterXml);
            xmlFilesCount = filteredXmlFiles.length;
            filteredXmlFiles.forEach(xmlFile => {
                readFile(`${dialogTabsDir}/${xmlFile}`).then(content => {
                    parseXmlToJs(content, (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        result = fixResult(result);
                        const modelAttrs = parseModel(result).filter(removeListAttrs);
                        const modelName = capitalizeFirstLetter(removeExtension(xmlFile));
                        const options = {
                            packageName: config.packageName,
                            modelName,
                            componentModelFolder,
                            filepath: folderpath,
                            modelAttrs
                        };

                        createModel(options).then(() => {
                            createdModels.push(modelName);
                            if (createdModels.length === xmlFilesCount) {
                                resolve();
                            }
                        }, reject);
                    });
                }, reject);
            });
        });
    });
};

function filterXml(xmlFile) {
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
