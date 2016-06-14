'use strict';

const tempWrite = require('temp-write');
const fs = require('promised-io/fs');
const dirhandler = require('../../src/dirhandler');
const TEMP_FOLDER = './tmp';

module.exports = () => {
    const promise = new Promise((resolve, reject) => {
        const dirPath = `.${tempWrite.sync(new Date().toString())}`;
        dirhandler.createFolder(TEMP_FOLDER).then(() => {
            fs.mkdir(dirPath).then(() => {
                resolve(dirPath);
            }, reject);
        }, reject);
    });
    return promise;
};
