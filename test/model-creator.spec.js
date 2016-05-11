'use strict';

const fs = require('promised-io/fs');
const rimraf = require('rimraf-promise');

const tempWrite = require('temp-write');
const test = require('ava').test;
const generator = require('../src/');

test.before('creates the /tmp folder', async () => {
    await rimraf('./tmp');
    await fs.mkdir('./tmp');
});

test('Fails without required config', async t => {
    const gen = generator();
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

test.serial('Creates model file', async t => {
    const expectedFilename = 'UnauthModel.java';

    const gen = generator();
    const tempFilepath = `.${tempWrite.sync('whatever')}`;
    await fs.mkdir(tempFilepath);

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
    await rimraf('./tmp');
});
