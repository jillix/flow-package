'use strict';

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    if (!data.node || !data.node.id) {
        return next(new Error('Flow-visualizer.remove: No node provided.'));
    }

    state.VIS.manipulation.remove(data.node.id);

    next(null, data);
};