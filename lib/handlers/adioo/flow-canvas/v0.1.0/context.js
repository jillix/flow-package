'use strict';

const Canvas = require('./index');

module.exports = (event, state, args, next) => {
    let data = event.data;
    let stream = event.output;

    if (!data.node) {
        //return next(new Error('Flow-visualizer.context: No node provided.'));
        return next(null, data, stream);
    }

    if (!state.canvas) {
        return next(null, data, stream);
    }

    state.canvas.toggle(data.node);
    next(null, data, stream);
};