'use strict';

const test = require('ava').test;
const parseAttribute = require('../src/helper/parse-attributes');

let commonObj = null;

test.beforeEach(() => {
    commonObj = {
        defaultValue: '{Boolean}false',
        name: './whatever',
        xtype: '',
        allowBlank: 'true'
    };
});

test.only('defaultValue and name must be parsed correctly', t => {
    const actual = parseAttribute(commonObj);
    t.is(actual.defaultValue, 'false', 'defaultValue that contains {Boolean} must be parsed without it');
    t.is(actual.name, 'whatever', 'name that contains ./ must be parsed without it');
});

test.only('[xtype] textfield is parsed as string', t => {
    commonObj.xtype = 'textfield';
    const actual = parseAttribute(commonObj);
    t.is(actual.type, 'string', expectedMsg('string', actual.type));
});

test.only('[xtype] selection is parsed as string', t => {
    commonObj.xtype = 'selection';
    const actual = parseAttribute(commonObj);
    t.is(actual.type, 'string', expectedMsg('string', actual.type));
});

test.only('[xtype] colorfield is parsed as string', t => {
    commonObj.xtype = 'colorfield';
    const actual = parseAttribute(commonObj);
    t.is(actual.type, 'string', expectedMsg('string', actual.type));
});

test.only('allowBlank is parsed correctly', t => {
    let actual = parseAttribute(commonObj);
    t.is(actual.optional, true, expectedMsg(true, actual.optional));
    commonObj.allowBlank = '{Boolean}false';
    actual = parseAttribute(commonObj);
    t.is(actual.optional, false, expectedMsg(false, actual.optional));
});

test.todo('[xtype] multifield is parsed as list');

test.skip('parse attributes from simple object', t => {
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

    const actual = parseAttribute(simpleObj);

    t.equal(actual, expected);
});

function expectedMsg(expected, actual) {
    return `expected "${expected}" but got "${actual}"`;
}
