'use strict';

const FlowTools = require('flow-tools');

module.exports = (event, state, args, next) => {
    let data = event.data || {};
    let emit = data.emit || args.emit;
    if (!emit) {
        return next(new Error('Flow-tools.emit: Event not found.'));
    }

    event.flow(emit, data);
    next(null, data);
};