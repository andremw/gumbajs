'use strict';

const fs = require('promised-io/fs');
const Deferred = require('promised-io/promise').Deferred;
const mustache = require('mustache');
const checkConfig = require('./config-check');
let deferred = null;

module.exports = config => {
    checkConfig(['componentModelFolder', 'modelName'], config);

    deferred = new Deferred();
    const filename = `${config.modelName}.java`;
    const filepath = `${config.filepath}/${filename}`;

    fs.readFile(`../templates/model.java`, 'utf-8').then(file => {
        const renderedFile = renderModelOnTemplate(config, file);
        fs.writeFile(filepath, renderedFile).then(resolve, reject);
    }, reject);

    return deferred.promise;
};

function renderModelOnTemplate(model, file) {
    return mustache.render(file, model);
}

function resolve() {
    deferred.resolve();
}

function reject(error) {
    deferred.reject(error);
}
