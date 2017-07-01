Flow.set("jillix.ruut.js_route.0.0.1",(()=>{
"use strict";

return (event, args, state, data, resolve, reject) => {

    if (!state.router || !state.config) {
        return reject(new Error("Flow-router: No router found in state."));
    }

    if (!data || typeof data.url !== "string") {
        return reject(new Error("Flow-router: Missing url."));
    }

    const route = state.router(data.path) || {data: state.config.notDefined};
    if (!route) {
        return reject(new Error("Flow-router: Don't know this url."));
    }

    data.route = route.data;
    if (route.params) {
        data.params = route.params;
    }

    resolve(data);
};
})());
