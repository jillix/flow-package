'use strict';

const EditorApi = require('editor-api');
const resolve = require('path').resolve;

module.exports = (event, state, args, next) => {

    if (state.api) {
        return next();
    }

    let config = JSON.parse(JSON.stringify(args));

    if (config.dir) {
        config.dir = resolve(process.env.flow_base, '../', config.dir || 'projects')
    }

    try {
        state.api = EditorApi(config);
    } catch (e) {
        return next(e);
    }

    next();
};