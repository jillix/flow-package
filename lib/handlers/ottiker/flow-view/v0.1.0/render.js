'use strict';

const OPTIONS = [
    'tmpl',
    'title',
    'position',
    'clearList',
    'leaveKeys',
    'dontEscape',
    'dontPrevent'
];

module.exports = (event, state, args, next) => {
    let data = event.data;
    args = args || {};

    if (!state.view) {
        return next(new Error('Flow-view.render: Flow-view not initialized'));
    }

    let options = {};
    OPTIONS.forEach(optionName => {
        options[optionName] = args[optionName] || data[optionName]
    });

    data.data = data.data || {};
    state.view.render(options, data.data, err => {

        if (err) {
            return next('Flow-view.render: ' + err.message);
        }

        next();
    });
};