'use strict';

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    if (!state.api) {
        return next(new Error('Service-api.project.create: No API instance found on the state object.'));
    }

    next();
};