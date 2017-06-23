'use strict';

const FlowCanvas = require('flow-canvas');

module.exports = (event, state, args, next) => {

    if (state.FlowCanvas) {
        return next();
    }

    if (state.VIS && state.VIS.network) {
        let config = JSON.parse(JSON.stringify(args));
        state.FlowCanvas = FlowCanvas(state.VIS.network, config);
    }

    next();
};