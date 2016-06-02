'use strict';

const test = require('ava').test;
const fs = require('promised-io/fs');

const wcmuseCreator = require('../src/wcmuse-creator');
const tempDirCreator = require('./fixtures/tempDirCreator');

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
        models: [{
            modelName: 'model1',
            className: 'Model1'
        }, {
            modelName: 'model2',
            className: 'Model2'
        }, {
            modelName: 'model3',
            className: 'Model3'
        }],
        filepath: tempFilepath
    };

    await wcmuseCreator(options);
    const file = await fs.readFile(`${tempFilepath}/${expectedFilename}`, 'utf-8');
    t.true(file !== '\n');
});
