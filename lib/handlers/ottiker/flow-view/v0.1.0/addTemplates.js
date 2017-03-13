'use strict';

module.exports = (event, state, args, next) => {

    if (!state.view) {
        return next(new Error('Flow-view.addTemplates: Flow-view not initialized'));
    }

    state.view.addTemplates(args);

    next();
};