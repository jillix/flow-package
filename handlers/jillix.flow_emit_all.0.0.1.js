Flow.set("jillix.flow_emit_all.0.0.1",(()=>{
"use strict";

return (event, args, state, data, resolve, reject) => {

    if (!args || !args.length){
        return reject(new Error("Flow-emit-all: Invalid args config."));
    }

    const jobs = [];
    args.forEach((sequence) => {
        jobs.push(event.emit(sequence, data));
    });
    Promise.all(jobs).then((values) => {
        data = data || {};
        data.values = values;
        resolve(data);
    }).catch(reject);
};
})());
