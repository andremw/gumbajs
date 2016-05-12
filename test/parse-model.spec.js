'use strict';

const test = require('ava').test;
const parseModel = require('../src/helper/parse-model');

// let simpleObj = null;
let commonObj = null;

test.beforeEach(() => {
    commonObj = {
        defaultValue: '{Boolean}false',
        name: './whatever',
        xtype: ''
    };

    // simpleObj = {
    //     defaultValue: '{Boolean}false',
    //     type: 'checkbox',
    //     xtype: 'selection',
    //     inputValue: 'yes',
    //     name: './hideProductDropdown',
    //     fieldLabel: 'Hide Product List',
    //     fieldDescription: 'If checked, the product list will not be visible. The search will always be performed using the selected product.'
    // };
});

test.only('defaultValue and name must be parsed correctly', t => {
    const actual = parseModel(commonObj);
    t.is(actual.defaultValue, 'false', 'defaultValue that contains {Boolean} must be parsed without it');
    t.is(actual.name, 'whatever', 'name that contains ./ must be parsed without it');
});

test.only('[xtype] textfield is parsed as string', t => {
    commonObj.xtype = 'textfield';
    const actual = parseModel(commonObj);
    t.is(actual.type, 'string', expectedMsg('string', actual.type));
});

test.only('[xtype] selection is parsed as string', t => {
    commonObj.xtype = 'selection';
    const actual = parseModel(commonObj);
    t.is(actual.type, 'string', expectedMsg('string', actual.type));
});

test.only('[xtype] colorfield is parsed as string', t => {
    commonObj.xtype = 'colorfield';
    const actual = parseModel(commonObj);
    t.is(actual.type, 'string', expectedMsg('string', actual.type));
});

test.todo('[xtype] multifield is parsed as list and with its key');

test.skip('parse model from simple object', t => {
    const simpleObj = {
        defaultValue: '{Boolean}false',
        type: 'checkbox',
        xtype: 'selection',
        inputValue: 'yes',
        name: './hideProductDropdown',
        fieldLabel: 'Hide Product List',
        fieldDescription: 'If checked, the product list will not be visible. The search will always be performed using the selected product.'
    };

    const expected = {
        type: 'string',
        defaultValue: 'false'
    };

    const actual = parseModel(simpleObj);

    t.equal(actual, expected);
});

function expectedMsg(expected, actual) {
    return `expected "${expected}" but got "${actual}"`;
}
