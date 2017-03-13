'use strict';

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    // check if a flow-http instance exists
    if (!state.http) {
        return next(new Error('Flow-http.trailers: HTTP server not configured.'));
    }

    state.http.trailers(data, next);
};