'use strict';

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    if (!state.VIS) {
        return next(new Error('Flow-visualizer: No flow-visualizer instance found on state.'));
    }

    let triples;
    if (!(data instanceof Array) && args.key && data[args.key]) {
        triples = data[args.key];
    } else {
        triples = data;
    }

    let result;
    try {
        result = state.VIS.parse(triples);
    } catch (error) {
        return next(error);
    }

    data.nodes = result.nodes;
    data.edges = result.edges;

    return next(null, data);
};