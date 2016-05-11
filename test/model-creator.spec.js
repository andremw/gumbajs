'use strict';

const fs = require('promised-io/fs');

const tempWrite = require('temp-write');
const test = require('ava').test;

const generator = require('../src/');

const dirhandler = require('./fixtures/dirhandler');

const TEMP_FOLDER = './tmp';

test.before('creates the /tmp folder', async () => {
    await dirhandler.createFolder(TEMP_FOLDER);
});

test('Fails without required config', async t => {
    const gen = generator({
        componentsFolderPath: 'not needed now'
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

test.serial('Creates model file', async t => {
    const expectedFilename = 'UnauthModel.java';

    const gen = generator({
        componentsFolderPath: 'not needed now'
    });
    const tempFilepath = `.${tempWrite.sync('whatever')}`;
    await dirhandler.createFolder(tempFilepath);

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
    // await removeTempFolder();
});

// function removeTempFolder() {
//     return dirhandler.removeFolder(TEMP_FOLDER);
// }
