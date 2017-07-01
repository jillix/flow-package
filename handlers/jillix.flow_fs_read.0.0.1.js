Flow.set("jillix.flow_fs_read.0.0.1",(()=>{
"use strict";

const presolve = require("path").resolve;
const promisify = require("util").promisify;
const {readFile} = require("fs");
const read = promisify(readFile);

return (event, args, state, data, resolve, reject) => {

    const path = (data && data.path) || (args && args.path);
    if (!path) {
        return reject(new Error("FS.write: Missing path config."));
    }

    const wd = presolve((data && data.wd) || (args && args.wd) || event.abp);
    const enc = (data && data.enc) || (args && args.enc) || "utf8";
    read(presolve(wd, path), enc)
    .then((file) => {
        data.file = file;
        resolve(data);
    }).catch(reject);
};
})());
