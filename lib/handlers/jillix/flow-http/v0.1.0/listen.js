'use strict';

const FlowHttp = require('flow-http');

module.exports = (event, state, args, next) => {
    event.args = event.args || {};
    event.data = event.data || {};

    // init flow-http if it is not already initialized
    if (!state.http) {
        state.http = FlowHttp();
    }

    // create the config object
    let config = {
        ssl: event.args.ssl,
        port: event.args.port || data.port,
        methods: args.methods || {},
        role: event.args.role,
        cors: event.args.cors || {}
    };

    state.http.listen(config, next);
};