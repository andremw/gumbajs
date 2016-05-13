'use strict';

const createModel = require('./model-creator');
const basicStructureCreator = require('./basic-structure-creator');
const fiveTo6 = require('./5-to-6/5-to-6');
const configCheck = require('./config-check');

module.exports = mainConfig => {
    configCheck(['componentsDirPath'], mainConfig);

    return {
        createModel: config => {
            return createModel(Object.assign(config, mainConfig));
        },
        basicStructure: config => {
            return basicStructureCreator(Object.assign(config, mainConfig));
        },
        fiveTo6: config => {
            return fiveTo6(Object.assign(config, mainConfig));
        }
    };
};
