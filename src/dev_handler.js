#!/usr/bin/env node
"use strict"

// Create handler:
// CLI: dev handler_iri dev_name app_path
// CLI: bump handler_iri major|minor|patch app_path
// dev:
// - copy handler_iri and descriptor (replace version with dev name)
// - symlink in app_path
// bump:
// - rename handler_dev_name with version +1 (major|minor|path)
// - rename descriptor

const fs = require("fs");
const presolve = require("path").resolve;
const promisify = require("util").promisify;
const exec = promisify(require("child_process").exec);
const read = promisify(fs.readFile);
const open = promisify(fs.open);
const close = promisify(fs.close);
const rmdir = promisify(fs.rmdir);
const lstat = promisify(fs.lstat);
const unlink = promisify(fs.unlink);
const symlink = promisify(fs.symlink);

function parseHandler (handler_iri) {
    const temp = handler_iri.split(".");
    return {
        user: temp[0],
        version: temp.slice(-3),
        name: temp.slice(1, -3).join("."),
        full: temp.pop === "js" ? handler_iri : (handler_iri + ".js")
    };
}

module.exports = (argv) => {

    if (!argv[0]) {
        throw new Error("Missing handler <IRI>.");
    }

    if (!argv[1]) {
        throw new Error("Missing dev name.");
    }

    const parsed = parseHandler(argv[0]);
    const dev_handler = parsed.user + "." + parsed.name + "." + argv[1] + ".js";
    const app_base_path = presolve(argv[2] || ".");
    const reg_base_path = presolve(__dirname, "../");
    const app_handler_path = app_base_path + "/handlers/";
    const reg_handler_path = reg_base_path + "/handlers/";
    const log_error = console.error.bind(console);

    // check if handler exists in registry
    open(reg_handler_path + parsed.full, "r")
    .then(close)
    // check if dev handler exists in registry
    .then(() => {
        return open(reg_handler_path + dev_handler, "r")
        .then(close)
        .catch((err) => {
            return err.code === "ENOENT" ? exec(
                "cp " + reg_handler_path + parsed.full + " " + reg_handler_path + dev_handler +
                ";cp " + reg_handler_path + parsed.full + "on " + reg_handler_path + dev_handler + "on"
            ) : Promise.reject(err);
        })
    })
    // replace app handler with symlink to copied reg handler
    .then(() => {
        return open(app_handler_path + dev_handler, "r")
        .then(close)
        .then(() => {
            return unlink(app_handler_path + dev_handler);
        })
        .catch((err) => {
            return err.code === "ENOENT" ? Promise.resolve() : Promise.reject(err);
        });
    })
    .then(() => {
        return symlink(reg_handler_path + dev_handler, app_handler_path + dev_handler);
    })
    .catch(log_error);
};
