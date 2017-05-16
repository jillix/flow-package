'use strict';

const FlowApi = require('flow-api');

module.exports = (event, state, args, next) => {

    if (state.api) {
        return next();
    }

    let config = JSON.parse(JSON.stringify(args));
    state.api = FlowApi(config);

    next();
};
