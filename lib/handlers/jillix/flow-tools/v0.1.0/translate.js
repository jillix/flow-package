'use strict';

const FlowTools = require('flow-tools');

module.exports = (event, state, args, next) => {
    data = FlowTools.translate(args, event.data || {});

    if (data instanceof Error) {
        return next(data);
    }

    return next(null, data);
};