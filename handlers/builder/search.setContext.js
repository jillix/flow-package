'use strict';

module.exports = (event, state, args, next) => {
    let data = event.data || {};
    let context = args.context || data.context;

    if (!context || !state.builder) {
        return next('Builder.Search.setContext: no builder instance or context found.');
    }

    state.builder.search.setContext(context);
    next();
};