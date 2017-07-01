'use strict';

module.exports = (event, state, args, next) => {

    if (!state.view) {
        return next(new Error('Flow-view.addStates: Flow-view not initialized'));
    }
    if (!args.states) {
        return next();
    }

    state.view.addStates(args.states);

    next();
};