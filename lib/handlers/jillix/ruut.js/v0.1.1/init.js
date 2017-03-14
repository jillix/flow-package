'use strict';

// Dependencies
const Ruut = require('ruut.js');

module.exports = (event, state, args, next) => {
    args = args || {};

    if (!args.routes) {
        return next(new Error('Flow-router.init: No routes in config'));
    }

    state.config = args;
    state.router = Ruut(args.routes);

    next();
};