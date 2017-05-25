'use strict';

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    if (!state.VIS) {
        return next(new Error('Flow-visualizer: No flow-visualizer instance found on state.'));
    }

    state.VIS.add({
        nodes: data.nodes || args.nodes,
        edges: data.edges || args.edges
    }).then(() => {
        next();
    }, error => next(error));
};