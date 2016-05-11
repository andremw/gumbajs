'use strict';

const _createModel = require('./create-model.js');

module.exports = mainConfig => {
    checkConfig(mainConfig);

    return {
        createModel: config => {
            return _createModel(Object.assign(config, mainConfig));
        }
    };
};

function checkConfig(mainConfig) {
    mainConfig = mainConfig || {};
}
