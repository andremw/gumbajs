'use strict';

const createModel = require('./model-creator');
const basicStructureCreator = require('./basic-structure-creator');
const configCheck = require('./config-check');

module.exports = mainConfig => {
    configCheck(['componentsFolderPath'], mainConfig);

    return {
        createModel: config => {
            return createModel(Object.assign(config, mainConfig));
        },
        basicStructure: config => {
            return basicStructureCreator(Object.assign(config, mainConfig));
        }
    };
};
