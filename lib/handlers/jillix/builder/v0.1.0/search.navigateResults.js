'use strict';

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    if (!data || !state.builder) {
        return next('Builder.Search.navigateResults: no builder instance found.');
    }

    if (data.keyCode === 40) {
        state.builder.search.navigateResults('down');
    } else if (data.keyCode === 38) {
        state.builder.search.navigateResults('up');
    }

    next();
};