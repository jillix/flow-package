'use strict';

const VIS = require('flow-visualizer');

module.exports = (event, state, args, next) => {
    let data = event.data || {};
    let stream = event.output;

    if (!data.node || !data.node.id) {
        return next(new Error('Flow-visualizer.remove: No node provided.'));
    }

    state.VIS.manipulation.remove(data.node.id);

    return next(null, data, stream);
};