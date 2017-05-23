'use strict';

const resolve = require('path').resolve;

module.exports = (event, state, args, next) => {
    let data = event.data || {};
    data.body = data.body || {};
    data.body._id = data.id;

    if (!state.api) {
        return next(new Error('Service-api.project.update: No API instance found on the state object.'));
    }

    state.api.project.update(data.body)
    .then(res => {
        data.body = res;
        next(null, data);
    }).catch(err => {
        next(err);
    });
};
