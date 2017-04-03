'use strict';

module.exports = (event, state, args, next) => {

    if (!state.builder) {
        return next('Builder.Search.focus: no builder instance found.');
    }

    state.builder.search.focus();
    next();
};