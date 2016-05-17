'use strict';

const test = require('ava').test;

const fiveTo6 = require('../src/api').fiveTo6;
const tempDirCreator = require('./fixtures/tempDirCreator');
const xmlDir = '../../komarketingservices/content/src/main/content/jcr_root/apps/marketingservices/components/productlocator';

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
    await fiveTo6({
        compDir: xmlDir,
        componentName: 'productlocator',
        outputDir: tempFilepath
    });

    t.pass();
});
