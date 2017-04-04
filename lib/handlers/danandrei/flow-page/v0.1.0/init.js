'use strict';

const FlowPage = require('flow-page');

module.exports = (event, state, args, next) => {
    let config = JSON.parse(JSON.stringify(args));

    try {
        state.page = FlowPage(config);
    } catch (e) {
        return next('Flow-page.init: ' + e.message);
    }

    state.page.on('pageChanged', e => {
        event.flow(e.name, {
            context: e.context
        });
    });

    next();
};