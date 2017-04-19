'use strict';

module.exports = (event, state, args, next) => {
    let data = event.data || {};
    let url = args.url || data.url;

    if (!url) {
        return next(new Error('Flow-page.redirect: No url provided.'));
    }

    state.page.redirect(url);

    next();
};