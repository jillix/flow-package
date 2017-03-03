'use strict';

const VIS = require('flow-visualizer');

module.exports = (event, state, args, next) => {
    let data = event.data || {};
    let stream = event.output;

    state.VIS.interaction.zoom(args);
    return next(null, data, stream);
};