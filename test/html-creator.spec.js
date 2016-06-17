'use strict';

const test = require('ava').test;
const fs = require('promised-io/fs');

const htmlCreator = require('../src/html-creator');
const tempDirCreator = require('./fixtures/temp-dir-creator');

test('Fails without required config', t => {
    t.throws(() => {
        htmlCreator();
    }, 'filepath is required!');

    t.throws(() => {
        htmlCreator({
            filepath: 'whatever'
        });
    }, 'componentModelFolder is required!');

    t.throws(() => {
        htmlCreator({
            filepath: 'whatever',
            componentModelFolder: 'whatever'
        });
    }, 'controllerName is required!');

    t.throws(() => {
        htmlCreator({
            filepath: 'whatever',
            componentModelFolder: 'whatever',
            controllerName: 'whatever'
        });
    }, 'models is required!');

    t.throws(() => {
        htmlCreator({
            filepath: 'whatever',
            componentModelFolder: 'whatever',
            controllerName: 'whatever',
            models: 'whatever'
        });
    }, 'packageName is required!');
});

test('Creates HTML', async t => {
    const tempFilepath = await tempDirCreator();
    const expectedFilename = 'ComponentX.html';

    const options = {
        packageName: 'marketingservices',
        controllerName: 'MyWCMUse',
        componentModelFolder: 'ComponentX',
        filepath: tempFilepath,
        models: [{
            modelName: 'model1',
            modelAttrs: [{name: 'attrs1'}, {name: 'attrs2'}]
        }, {
            modelName: 'model2',
            modelAttrs: [{name: 'attrs1'}, {name: 'attrs2'}]
        }]
    };

    await htmlCreator(options);
    const file = await fs.readFile(`${tempFilepath}/${expectedFilename}`, 'utf-8');
    t.true(file !== '\n');
});
