'use strict';

module.exports = (event, state, args, next) => {
    let data = event.data || {};
    data.node = data.node || {};

    if (!state.VIS) {
        return next(new Error('Flow-visualizer: No flow-visualizer instance found on state.'));
    }

    state.VIS.remove(data.node.id).then(() => {
        next();
    }, error => next(error));
};