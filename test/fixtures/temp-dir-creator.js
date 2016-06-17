'use strict';

const tempWrite = require('temp-write');
const fs = require('promised-io/fs');
const dirhandler = require('../../src/dirhandler');

const TEMP_FOLDER = './tmp';

module.exports = () => {
    const dirPath = `.${tempWrite.sync(new Date().toString())}`;
    return Promise.resolve()
    .then(() => dirhandler.createFolder(TEMP_FOLDER))
    .then(() => fs.mkdir(dirPath))
    .then(() => Promise.resolve(dirPath));
};
