'use strict';

const ServiceApi = require('service-api');

module.exports = (event, state, args, next) => {

    if (state.api) {
        return next();
    }

    let config = JSON.parse(JSON.stringify(args));
    state.api = ServiceApi(config);

    next();
};