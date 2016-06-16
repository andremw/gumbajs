'use strict';

const fs = require('promised-io/fs');
const rimraf = require('rimraf-promise');

module.exports.removeFolder = path => {
    return new Promise((resolve, reject) => {
        folderExists(path).then(found, notFound);

        function found() {
            rimraf(path).then(resolve, reject);
        }

        function notFound() {
            resolve();
        }
    });
};

module.exports.createFolder = path => {
    return folderExists(path).then(null, () => fs.mkdir(path));
};

function folderExists(path) {
    return fs.access(path, fs.F_OK);
}
