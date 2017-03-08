'use strict';

const Builder = require('builder');

module.exports = (event, state, args, next) => {

    if (!state.builder) {
        return next();
    }

    state.builder.search.focus();
    next();
};