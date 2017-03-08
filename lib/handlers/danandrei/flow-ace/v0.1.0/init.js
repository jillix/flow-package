'use strict';

const Ace = require('flow-ace');

module.exports = (event, state, args, next) => {

    state.ace = new Ace(args);
    next();
};