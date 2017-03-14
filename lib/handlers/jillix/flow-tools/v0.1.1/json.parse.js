'use strict';

const FlowTools = require('flow-tools');

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    FlowTools.json.parse(args, data, next);
};