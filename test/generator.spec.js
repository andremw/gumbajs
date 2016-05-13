'use strict';

const test = require('ava').test;
// const tempWrite = require('temp-write');
// const fs = require('promised-io/fs');

const generator = require('../src/api');

test.skip('Fails without required config', async t => {
    t.throws(() => {
        generator();
    }, 'componentsDirPath is required!');
});
