'use strict';

const FlowTools = require('flow-tools');

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    if (!(args instanceof Array)) {
        return next(new Error('Flow-tools.transform: Invalid arguments.'));
    }

    switch (args[0]) {
        case "dd":
            FlowTools.transform(args[1], data, data);
            break;
        case "ss":
            FlowTools.transform(args[1], state, state);
            break;
        case "ds":
            FlowTools.transform(args[1], data, state);
            break;
        case "sd":
            FlowTools.transform(args[1], state, data);
            break;
        case "ed":
            FlowTools.transform(args[1], event.args, data);
            break;
        case "es":
            FlowTools.transform(args[1], event.args, state);
            break;
        default:
            return next(new Error('Flow-tools.transform2: Invalid mode "' + args[0] + '"'));
    }

    next(null, data);
};