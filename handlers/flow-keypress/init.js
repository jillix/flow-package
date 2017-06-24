'use strict';

// Dependencies
const FlowKeypress = require('flow-keypress');

module.exports = (event, state, args, next) => {
    args = args || {};

    if (state.keypress) {
        return next();
    }

    state.keypress = FlowKeypress(args);

    // setup event interface
    state.keypress.on('keyEvent', eventData => {
        event.flow(eventData.name, eventData.data);
    });

    next();
};