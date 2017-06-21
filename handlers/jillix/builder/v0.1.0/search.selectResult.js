'use strict';

module.exports = (event, state, args, next) => {

    if (!state.builder) {
        return next('Builder.Search.selectResult: no builder instance found.');
    }

    state.builder.search.selectResult();
    next();
};