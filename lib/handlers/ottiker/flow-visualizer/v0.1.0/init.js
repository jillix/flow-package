'use strict';

const VIS = require('flow-visualizer');

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    if (!args.parse) {
        return next(new Error('Flow-visualizer.init: No parse config found.'));
    }

    if (!args.events) {
        return next(new Error('Flow-visualizer.init: No event interface config found.'));
    }

    if (!args.view || !document.querySelector(args.view)) {
        return next(new Error('Flow-visualizer: DOM data.node not found.'));
    }

    state.VIS = new VIS(args);
    state.events = args.events;

    // setup event interface
    // TODO this is temporary
    Object.keys(state.events).forEach(eventName => {
        state.VIS.interaction.on(eventName, eventData => {
            event.flow(state.events[eventName], eventData);
        });
    });

    return next();
};