Flow.set("jillix.git_repo_clone.0.0.1",(()=>{
/*{
    "input": {
        "args": {
            "target": "<FSPath>",
            "wd": "<FSPath>",
            "ignoreErrors": "<Boolean>"
        },
        "data": {
            "giturl": "<GIT_URL>",
            "target": "<FSPath>",
            "wd": "<FSPath>"
        }
    },
    "output": {
        "data": {
            "git": {
                "url": "<GIT_URL>",
                "dir": "<FSPath>",
                "name": "<GIT_REPO_NAME>"
            }
        }
    }
}*/
"use strict";

const presolve = require("path").resolve;
const promisify = require("util").promisify;
const exec = promisify(require("child_process").exec);

return (event, args, state, data, resolve, reject) => {

    const target = (data && data.target) || (args && args.target);
    const giturl = (data && data.giturl) || (args && args.giturl);
    const wd = (data && data.wd) || (args && args.wd) || event.abp;
    const ignoreErrors = (args && args.ignoreErrors) || false;

    if (!target) {
        return reject(new Error("Git-repo: Missing target config."));
    }

    if (!giturl) {
        return reject(new Error("Git-repo: Missing git url config."));
    }

    data.git = {
        name: giturl.split("/").pop(),
        url: giturl
    };
    console.log(wd, target, data.git.name);
    data.git.dir = presolve(wd, target, data.git.name);

    // clone the git repository
    exec("git clone --depth 1 " + giturl + " " + data.git.dir)
    .then(() => {resolve(data)}).catch((err) => {
        ignoreErrors ? resolve(data) : reject(err);
    });
};

})());
