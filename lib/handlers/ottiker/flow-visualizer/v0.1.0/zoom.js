'use strict';

const VIS = require('flow-visualizer');

module.exports = (event, state, args, next) => {
    state.VIS.interaction.zoom(args);
    next();
};