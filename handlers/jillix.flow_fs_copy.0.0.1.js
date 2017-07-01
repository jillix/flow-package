Flow.set("jillix.flow_fs_copy.0.0.1",(()=>{
/*
"input": {
    "args": {
        "path": "<FSPath>",
        "dest": "<FSPath>",
        "dir": "<Boolean>",
        "wd": "<FSPath>"
    },
    "data": {
        "path": "<FSPath>",
        "dest": "<FSPath>",
        "dir": "<Boolean>",
        "wd": "<FSPath>"
    }
}
*/
"use strict";

const presolve = require("path").resolve;
const promisify = require("util").promisify;
const exec = promisify(require("child_process").exec);

return (event, args, state, data, resolve, reject) => {

    const path = (data && data.path) || (args && args.path);
    if (!path) {
        return reject(new Error("FS.copy: Missing path config."));
    }

    let dest = (data && data.dest) || (args && args.dest);
    if (!dest) {
        return reject(new Error("FS.copy: Missing destination config."));
    }

    const wd = presolve((data && data.wd) || (args && args.wd) || event.abp);
    const dir = (data && data.dir) || (args && args.dir) || false;
    exec("cp " + (dir ? "-r" : "") + " " + presolve(wd, path) + " " + presolve(wd, dest))
    .then(() => {resolve(data)}).catch(reject);
};

})());
