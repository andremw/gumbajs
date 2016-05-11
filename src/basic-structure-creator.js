'use strict';

// const fs = require('promised-io/fs');
// const Deferred = require('promised-io/promise').Deferred;
// const mustache = require('mustache');
const configCheck = require('./configCheck');

// let deferred = null;

module.exports = config => {
    configCheck(['componentName', 'componentGroup'], config);
};
