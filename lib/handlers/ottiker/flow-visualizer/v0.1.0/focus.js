'use strict';

const VIS = require('flow-visualizer');

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    let nodeId = data.focusTo || (data.node ? (data.node.id || data.node) : null);
    if (!nodeId) {
        return next(new Error('Flow-visualizer.focus: No node provided.'));
    }

    // look in the data object for a custom scale value
    if (data.scale) {
        args.scale = data.scale;
    }

    state.VIS.interaction.focus(nodeId, args);

    next();
};