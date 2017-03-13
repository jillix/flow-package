'use strict';

const DEFAULT_OPTIONS = {
    url: '/',
    notDefined: 'notFound'
};

module.exports = (event, state, args, next) => {
    let data = event.data;

    if (!state.router || !state.config) {
        return next(new Error('Flow-router: Router not initialized.'));
    }

    // define options
    let options = {};
    Object.keys(DEFAULT_OPTIONS).forEach(optionName => {
        options[optionName] = args[optionName] || data[optionName] || state.config[optionName] || DEFAULT_OPTIONS[optionName];
    });

    // remove querystring from url
    options.url = options.url.split(/[?#]/)[0];

    let route = state.router(options.url);

    // setup data object
    if (!route) {
        route = { data: options.notDefined }
    }
    data.route = route.data;
    if (route.params) {
        data.params = route.params
    }

    next(null, data);
};