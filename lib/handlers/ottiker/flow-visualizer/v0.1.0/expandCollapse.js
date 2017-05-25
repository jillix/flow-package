'use strict';

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    let nodeId = data.node ? (data.node.id || data.node) : null;
    if (!state.VIS) {
        return next(new Error('Flow-visualizer: No flow-visualizer instance found on state.'));
    }

    let nodeId = data.node ? (data.node.id || data.node) : null;
    state.VIS.expandCollapse(nodeId);
    next();
};