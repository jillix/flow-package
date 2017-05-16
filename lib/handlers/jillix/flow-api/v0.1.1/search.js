"use strict";

////const FlowApi = require("flow-api");
//const resolve = require("path").resolve;

module.exports = (event, state, args, next) => {

    /*if (!state.api) {
        FlowApi()
    }


    data.body = data.body || {};

    if (!state.api) {
        return next(new Error("Service-api.project.create: No API instance found on the state object."));
    }*/

    let data = event.data || {};
    new Promise((resolve, reject) => {
        resolve([
            ["sequence_id", "<RDF_TYPE>", "<http://schema.jillix.net/vocab/Sequence>"],
            ["sequence_id", "<http://schema.org/name>", "Sequence Name"]
        ]);
    }).then(res => {
        data.body = res;
        next(null, data);
    }).catch(err => {
        next(err);
    });
};
