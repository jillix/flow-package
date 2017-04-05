'use strict';

const Ace = require('flow-ace');

module.exports = (event, state, args, next) => {

    if (state.ace) {
        return next();
    }

    state.ace = new Ace(args);
    next();
};