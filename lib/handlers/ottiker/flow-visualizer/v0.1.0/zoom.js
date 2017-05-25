'use strict';

module.exports = (event, state, args, next) => {

    if (!state.VIS) {
        return next(new Error('Flow-visualizer: No flow-visualizer instance found on state.'));
    }

    state.VIS.zoom(args);
    next();
};