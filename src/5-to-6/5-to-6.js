// const util = require('util');
const fs = require('promised-io/fs');
const parseXmlToJs = require('xml2js').parseString;

const configCheck = require('../config-check');
const parseModel = require('../helper/parse-model');
const createModel = require('../model-creator');

module.exports = config => {
    const promise = new Promise((resolve, reject) => {
        configCheck(['contentComponentDir'], config);

        const componentDir = config.contentComponentDir;

        fs.readdir(`${componentDir}/dialogTabs`).then(xmlFiles => {
            xmlFiles = xmlFiles.filter(xmlFile => {
                return xmlFile.charAt(0) !== '.';
            }).forEach(xmlFile => {
                readFile(`${componentDir}/dialogTabs/${xmlFile}`).then(content => {
                    parseXmlToJs(content, (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        result = fixResult(result);
                        const modelAttrs = parseModel(result).filter(attr => {
                            return attr.type !== 'list';
                        });

                        const javaName = removeExtension(xmlFile);

                        const options = {
                            modelName: capitalizeFirstLetter(javaName),
                            componentModelFolder: config.componentName,
                            filepath: config.outputPath,
                            modelAttrs,
                            capitalize: () => {
                                return (val, render) => {
                                    const text = render(val);
                                    return capitalizeFirstLetter(text);
                                };
                            }
                        };

                        createModel(options).then(resolve, reject);
                    });
                }, reject);
            });
        });
    });
    return promise;
};

function readFile(path) {
    return fs.readFile(path, 'utf-8');
}

function fixResult(result) {
    return result['jcr:root'];
}

function removeExtension(string) {
    return string.replace('.xml', '');
}

function capitalizeFirstLetter(string) {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

// function inspect(data) {
//     console.log(require('util').inspect(data, {depth: null}));
// }
