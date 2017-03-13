'use strict';

const Builder = require('builder');

module.exports = (event, state, args, next) => {
    state.builder = Builder(args);
    state.events = args.events || {};

    // listen for events
    Object.keys(state.events).forEach(eventName => {
        state.builder.search.on(eventName, eventData => {
            event.flow(state.events[eventName], eventData);
        });
    });

    next();
};