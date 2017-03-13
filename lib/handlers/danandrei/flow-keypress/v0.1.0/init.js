'use strict';

// Dependencies
const FlowKeypress = require('flow-keypress');

module.exports = (event, state, args, next) => {
    args = args || {};
    args.defaultContext = args.defaultContext || 'graph';
    state.keypress = FlowKeypress(args);
    state.events = args.events || {};

    // setup event interface
    // TODO this is temporary
    Object.keys(state.events).forEach(eventName => {
        state.keypress.on(eventName, eventData => {
            event.flow(state.events[eventName], eventData);
        });
    });

    next();
};