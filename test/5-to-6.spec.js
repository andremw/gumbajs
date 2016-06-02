'use strict';

const test = require('ava').test;
const fs = require('promised-io/fs');

const fiveTo6 = require('../src/api').fiveTo6;
const tempDirCreator = require('./fixtures/tempDirCreator');
const xmlDir = './fixtures/productlocator';

let tempFilepath = null;

test.before('creates the /tmp folder', async () => {
    tempFilepath = await tempDirCreator();
});

test('Fails without required config', t => {
    t.throws(() => {
        fiveTo6({compDir: 'whatever'});
    });

    t.throws(() => {
        fiveTo6({outputDir: 'whatever'});
    });
});

test('creates model', async t => {
    const expFolderName = 'productlocator';
    const expectedFiles = ['BasicSettingsScreen.java', 'ContentTab.java', 'ErrorsTab.java', 'ResultsTab.java', 'ScreenReaderTab.java'];

    await fiveTo6({
        compDir: xmlDir,
        outputDir: tempFilepath,
        packageName: 'marketingservices'
    });

    expectedFiles.forEach(async file => {
        const filepath = `${tempFilepath}/${expFolderName}/${file}`;
        const fileContent = await fs.readFile(filepath, 'utf-8');
        t.true(fileContent !== '\n', `${file} was created successfully.`);
    });
});
