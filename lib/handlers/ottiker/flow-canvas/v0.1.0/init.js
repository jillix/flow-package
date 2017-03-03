'use strict';

const Canvas = require('./index');

module.exports = (event, state, args, next) => {

    if (state.VIS && state.VIS.visualization) {
        state.canvas = Canvas(state.VIS.visualization, state.VIS.options.config);
    }

    next();
};