Flow.set("jillix.flow_fs_write.0.0.1",(()=>{
/*
"input": {
    "args": {
        "path": "<FSPath>",
        "content": "<FileContent>",
        "enc": "<String>",
        "wd": "<FSPath>"
    },
    "data": {
        "path": "<FSPath>",
        "content": "<FileContent>",
        "enc": "<String>",
        "wd": "<FSPath>"
    }
}
*/
"use strict";

const presolve = require("path").resolve;
const promisify = require("util").promisify;
const {writeFile} = require("fs");
const write = promisify(writeFile);

return (event, args, state, data, resolve, reject) => {

    const path = (data && data.path) || (args && args.path);
    if (!path) {
        return reject(new Error("FS.write: Missing path config."));
    }

    const content = (data && data.content) || (args && args.content);
    if (!content) {
        return reject(new Error("FS.write: Missing file content."));
    }

    const wd = presolve((data && data.wd) || (args && args.wd) || event.abp);
    const enc = (data && data.enc) || (args && args.enc) || "utf8";
    write(presolve(wd, path), content, enc)
    .then(() => {
        resolve(data);
    }).catch(reject);
};

})());
