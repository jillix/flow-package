'use strict';

const Canvas = require('flow-canvas');

module.exports = (event, state, args, next) => {

    if (state.canvas) {
        return next();
    }

    if (state.VIS && state.VIS.visualization) {
        state.canvas = Canvas(state.VIS.visualization, state.VIS.options.config);
    }

    next();
};