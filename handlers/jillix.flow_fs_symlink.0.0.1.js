Flow.set("jillix.flow_fs_symlink.0.0.1",(()=>{
/*{
    "input": {
        "args": {
            "type": "<NodeJS.fs.symlink.type>",
            "target": "<FSPath>",
            "path": "<FSPath>"
        }
    }
}*/
"use strict";

const fs = require("fs");
const presolve = require("path").resolve;
const promisify = require("util").promisify;
const symlink = promisify(fs.symlink);

return (event, args, state, data, resolve, reject) => {

    const type = (data && data.type) || (args && args.type) || "file";
    const target = (data && data.target) || (args && args.target);
    const path = (data && data.path) || (args && args.path);
    const wd = (data && data.wd) || (args && args.wd) || event.abp;

    if (!target) {
        return reject(new Error("FS.symlink: Missing target config."));
    }

    if (!path) {
        return reject(new Error("FS.symlink: Missing path config."));
    }

    symlink(presolve(wd, target), presolve(wd, path), "dir").then(() => {
        resolve(data);
    }).catch(reject);
};

})());
