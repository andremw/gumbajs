'use strict';

module.exports = object => {
    if (!object) {
        throw new Error('You forgot to pass the object that must be parsed..');
    }

    const parsedAttribute = {
        defaultValue: handleDefaultValue(object.defaultValue),
        name: handleName(object.name),
        type: handleType(object.xtype),
        optional: handleOptional(object.allowBlank)
    };

    return parsedAttribute;
};

function handleDefaultValue(value) {
    value = value || '';
    const parsedValue = value.replace('{Boolean}', '');
    return parsedValue;
}

function handleName(name) {
    name = name || '';
    const parsedValue = name.replace('./', '');
    return parsedValue;
}

function handleType(type) {
    const typeReferences = {
        textfield: 'string',
        selection: 'string',
        colorfield: 'string',
        multifield: 'list'
    };
    return typeReferences[type] || '';
}

function handleOptional(allowBlank) {
    allowBlank = allowBlank || 'true';
    const parsedValue = allowBlank.replace('{Boolean}', '');
    return parsedValue === 'true';
}
