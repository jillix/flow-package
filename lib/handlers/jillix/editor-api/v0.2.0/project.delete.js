'use strict';

const resolve = require('path').resolve;

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    if (!state.api) {
        return next(new Error('Service-api.project.delete: No API instance found on the state object.'));
    }

    state.api.project.delete(data.id)
    .then(res => {
        data.body = res;
        next(null, data);
    }).catch(err => {
        next(err);
    });
};