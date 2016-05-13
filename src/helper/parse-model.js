'use strict';

const parseAttrs = require('./parse-attributes');

module.exports = object => {
    if (!object) {
        throw new Error('You forgot to pass the object that must be parsed..');
    }

    const parsedModel = parseModel(object);
    return parsedModel;
};

/**
 * Parses each attribute of the input data to create the model, which is composed
 * by all the attributes, but ONLY if the name attribute is found.
 * @param  {object} model
 * @return {array}       An array with all the properties that compose the model.
 */
function parseModel(model) {
    let parsedAttributes = [];
    const keys = Object.keys(model);
    keys.forEach(key => {
        const prop = model[key];
        if (isArray(prop)) {
            // here we always pass the first element of the array because it always
            // has only one object inside
            const recursivelyParsedAttrs = parseModel(prop[0]);
            parsedAttributes = parsedAttributes.concat(recursivelyParsedAttrs);
        } else {
            const parsedAttr = parseAttrs(prop);
            if (parsedAttr.name) {
                parsedAttributes.push(parsedAttr);
            }
        }
    });

    // print(parsedAttributes);
    return parsedAttributes;
}

function isArray(obj) {
    return Array.isArray(obj);
}

// function print(data) {
//     console.log(`\n\n===== finished parsing ${require('util').inspect(data, {depth: null})} =====\n\n`);
// }
