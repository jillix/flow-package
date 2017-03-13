'use strict';

module.exports = (event, state, args, next) => {
    let data = event.data;

    if (!data.node || !state.canvas) {
        return next();
    }

    state.canvas.toggle(data.node);
    next();
};