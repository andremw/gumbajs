'use strict';

const test = require('ava').test;
const fs = require('promised-io/fs');

const wcmuseCreator = require('../src/wcmuse-creator');
const tempDirCreator = require('./fixtures/temp-dir-creator');

test('Fails without required config', t => {
    t.throws(() => {
        wcmuseCreator();
    }, 'packageName is required!');

    t.throws(() => {
        wcmuseCreator({
            packageName: 'whatever'
        });
    }, 'componentModelFolder is required!');

    t.throws(() => {
        wcmuseCreator({
            packageName: 'whatever',
            componentModelFolder: 'whatever'
        });
    }, 'controllerName is required!');

    t.throws(() => {
        wcmuseCreator({
            packageName: 'whatever',
            componentModelFolder: 'whatever',
            controllerName: 'whatever'
        });
    }, 'models is required!');
});

test('Creates WCMuse', async t => {
    const tempFilepath = await tempDirCreator();
    const expectedFilename = 'MyWCMUse.java';

    const options = {
        packageName: 'marketingservices',
        componentModelFolder: 'MyWCMUse',
        controllerName: 'MyWCMUse',
        models: ['Model1', 'Model2', 'Model3'],
        filepath: tempFilepath
    };

    await wcmuseCreator(options);
    const file = await fs.readFile(`${tempFilepath}/${expectedFilename}`, 'utf-8');
    t.true(file !== '\n');
});
