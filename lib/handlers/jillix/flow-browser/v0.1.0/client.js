"use strict";

const FlowBrowser = require("flow-browser");

module.exports = (sequenceId, options) => {
    const env = FLOW_ENV;

    return FlowBrowser(sequenceId, env, options);
};
