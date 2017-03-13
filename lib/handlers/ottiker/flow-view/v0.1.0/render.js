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

    if (!state.view) {
        return next(new Error('Flow-view.render: Flow-view not initialized'));
    }

    let options = {};
    OPTIONS.forEach(optionName => {
        options[optionName] = args[optionName] || data[optionName]
    });

    state.view.render(options, err => {

        if (err) {
            return next('Flow-view.render: ' + err.message);
        }

        next();
    });
};