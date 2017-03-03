'use strict';

const VIS = require('flow-visualizer');

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    if (!args.nodes && !args.edges && !data.nodes && !data.edges) {
        return next(new Error('Flow-visualizer.add: No nodes or edges provided.'));
    }

    state.VIS.manipulation.add({
        nodes: data.nodes || args.nodes,
        edges: data.edges || args.edges
    });

    next();
};