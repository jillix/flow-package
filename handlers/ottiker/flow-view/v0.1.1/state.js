'use strict';

const OPTIONS = [
    'name',
    'selector',
    'element',
    'tmpl'
];

module.exports = (event, state, args, next) => {
    let data = event.data;

    if (!state.view) {
        return next(new Error('Flow-view.state: Flow-view not initialized'));
    }

    let options = {};
    OPTIONS.forEach(optionName => {
        options[optionName] = args[optionName] || data[optionName]
    });

    state.view.state(options, err => {

        if (err) {
            return next('Flow-view.state: ' + err.message);
        }

        next();
    });
};