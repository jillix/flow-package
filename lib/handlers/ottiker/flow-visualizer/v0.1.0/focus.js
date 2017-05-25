'use strict';

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    if (!state.VIS) {
        return next(new Error('Flow-visualizer: No flow-visualizer instance found on state.'));
    }

    // look in the data object for a custom scale value
    if (data.scale) {
        args.scale = data.scale;
    }

    let nodeId = data.node ? (data.node.id || data.node) : null;
    state.VIS.focus(nodeId, args);

    next();
};