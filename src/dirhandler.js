'use strict';

const fs = require('promised-io/fs');
const rimraf = require('rimraf-promise');

module.exports.removeFolder = path => {
    const promise = new Promise((resolve, reject) => {
        folderExists(path).then(found, notFound);

        function found() {
            rimraf(path).then(
                () => resolve(),
                error => reject(error)
            );
        }

        function notFound() {
            resolve();
        }
    });
    return promise;
};

module.exports.createFolder = path => {
    const promise = new Promise((resolve, reject) => {
        folderExists(path).then(success, () => {
            fs.mkdir(path).then(success, error => {
                reject(error);
            });
        });

        // called if folder already exists or if it was created successfully
        function success() {
            resolve();
        }
    });
    return promise;
};

function folderExists(path) {
    return fs.access(path, fs.F_OK);
}
