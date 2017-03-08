'use strict';

const VIS = require('flow-visualizer');

module.exports = (event, state, args, next) => {

    state.VIS.manipulation.reset();
    next();
};