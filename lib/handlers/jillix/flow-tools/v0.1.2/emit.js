"use strict";

const FlowTools = require("flow-tools");

module.exports = (event, state, args, next) => {

    let data = event.data || (args && args.data) || {};
    let emit = data.emit || args.emit;

    if (!emit) {
        return next(new Error("Flow-tools.emit: Event not found."));
    }

    let options = {
        objectMode: args && args.objectMode !== undefined ? args.objectMode : event._readableState.objectMode
    };

    next(null, data, event.pipe(event.flow(emit, data, options)));
};
