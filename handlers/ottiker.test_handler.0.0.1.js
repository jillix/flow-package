Flow.set("ottiker_test_handler_v0.0.1",(()=>{

"use strict";

const flowTools = require("flow-tools");

return (event, args, state, data, resolve, reject) => {
    console.log("- Test handler called:", args);
    setTimeout(()=>{
        resolve({
            args: {
                handler: args,
                sequence: event.args
            },
            data: "data"
        });
    }, 250);
};

})());
