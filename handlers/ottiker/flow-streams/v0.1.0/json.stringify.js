'use strict';

const FlowStreams = require('flow-streams');

module.exports = (event, state, args, next) => {
    let data = event.data || {};

    FlowStreams.json.stringify(args, data, next);
};