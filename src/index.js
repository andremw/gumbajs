'use strict';

const createModel = require('./create-model.js');

module.exports = mainConfig => {
    checkConfig(mainConfig);

    return {
        createModel: config => {
            return createModel(Object.assign(config, mainConfig));
        }
    };
};

function checkConfig(mainConfig) {
    mainConfig = mainConfig || {};
}
