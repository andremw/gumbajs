'use strict';

const test = require('ava').test;
const fs = require('promised-io/fs');

const generator = require('../src/api');

const tempDirCreator = require('./fixtures/temp-dir-creator');

let gen = null;
let dirPath = null;

test.before(async () => {
    dirPath = await tempDirCreator();
    gen = generator({
        componentsDirPath: dirPath
    });
});

test('Fails without required config', t => {
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

test('Creates basic structure files', async t => {
    const componentName = 'GiftGrid';
    const componentGroup = 'Marketing Services Components';
    const expectedFiles = ['.content.xml', '_cq_editConfig.xml', 'dialog.xml', `${componentName}.html`];

    const options = {
        componentGroup,
        componentName
    };

    await gen.basicStructure(options);
    expectedFiles.forEach(async file => {
        const filepath = `${dirPath}/${componentName}/${file}`;
        const fileContent = await fs.readFile(filepath, 'utf-8');
        t.true(fileContent !== '\n', `${file} was created successfully.`);
    });
});
