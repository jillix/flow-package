Flow.set("jillix.flow_emit_race.0.0.1",(()=>{
"use strict";

return (event, args, state, data, resolve, reject) => {

    if (!args || !args.length){
        return reject(new Error("Flow-emit-race: Invalid args config."));
    }

    const jobs = [];
    args.forEach((sequence) => {
        jobs.push(event.emit(sequence, data));
    });
    Promise.race(jobs).then((value) => {
        data = data || {};
        data.value = value;
        resolve(data);
    }).catch(reject);
};
})());
