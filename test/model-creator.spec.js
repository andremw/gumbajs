'use strict';

const test = require('ava').test;
const fs = require('promised-io/fs');

const generator = require('../src/api');
const tempDirCreator = require('./fixtures/tempDirCreator');

let tempFilepath = null;

test.before('creates the /tmp folder', async () => {
    tempFilepath = await tempDirCreator();
});

test('Fails without required config', async t => {
    const gen = generator({
        componentsDirPath: 'not needed now'
    });
    t.throws(() => {
        gen.createModel({
            modelName: 'whatever'
        });
    }, 'componentModelFolder is required!');

    t.throws(() => {
        gen.createModel({
            componentModelFolder: 'whatever'
        }, 'modelName is required!');
    });
});

test('Creates model file', async t => {
    const expectedFilename = 'UnauthModel.java';

    const gen = generator({
        componentsDirPath: 'not needed now'
    });

    const options = {
        modelName: 'UnauthModel',
        componentModelFolder: 'unauthModel',
        filepath: tempFilepath
    };

    await gen.createModel(options);
    const file = await fs.readFile(`${tempFilepath}/${expectedFilename}`, 'utf-8');
    t.true(file !== '\n');
});

test.after('removes the /tmp folder', async () => {

});
