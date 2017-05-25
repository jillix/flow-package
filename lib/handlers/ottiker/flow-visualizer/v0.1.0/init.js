'use strict';

const VIS = require('flow-visualizer');

module.exports = (event, state, args, next) => {

    if (state.VIS) {
        return next();
    }

    // setup flow-visualizer
    try {
        let config = JSON.parse(JSON.stringify(args));
        state.VIS = VIS(config);
    } catch (error) {
        console.log(error)
        return next(error);
    }

    // setup events
    state.VIS.events(event => {
        console.log(event);
    });

    return next();
};