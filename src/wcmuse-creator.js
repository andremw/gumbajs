'use strict';

const fs = require('promised-io/fs');
const mustache = require('mustache');
const checkConfig = require('./config-check');

module.exports = function wcmuseCreator(config) {
    checkConfig(['packageName', 'componentModelFolder', 'controllerName', 'models'], config);
    const fileName = `${config.componentModelFolder}.java`;
    const filePath = `${config.filepath}/${fileName}`;

    config.lowerCaseFirstLetter = () => {
        return (val, render) => {
            return lowerCaseFirstLetter(render(val));
        };
    };

    return fs.readFile('../templates/wcmuse.java', 'utf-8').then(file => {
        const renderedFile = renderModelOnTemplate(config, file);
        return fs.writeFile(filePath, renderedFile);
    });
};

function renderModelOnTemplate(model, file) {
    return mustache.render(file, model);
}

function lowerCaseFirstLetter(string) {
    return `${string.charAt(0).toLowerCase()}${string.slice(1)}`;
}
