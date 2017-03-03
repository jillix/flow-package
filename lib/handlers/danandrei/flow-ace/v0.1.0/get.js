'use strict';

const Ace = require('flow-ace');
const libobject = require('libobject');

module.exports = (event, state, args, next) => {
    let data = event.data;

    if (!state.ace) {
        return next(new Error('Flow-ace.set: Editor not found.'));
    }

    libob.path.set(args, data, state.ace.get());
    next(null, data);
};