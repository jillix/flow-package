'use strict';

module.exports = (event, state, args, next) => {

    if (!state.view) {
        return next(new Error('Flow-view.addTemplates: Flow-view not initialized'));
    }
    if (!args.templates) {
        return next();
    }

    state.view.addTemplates(args.templates);

    next();
};