Flow.set("jillix.flow_tools_transform.0.0.1",(()=>{

"use strict";

const FlowTools = require("flow-tools");

return (event, args, state, data, resolve, reject) => {

    if (!(args instanceof Array)) {
        return reject(new Error("Flow-tools.transform: Invalid arguments."));
    }

    switch (args[0]) {
        case "dd":
            FlowTools.transform(args[1], data, data);
            break;
        case "ss":
            FlowTools.transform(args[1], state, state);
            break;
        case "ds":
            FlowTools.transform(args[1], data, state);
            break;
        case "sd":
            FlowTools.transform(args[1], state, data);
            break;
        case "ed":
            FlowTools.transform(args[1], event.args, data);
            break;
        case "es":
            FlowTools.transform(args[1], event.args, state);
            break;
        default:
            return reject(new Error("Flow-tools.transform: Invalid mode \"" + args[0] + "\""));
    }

    resolve(data);
};

})());
