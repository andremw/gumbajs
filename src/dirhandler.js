'use strict';

const fs = require('promised-io/fs');
const rimraf = require('rimraf-promise');

module.exports.removeFolder = path => {
    return new Promise(resolve => {
        folderExists(path).then(rimraf(path), resolve);
    });
};

module.exports.createFolder = path => {
    return folderExists(path).then(null, () => fs.mkdir(path));
};

function folderExists(path) {
    return fs.access(path, fs.F_OK);
}
