'use strict';

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    if (!data.event || !state.builder) {
        return next();
    }

    if (data.event.keyCode === 40) {
        state.builder.search.navigateResults('down');
    } else if (ata.event.keyCode === 40) {
        state.builder.search.navigateResults('up');
    }

    next();
};