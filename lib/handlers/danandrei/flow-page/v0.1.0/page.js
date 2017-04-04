'use strict';

module.exports = (event, state, args, next) => {
    let data = event.data || {};
    let url = args.url || data.url;

    if (!url) {
        return next(new Error('Flow-page.page: No url provided.'));
    }

    if (!state.page) {
        return next(new Error('Flow-page.page: No Flow-page instance found on the state object.'));
    }

    state.page.page(url);

    next();
};