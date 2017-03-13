'use strict';

module.exports = (event, state, args, next) => {
    let data = event.data;

    if (!state.ace) {
        return next(new Error('Flow-ace.set: Editor not found.'));
    }

    let content = typeof args === 'string' ? libobject.path.get(args, data) : "";

    if (typeof content !== 'string') {
        return next(new Error('Flow-ace.set: Cannot set non string data.'));
    }

    state.ace.set(content);
    next();
};