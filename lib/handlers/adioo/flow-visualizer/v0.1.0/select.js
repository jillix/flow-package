'use strict';

const VIS = require('flow-visualizer');

module.exports = (event, state, args, next) => {
    let data = event.data || {};
    let stream = event.output;
    return next(null, data, stream);
};