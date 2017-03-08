'use strict';

const VIS = require('flow-visualizer');

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    let node = state.VIS.visualization.getSelectedNode();
    data.node = node;

    return next(null, data);
};