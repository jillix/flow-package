'use strict';

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    // check if a flow-http instance exists
    if (!state.http) {
        return next(new Error('Flow-http.status: HTTP server not configured.'));
    }

    state.http.status(data, next);
};