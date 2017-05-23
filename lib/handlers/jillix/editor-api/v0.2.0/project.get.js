'use strict';

const resolve = require('path').resolve;

module.exports = (event, state, args, next) => {
    let data = event.data || {};
    data.body = data.body || {};

    if (!state.api) {
        return next(new Error('Service-api.project.get: No API instance found on the state object.'));
    }

    state.api.project.get(data.id)
    .then(res => {
        data.body = res;
        next(null, data);
    }).catch(err => {
        next(err);
    });
};
