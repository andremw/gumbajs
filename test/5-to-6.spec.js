'use strict';

const test = require('ava').test;

const fiveTo6 = require('../src/5-to-6/5-to-6');
const api = require('../src/api');
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
    await api.fiveTo6({
        contentComponentDir: xmlDir,
        componentName: 'productlocator',
        outputPath: tempFilepath
    });

    t.pass();
});
