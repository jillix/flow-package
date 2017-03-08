'use strict';

// Dependencies
const FlowKeypress = require('flow-keypress');

module.exports = (event, state, args, next) => {
    let scope = event.scope;

    args = args || {};
    args.defaultContext = args.defaultContext || 'graph';
    state.keypress = FlowKeypress(args);
    state.events = args.events || {};

    // setup event interface
    // TODO this is temporary
    Object.keys(state.events).forEach(eventName => {
        state.keypress.on(eventName, eventData => {
            scope.flow(state.events[eventName]).write(eventData);
        });
    });

    next();
};