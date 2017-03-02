'use strict';

const VIS = require('flow-visualizer');

module.exports = (event, state, args, next) => {
    let stream = event.output;

    state.VIS.manipulation.reset();
    return next(null, data, stream);
};