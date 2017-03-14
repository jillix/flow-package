'use strict';

const FlowTools = require('flow-tools');

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    data = FlowTools.deep(data);

    if (data instanceof Error) {
        return next(data);
    }

    return next(null, data);
};