'use strict';

const FlowView = require('flow-view');

module.exports = (event, state, args, next) => {

    if (state.view) {
        return next();
    }

    // initialize FlowView
    state.view = FlowView(args);

    // listen for DOM events
    state.view.on('DOMevent', eventData => {
        event.flow(eventData.name, eventData.data);
    });

    next();
};