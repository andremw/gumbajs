'use strict';

const fs = require('promised-io/fs');
const Deferred = require('promised-io/promise').Deferred;
const mustache = require('mustache');
let deferred = null;

module.exports = config => {
    checkConfig(config);

    deferred = new Deferred();
    const filename = `${config.modelName}.java`;
    const filepath = `${config.filepath}/${filename}`;

    fs.readFile(`../fileTemplates/model.java`, 'utf-8').then(file => {
        const renderedFile = renderModelOnTemplate(config, file);
        fs.writeFile(filepath, renderedFile).then(resolve, reject);
    }, reject);

    return deferred.promise;
};

function checkConfig(config) {
    config = config || {};
    if (!config.componentModelFolder) {
        throw new Error('componentModelFolder is required!');
    }
    if (!config.modelName) {
        throw new Error('modelName is required!');
    }
}

function renderModelOnTemplate(model, file) {
    return mustache.render(file, model);
}

function resolve() {
    deferred.resolve();
}

function reject(error) {
    deferred.reject(error);
}
