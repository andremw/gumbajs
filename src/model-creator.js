'use strict';

const fs = require('promised-io/fs');
const mustache = require('mustache');
const checkConfig = require('./config-check');
const capitalizeFirstLetter = require('./helper/capitalize-first-letter');

module.exports = config => {
    checkConfig(['componentModelFolder', 'modelName', 'modelAttrs', 'filepath', 'packageName'], config);
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

function renderModelOnTemplate(model, file) {
    return mustache.render(file, model);
}
