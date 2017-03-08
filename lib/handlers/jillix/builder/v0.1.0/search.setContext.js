'use strict';

const Builder = require('builder');

module.exports = (event, state, args, next) => {
    let data = event.data || {};
    let context = args.context || data.context;

    if (!context || !state.builder) {
        return next();
    }

    state.builder.search.setContext(context);
    next();
};