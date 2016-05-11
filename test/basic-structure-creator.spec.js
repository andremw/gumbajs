'use strict';

const test = require('ava').test;
const tempWrite = require('temp-write');
const fs = require('promised-io/fs');

const generator = require('../src/');
const dirhandler = require('./fixtures/dirhandler');
const TEMP_FOLDER = './tmp';
let gen = null;

let folderPath = null;

test.before(async () => {
    folderPath = `.${tempWrite.sync('basicStructure')}`;
    await dirhandler.createFolder(TEMP_FOLDER);
    await fs.mkdir(folderPath);
    gen = generator({
        componentsFolderPath: folderPath
    });
});

test('Fails without required config', async t => {
    t.throws(() => {
        gen.basicStructure({
            componentName: 'whatever'
        });
    }, 'componentGroup is required!');

    t.throws(() => {
        gen.basicStructure({
            componentGroup: 'whatever'
        }, 'componentName is required!');
    });
});

test.only.serial('Creates basic structure files', async t => {
    const componentName = 'GiftGrid';
    const componentGroup = 'Marketing Services Components';
    const expectedFiles = ['.content.xml', '_cq_editConfig.xml', 'dialog.xml', `${componentName}.html`];

    const options = {
        componentGroup,
        componentName
    };

    await gen.basicStructure(options);
    const filepath = `${folderPath}/${expectedFiles[0]}`;
    const fileContent = await fs.readFile(filepath, 'utf-8');
    t.true(fileContent !== '\n');
    /*
    expectedFiles.forEach(async file => {
        const filepath = `${folderPath}/${file}`;
        console.log(`FILEPATH: ${filepath}`);
        const fileContent = await fs.readFile(filepath, 'utf-8');
        t.true(fileContent !== '\n');
    });
    */
});
