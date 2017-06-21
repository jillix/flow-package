'use strict';

module.exports = (event, state, args, next) => {
    let data = event.data;

    if (!state.ace) {
        return next(new Error('Flow-ace.set: Editor not found.'));
    }

    let options = data.options || args.options || {};

    state.ace.setOptions(options);
    next();
};