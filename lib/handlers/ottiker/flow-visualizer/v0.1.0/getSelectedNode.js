'use strict';

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    if (!state.VIS) {
        return next(new Error('Flow-visualizer: No flow-visualizer instance found on state.'));
    }

    let node = state.VIS.getSelectedNode();
    data.node = node;

    return next(null, data);
};