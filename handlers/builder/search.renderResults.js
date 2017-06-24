'use strict';

module.exports = (event, state, args, next) => {
    let data = event.data || {};
    let items;

    if (!state.builder) {
        return next('Builder.Search.renderResults: no builder instance found.');
    }

    if (!(data instanceof Array) && args.key && data[args.key]) {
        items = data[args.key];
    } else {
        items = data;
    }

    if (!(items instanceof Array)) {
        return next();
    }

    state.builder.search.renderResults(items);
    next();
};