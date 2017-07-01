Flow.set("jillix.ruut.js_ensure.0.0.1",(()=>{
/*{
    "input": {
        "args": "<Sequence>"
    }
}*/
"use strict";

return (event, args, state, data, resolve, reject) => {

    if (state.router) {
        return resolve(data);
    }

    if (!args) {
        return reject(new Error("ruut.js.ensure: Missing sequence in arguments config."));
    }

    resolve(event.emit(args, data));
};

})());
