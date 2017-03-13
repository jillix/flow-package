'use strict';

const FlowView = require('flow-view');

module.exports = (event, state, args, next) => {

    // initialize FlowView
    state.view = FlowView(args);

    // listen for DOM events
    state.view.on('DOMevent', eventData => {
        event.flow(eventData.event, eventData.data);
    });

    next();
};