"use strict";

const EditorApi = require("editor-api");
const resolve = require("path").resolve;

module.exports = (event, state, args, next) => {

    if (state.api) {
        return next();
    }

    EditorApi(args).then((api) => {
        state.api = api;
        next();
    }).catch(next);
};
