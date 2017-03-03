'use strict';

const VIS = require('flow-visualizer');

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    let nodeId = data.node ? (data.node.id || data.node) : null;
    if (!nodeId) {
        return next(new Error('Flow-visualizer.expandCollapse: No node provided.'));
    }

    state.VIS.interaction.expandCollapse(nodeId);
    next();
};