'use strict';

const Canvas = require('./index');

module.exports = (event, state, args, next) => {
    let data = event.data;
    let stream = event.output;

    if (state.VIS && state.VIS.visualization) {
        state.canvas = Canvas(state.VIS.visualization, state.VIS.options.config);
    }

    return next(null, data, stream);
};