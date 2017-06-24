"use strict";

const FlowApi = require("flow-api");
//const resolve = require("path").resolve;

module.exports = (event, state, args, next) => {

    /*if (!state.api) {
        FlowApi()
    }

    data.body = data.body || {};

    if (!state.api) {
        return next(new Error("Service-api.project.create: No API instance found on the state object."));
    }*/
    //FlowApi.search();
    new Promise((resolve, reject) => {
        resolve([
            ["sequence_id", "<RDF_TYPE>", "<http://schema.jillix.net/vocab/Sequence>"],
            ["sequence_id", "<http://schema.org/name>", "Sequence Name"]
        ]);
    }).then(res => {
        next(null, {body: res});
    }).catch(err => {
        next(err);
    });
};
