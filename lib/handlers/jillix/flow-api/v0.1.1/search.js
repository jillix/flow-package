"use strict";

////const FlowApi = require("flow-api");
//const resolve = require("path").resolve;

module.exports = (event, state, args, next) => {
    let data = event.data;
    data.body = data.body || {};

    /*if (!state.api) {
        FlowApi()
    }


    data.body = data.body || {};

    if (!state.api) {
        return next(new Error("Service-api.project.create: No API instance found on the state object."));
    }*/

    new Promise((resolve, reject) => {
        resolve([
            ["_:0000946952aebcbcebc7a543da27c322", "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>", "<http://schema.jillix.net/vocab/Sequence>"],
            ["_:0000946952aebcbcebc7a543da27c322", "<http://schema.org/name>", "Sequence 1"],
            ["_:f374ef754b0d4a5c35ad290ddfe21346", "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>", "<http://schema.jillix.net/vocab/Sequence>"],
            ["_:f374ef754b0d4a5c35ad290ddfe21346", "<http://schema.org/name>", "Sequence 2"],
            ["_:0000946952aebcbcebc7a543da27c322", "<http://schema.jillix.net/vocab/error>", "_:f374ef754b0d4a5c35ad290ddfe21346"],
            ["_:0000946952aebcbcebc7a543da27c322", "<http://schema.jillix.net/vocab/next>", "_:f1f99d40077b6cc0dc6e683cd6852a82"],

            ["_:f1f99d40077b6cc0dc6e683cd6852a82", "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>", "<http://schema.jillix.net/vocab/Next>"],
            ["_:f1f99d40077b6cc0dc6e683cd6852a82", "<http://schema.org/name>", "1"],
            ["_:f1f99d40077b6cc0dc6e683cd6852a82", "<http://schema.jillix.net/vocab/state>", "_:fd4a9d2e97234225bbd5f32fb0f4f564"],
            ["_:f1f99d40077b6cc0dc6e683cd6852a82", "<http://schema.jillix.net/vocab/args>", "_:3cbd861677a38b8f1da179c95e2b96c3"],
            ["_:f1f99d40077b6cc0dc6e683cd6852a82", "<http://schema.jillix.net/vocab/handler>", "_:8c504a4856bfa8719dfa488a1349d727"],
            ["_:3cbd861677a38b8f1da179c95e2b96c3", "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>", "<http://schema.jillix.net/vocab/Arguments>"],
            ["_:fd4a9d2e97234225bbd5f32fb0f4f564", "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>", "<http://schema.jillix.net/vocab/State>"],
            ["_:8c504a4856bfa8719dfa488a1349d727", "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>", "<http://schema.jillix.net/vocab/Handler>"],
            ["_:3cbd861677a38b8f1da179c95e2b96c3", "<http://schema.org/name>", "args"],
            ["_:fd4a9d2e97234225bbd5f32fb0f4f564", "<http://schema.org/name>", "some_state"],
            ["_:8c504a4856bfa8719dfa488a1349d727", "<http://schema.org/name>", "jillix_transform_v0.1.1"],

            ["_:f1f99d40077b6cc0dc6e683cd6852a82", "<http://schema.jillix.net/vocab/next>", "_:cd67403c8474bdd494af56200c8ffc30"],
            ["_:cd67403c8474bdd494af56200c8ffc30", "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>", "<http://schema.jillix.net/vocab/Next>"],
            ["_:cd67403c8474bdd494af56200c8ffc30", "<http://schema.org/name>", "2"],
            ["_:cd67403c8474bdd494af56200c8ffc30", "<http://schema.jillix.net/vocab/state>", "_:2ebab60dedd2369750fa0ba4a8e54059"],
            ["_:cd67403c8474bdd494af56200c8ffc30", "<http://schema.jillix.net/vocab/args>", "_:7efa2d6ca75a92b20e430d39192babce"],
            ["_:cd67403c8474bdd494af56200c8ffc30", "<http://schema.jillix.net/vocab/handler>", "_:891cf6546d43b20bc263922e9fe16982"],
            ["_:7efa2d6ca75a92b20e430d39192babce", "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>", "<http://schema.jillix.net/vocab/Arguments>"],
            ["_:2ebab60dedd2369750fa0ba4a8e54059", "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>", "<http://schema.jillix.net/vocab/State>"],
            ["_:891cf6546d43b20bc263922e9fe16982", "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>", "<http://schema.jillix.net/vocab/Handler>"],
            ["_:7efa2d6ca75a92b20e430d39192babce", "<http://schema.org/name>", "args"],
            ["_:2ebab60dedd2369750fa0ba4a8e54059", "<http://schema.org/name>", "some_state"],
            ["_:891cf6546d43b20bc263922e9fe16982", "<http://schema.org/name>", "jillix_parse_v0.1.1"]
        ]);
    }).then(res => {
        data.body = res;
        next(null, data);
    }).catch(err => {
        next(err);
    });
};
