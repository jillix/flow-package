Flow.set("jillix.flow_fs_remove.0.0.1",(()=>{
/*{
    "input": {
        "args": {
            "target": "<FSPath>",
            "wd": "<FSPath>"
        },
        "data": {
            "target": "<FSPath>",
            "wd": "<FSPath>"
        }
    }
}*/
"use strict";

const fs = require("fs");
const presolve = require("path").resolve;
const promisify = require("util").promisify;
const exec = promisify(require("child_process").exec);
const lstat = promisify(fs.lstat);
const unlink = promisify(fs.unlink);

return (event, args, state, data, resolve, reject) => {

    let target = (data && data.target) || (args && args.target);
    if (!target) {
        return reject(new Error("FS.remove: Missing target config."));
    }

    target = presolve((data && data.wd) || (args && args.wd) || event.abp, target);
    lstat(target).then((stats) => {
        if (stats.isSymbolicLink()) {
            return unlink(target);
        }

        if (stats.isDirectory()) {
            return exec("rm -rf " + target);
        }
    }).then(() => {
        resolve(data);
    }).catch(reject);
};

})());
