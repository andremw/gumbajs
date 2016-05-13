'use strict';

const test = require('ava').test;

const fiveTo6 = require('../src/5-to-6/5-to-6');
const generator = require('../src/api');
const tempDirCreator = require('./fixtures/tempDirCreator');
const xmlDir = '../../komarketingservices/content/src/main/content/jcr_root/apps/marketingservices/components/productlocator';

let tempFilepath = null;

test.before('creates the /tmp folder', async () => {
    tempFilepath = await tempDirCreator();
});

test('Fails without required config', t => {
    t.throws(() => {
        fiveTo6();
    });
});

test('creates model', async t => {
    const gen = generator({
        componentsDirPath: 'not needed now'
    });

    await gen.fiveTo6({
        contentComponentDir: xmlDir,
        componentName: 'productlocator',
        outputPath: tempFilepath
    });

    t.pass();
});
