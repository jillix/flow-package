'use strict';

const VIS = require('flow-visualizer');

module.exports = (event, state, args, next) => {
    let data = event.data || {};
    let stream = event.output;

    let triples;
    if (!(data instanceof Array) && args.key && data[args.key]) {
        triples = data[args.key];
        data.nodes = [];
        data.edges = [];
    } else {
        triples = data;
        data = {
            nodes: [],
            edges: []
        };
    }

    let result = state.VIS.parse(triples, data.node, args.onlyParse);

    if (result instanceof Error) {
        return next(result);
    }

    data.nodes = result.nodes;
    data.edges = result.edges;

    return next(null, data, stream);
};