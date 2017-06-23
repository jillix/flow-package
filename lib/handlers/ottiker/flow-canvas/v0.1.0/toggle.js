'use strict';

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    if (!state.FlowCanvas) {
        return next();
    }

    state.FlowCanvas.toggle(data, args);
    next();
};