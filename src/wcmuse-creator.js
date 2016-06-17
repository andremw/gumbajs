'use strict';

const fs = require('promised-io/fs');
const mustache = require('mustache');
const checkConfig = require('./config-check');
const capitalizeFirstLetter = require('./helper/capitalize-first-letter');

module.exports = function wcmuseCreator(config) {
    checkConfig(['packageName', 'componentModelFolder', 'controllerName', 'models', 'filepath'], config);
    const fileName = capitalizeFirstLetter(`${config.componentModelFolder}.java`);
    const filepath = `${config.filepath}/${fileName}`;

    config.lowerCaseFirstLetter = () => {
        return (val, render) => {
            return lowerCaseFirstLetter(render(val));
        };
    };

    return Promise.resolve()
    .then(() => fs.readFile('../templates/wcmuse.java', 'utf-8'))
    .then(file => mustache.render(file, config))
    .then(renderedFile => fs.writeFile(filepath, renderedFile));
};

function lowerCaseFirstLetter(string) {
    return `${string.charAt(0).toLowerCase()}${string.slice(1)}`;
}
