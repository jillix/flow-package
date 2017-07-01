Flow.set("jillix.ruut.js_init.0.0.1",(()=>{
/*{
    "input": {
        "args": {
            "default": "<String>",
            "methods": [{
                "name": "<String>",
                "sequence": "<Sequence>"
            }]
        }
    },
    "output": {
        "state": {
            "config": "<[handler]#input.args>"
            "router": "<Ruut.js#instance>"
        }
    }
}*/
"use strict";

const Ruut = require("ruut.js");

return (event, args, state, data, resolve, reject) => {

    if (!state.config) {
        state.config = args;
    }

    if (state.router) {
        return resolve(data);
    }

    if (!args.routes) {
        return reject(new Error('Flow-router.init: No routes in config'));
    }
    state.router = Ruut(args.routes);

    resolve(data);
};

})());
