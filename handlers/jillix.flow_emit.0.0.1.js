Flow.set("jillix.flow_emit.0.0.1",(()=>{
/*{
    "input": {
        "args": "<Sequence>",
        "data": {
            "emit": "<Sequence>"
        }
    },
    "output": {
        "data": {
            "value": "<PromiseResult>"
        }
    }
}*/
"use strict";

return (event, args, state, data, resolve, reject) => {

    if ((!data || !data.emit) && typeof args !== "string") {
        return reject(new Error("Flow-emit: No sequence found."));
    }

    resolve(event.emit((data && data.emit ? data.emit : args), data));
};

})());
