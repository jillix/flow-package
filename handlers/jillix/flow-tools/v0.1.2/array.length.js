'use strict';

const FlowTools = require('flow-tools');

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    FlowTools.array.length(args, data, (error, length) => {

        if (error) {
            return next(error);
        }

        data.length = length;
        next(null, data);
    });
};