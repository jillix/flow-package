Flow.set("jillix.flow_cli.0.0.1",(()=>{
"use strict";

return (event, args, state, data, resolve, reject) => {

    if (!process.argv[5]) {
        return reject(new Error("Flow-cli: Missing url."));
    }

    const sequence = args.find((item) => {
        return item[0] === process.argv[4];
    });

    if (!sequence || !sequence[1]) {
        return reject(new Error("Flow-cli: Method not found."));
    }

    data = data || {};
    data.url = "cli://cli/" + process.argv[5];
    data.req = process.stdin;
    data.res = process.stdout;
    resolve(event.emit(sequence[1], data));
};
})());
