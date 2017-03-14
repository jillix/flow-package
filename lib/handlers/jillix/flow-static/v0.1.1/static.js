'use strict';

const FlowStatic = require('flow-static');
const url = require('url');
const path = require('path');

module.exports = (event, state, args, next) => {
    let data = event.data || {};
    event.args = event.args || {};
    args = args || {};

    // create the config object
    let config = {
        appDir: path.resolve(process.env.flow_base, '../'),
        wd: args.wd || '',
        file: args.file || data.file || url.parse(data.req.url).pathname.substr(1),
        headers: data.headers ? Object.assign(args.headers, data.headers) : args.headers
    };

    FlowStatic(config, data.req, data.res, next);
};