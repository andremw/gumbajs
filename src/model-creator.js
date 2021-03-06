'use strict';

const fs = require('promised-io/fs');
const mustache = require('mustache');
const checkConfig = require('./config-check');
const capitalizeFirstLetter = require('./helper/capitalize-first-letter');

module.exports = config => {
    checkConfig(['componentModelFolder', 'modelName', 'modelAttrs', 'filepath', 'packageName'], config);
    const filename = `${config.modelName}.java`;
    const filepath = `${config.filepath}/${filename}`;
    const templatePath = `${__dirname}/../templates/model.java`;

    config.capitalize = () => {
        return (val, render) => {
            return capitalizeFirstLetter(render(val));
        };
    };

    return Promise.resolve()
    .then(() => fs.readFile(templatePath, 'utf-8'))
    .then(file => mustache.render(file, config))
    .then(renderedFile => fs.writeFile(filepath, renderedFile));
};
