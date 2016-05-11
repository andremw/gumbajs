const fs = require('promised-io/fs');
const test = require('ava').test;
const generator = require('../src/');

test('Model Creator', t => {
    t.is(typeof generator, 'function', 'generator is a function');
    // t.is(typeof generator().createModel, 'function', 'createModel is a function');

    modelFileExists('opa.java', exists => {
        t.true(exists, 'model was created');
    });
});

function modelFileExists(filename) {
    return fs.stat(`./temp/${filename}`);
}
