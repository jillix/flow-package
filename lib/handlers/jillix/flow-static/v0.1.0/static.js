'use strict';

const FlowStatic = require('flow-static');
const url = require('url');

module.exports = (event, state, args, next) => {
    let data = event.data || {};
    event.args = event.args || {};
    args = args || {};

    // create the config object
    let config = {
        appDir: event.args._appDir,
        wd: args.wd || '',
        file: args.file || data.file || data.params.name || url.parse(data.req.url).pathname.substr(1),
        headers: data.headers ? Object.assign(args.headers, data.headers) : args.headers
    };

    try {
        FlowStatic(config, data.req, data.res);
        next();
    } catch (e) {
        next(e);
    }
};