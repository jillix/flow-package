'use strict';

const Builder = require('builder');

module.exports = (event, state, args, next) => {
    let config = JSON.parse(JSON.stringify(args));

    if (state.builder) {
        return next();
    }

    try {
        state.builder = Builder(args);
    } catch (e) {
        return next(new Error('Builder.init: ' + e.message));
    }

    state.builder.on('search_fetchResults', e => {
        event.flow(e.name, {
            search: e.query
        });
    });

    state.builder.on('search_resultSelected', e => {
        event.flow(e.name, {
            item: e.item
        });
    });

    next();
};