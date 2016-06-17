'use strict';

const fs = require('promised-io/fs');
const rimraf = require('rimraf-promise');

module.exports.removeFolder = path => {
    return folderExists(path).then(rimraf(path));
};

module.exports.createFolder = path => {
    return folderExists(path).then(null, () => fs.mkdir(path));
};

function folderExists(path) {
    return Promise.resolve().then(() => fs.access(path, fs.F_OK));
}
