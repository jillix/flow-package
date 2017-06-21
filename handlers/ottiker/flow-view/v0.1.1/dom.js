'use strict';

const libob = require('libobject');

module.exports = (event, state, args, next) => {
    let data = event.data;

    if (!state.view) {
        return next(new Error('Flow-view.render: Flow-view not initialized.'));
    }

    if (!libob.isObject(args)) {
        return next(new Error('Flow-view.dom: Args is not an object.'));
    }

    // get an attribute value from a dom element or the element itself
    Object.keys(args).forEach((key) => {
        libob.path.set(key, data, state.view.dom(args[key]))
    });

    next(null, data)
};