'use strict';

const fs = require('promised-io/fs');
const mustache = require('mustache');
const checkConfig = require('./config-check');

module.exports = config => {
    checkConfig(['componentModelFolder', 'modelName'], config);

    const filename = `${config.modelName}.java`;
    const filepath = `${config.filepath}/${filename}`;

    return fs.readFile(`../templates/model.java`, 'utf-8').then(file => {
        const renderedFile = renderModelOnTemplate(config, file);
        return fs.writeFile(filepath, renderedFile);
    });
};

function renderModelOnTemplate(model, file) {
    return mustache.render(file, model);
}
