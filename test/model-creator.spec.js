'use strict';

const test = require('ava').test;
const fs = require('promised-io/fs');

const generator = require('../src/api');
const tempDirCreator = require('./fixtures/tempDirCreator');

test('Fails without required config', t => {
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
    const tempFilepath = await tempDirCreator();
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
