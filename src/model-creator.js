'use strict';

const fs = require('promised-io/fs');
const mustache = require('mustache');
const checkConfig = require('./config-check');

module.exports = config => {
    checkConfig(['componentModelFolder', 'modelName', 'modelAttrs'], config);

    config.modelName = capitalizeFirstLetter(removeExtension(config.modelName));
    const filename = `${config.modelName}.java`;
    const filepath = `${config.filepath}/${filename}`;

    config.capitalize = () => {
        return (val, render) => {
            return capitalizeFirstLetter(render(val));
        };
    };

    return fs.readFile(`../templates/model.java`, 'utf-8').then(file => {
        const renderedFile = renderModelOnTemplate(config, file);
        return fs.writeFile(filepath, renderedFile);
    });
};

function removeExtension(string) {
    return string.replace('.xml', '');
}

function capitalizeFirstLetter(string) {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

function renderModelOnTemplate(model, file) {
    return mustache.render(file, model);
}
