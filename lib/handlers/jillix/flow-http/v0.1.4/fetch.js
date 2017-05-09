'use strict';

const FlowHttp = require('flow-http');

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    FlowHttp.fetch(args, data, next);
};