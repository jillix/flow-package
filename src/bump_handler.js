"use strict"

const fs = require("fs");
const presolve = require("path").resolve;
const promisify = require("util").promisify;
const exec = promisify(require("child_process").exec);
const open = promisify(fs.open);
const write = promisify(fs.write);
const close = promisify(fs.close);
const readF = promisify(fs.readFile);
const writeF = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const symlink = promisify(fs.symlink);

function removeJsSuffix (string) {
    return string.split(".").pop() === "js" ? string.slice(0, -3) : string;
}

module.exports = (argv) => {

    if (!argv[0]) {
        throw new Error("Missing handler <IRI>.");
    }

    if (!argv[1]) {
        throw new Error("Missing version type.");
    }

    switch (argv[1]) {
        case "major":
        case "minor":
        case "patch":
            break;
        default:
            throw new Error("Invalid version type. Allowed types: major|minor|patch");
    }

    const version_type = argv[1];
    const dev_handler = removeJsSuffix(argv[0]);
    const reg_base_path = presolve(__dirname, "../");
    const app_base_path = presolve(argv[2] || ".");

    // update version in handler wrapper
    // update version in handler descriptor

    // rename dev name files
    // remove symlink in app
    // copy to app

    const dev_handler_js = reg_base_path + "/handlers/" + dev_handler + ".js";
    const dev_handler_json = reg_base_path + "/handlers/" + dev_handler + ".json";
    console.log("Bump:", version_type, dev_handler);
return;
    /*const dev_handler_js = dev_handler + ".js";
    const dev_handler_json = dev_handler + ".json";
    const app_base_path = presolve(argv[2] || ".");
    const reg_base_path = presolve(__dirname, "../");
    const app_handler_path = app_base_path + "/handlers/";
    const reg_handler_path = reg_base_path + "/handlers/";
    const log_error = console.error.bind(console);

    // check if handler exists in registry
    open(reg_handler_path + handler_iri_js, "r")
    .then(close)
    // check if dev handler exists in registry
    .then(() => {
        return open(reg_handler_path + dev_handler_js, "r")
        .then(close)
        .catch((err) => {
            return err.code === "ENOENT" ? exec(
                "cp " + reg_handler_path + handler_iri_js + " " + reg_handler_path + dev_handler_js +
                ";cp " + reg_handler_path + handler_iri_json + " " + reg_handler_path + dev_handler_json
            ).then(() => {
                // replace wrapper line with dev name
                return open(reg_handler_path + dev_handler_js, "r+")
                .then((fd) => {
                    return write(fd, 'Flow.set("' + dev_handler + '",(()=>{', 0)
                    .then((written) => {
                        return fd
                    });
                })
                .then(close)
                .then(() => {
                    return readF(reg_handler_path + dev_handler_json)
                    .then(JSON.parse)
                    .then((descriptor) => {
                        descriptor.version = descriptor.version + dev_name;
                        return descriptor;
                    })
                    .then((descriptor) => {
                        return JSON.stringify(descriptor, null, 4);
                    })
                    .then((descriptor) => {
                        return writeF(reg_handler_path + dev_handler_json, descriptor);
                    })
                })
            }) : Promise.reject(err);
        })
    })
    // replace app handler with symlink to copied reg handler
    .then(() => {
        return open(app_handler_path + dev_handler_js, "r")
        .then(close)
        .then(() => {
            return unlink(app_handler_path + dev_handler_js);
        })
        .catch((err) => {
            return err.code === "ENOENT" ? Promise.resolve() : Promise.reject(err);
        });
    })
    .then(() => {
        return symlink(reg_handler_path + dev_handler_js, app_handler_path + dev_handler_js);
    })
    .catch(log_error);*/
};
