Flow.set("ottiker.test_handler.dev_name",(()=>{

"use strict";

const flowTools = require("flow-tools");

return (event, args, state, data, resolve, reject) => {
    console.log("- Test DEV handler called:", args);
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
