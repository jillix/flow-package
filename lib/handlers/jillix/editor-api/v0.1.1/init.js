'use strict';

const EditorApi = require('editor-api');

module.exports = (event, state, args, next) => {

    if (state.api) {
        return next();
    }

    let config = JSON.parse(JSON.stringify(args));
    state.api = EditorApi(config);

    next();
};