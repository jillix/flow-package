'use strict';

const Registry = require('../../../../../');

module.exports = (event, state, args, next) => {
    let data = event.data || {};
    event.args = event.args || {};

    if (!data.fn) {
        return next(new Error('Flow-registry.getBundle: Function missing.'));
    }

    Registry.getBundle(data.fn, {
        production: event.args.production,
        env: event.args.bundleEnv
    }, (err, file) => {

        if (err) {
            return next(err);
        }

        data.file = file;
        next(null, data);
    });
};