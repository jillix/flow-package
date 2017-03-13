'use strict';

module.exports = (event, state, args, next) => {

    if (!state.view) {
        return next(new Error('Flow-view.addStates: Flow-view not initialized'));
    }

    state.view.addStates(args);

    next();
};