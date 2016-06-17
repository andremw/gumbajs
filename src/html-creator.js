'use strict';

const fs = require('promised-io/fs');
const mustache = require('mustache');
const checkConfig = require('./config-check');

module.exports = function htmlCreator(config) {
    checkConfig(['filepath', 'componentModelFolder', 'controllerName', 'models', 'packageName'], config);

    config.lowerCaseFirstLetter = () => {
        return (val, render) => {
            return lowerCaseFirstLetter(render(val));
        };
    };

    config.dollarit = () => {
        return (val, render) => {
            return `\${ ${render(val)} }`;
        };
    };

    const filepath = `${config.filepath}/${config.componentModelFolder}.html`;

    return Promise.resolve()
    .then(() => fs.readFile('../templates/component.html', 'utf-8'))
    .then(file => mustache.render(file, config))
    .then(renderedFile => fs.writeFile(filepath, renderedFile));
};

function lowerCaseFirstLetter(string) {
    return `${string.charAt(0).toLowerCase()}${string.slice(1)}`;
}
