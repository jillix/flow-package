'use strict';

const FlowTools = require('flow-tools');
const libob = require('libobject');

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    if (!libob.isObject(args)) {
        return next(new Error('Flow-tools: args is not an object.'));
    }

    let rules = args.rules;
    let on = args.on || {};

    FlowTools.logic(args.rules, data, (error, result) => {

        if (error) {
            return next(error);
        }

        data.logic = result;

        if (on && on[result]) {
            event.flow(on[result], data);
        }

        next(null, data);
    });
};