'use strict';

const test = require('ava').test;

const parseModel = require('../src/helper/parse-model');
const unparsedModels = require('./fixtures/unparsedModels');

test('throws an error when no object is passed', async t => {
    t.throws(() => {
        parseModel();
    });
});

test('parses an object with one array of attributes', t => {
    const expectedObj = [{
        defaultValue: '',
        name: 'googleMapsKey',
        type: 'string',
        optional: false
    }];
    const actual = parseModel(unparsedModels.singleObjectWithArray);
    t.deepEqual(actual, expectedObj);
});

test('parses an object with some arrays of attributes', t => {
    const expectedObj = [{
        defaultValue: '',
        name: 'beverage',
        type: 'string',
        optional: false
    }, {
        defaultValue: '',
        name: 'brand',
        type: 'string',
        optional: false
    }, {
        defaultValue: '',
        name: 'product',
        type: 'string',
        optional: true
    }, {
        defaultValue: 'false',
        name: 'hideProductDropdown',
        type: 'string',
        optional: true
    }];
    const actual = parseModel(unparsedModels.flatModel);
    t.deepEqual(actual, expectedObj);
});

test('parses an object with some arrays of attributes nested within other arrays of attributes', t => {
    const expectedObj = [{
        defaultValue: '',
        name: 'googleMapsKey',
        type: 'string',
        optional: false
    }, {
        defaultValue: '',
        name: 'productLocatorApiClientID',
        type: 'string',
        optional: false
    }, {
        defaultValue: '',
        name: 'beverage',
        type: 'string',
        optional: false
    }, {
        defaultValue: '',
        name: 'brand',
        type: 'string',
        optional: false
    }, {
        defaultValue: '',
        name: 'product',
        type: 'string',
        optional: true
    }, {
        defaultValue: '',
        name: 'hideProductDropdown',
        type: 'string',
        optional: true
    }];
    const actual = parseModel(unparsedModels.bigModel);
    t.deepEqual(actual, expectedObj);
});

test.skip('parses a multifieldpanel', t => {
    t.fail();
});
