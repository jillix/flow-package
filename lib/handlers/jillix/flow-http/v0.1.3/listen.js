'use strict';

const FlowHttp = require('flow-http');
const resolve = require('path').resolve;

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    // init flow-http if it is not already initialized
    if (!state.http) {
        state.http = FlowHttp();
    }

    if (!event.args.ssl || !event.args.ssl.cert || !event.args.ssl.key) {
        return next(new Error('Flow-http.listen: A valid ssl config must pe provided.'));
    }

    // create the config object
    let config = {
        ssl: {
            cert: resolve(process.env.flow_base, '../', event.args.ssl.cert),
            key: resolve(process.env.flow_base, '../', event.args.ssl.key)
        },
        port: event.args.port || data.port,
        methods: args.methods || {},
        role: event.args.role,
        cors: event.args.cors || {}
    };

    state.http.listen(config, (err, eventData) => {

        if (err) {
            return next(err);
        }

        event.flow(eventData.method, eventData);
        next();
    });
};