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
const rmdir = promisify(fs.rmdir);
const lstat = promisify(fs.lstat);
const unlink = promisify(fs.unlink);
const symlink = promisify(fs.symlink);

module.exports = (argv) => {
    const handler_iri = process.argv[0];
    const dev_name = process.argv[1];
    const app_base_path = presolve(process.argv[2] || ".");

    if (!handler_iri) {
        throw new Error("Missing handler <IRI>.");
    }

    if (!dev_name) {
        throw new Error("Missing dev name.");
    }

    const app_handler_path = app_base_path + "/handlers/";
    const reg_handler_path = __dirname + "/handlers/";
    const log_error = console.error.bind(console);

    // clone the git repository
    switch (mode) {
        case "dev":
            console.log("Dev handler:", handler_iri, "to dev name:", dev_name, "for app:", app_base_path);
            // 1. check if handler iri exists in registry
            // 2. copy .js + .json with dev_name instead of version
            // 3. replace app handler with symlink to copied reg handler
            break;
        case "bump":
            console.log("Bump handler version:", handler_iri, "update:", dev_name, "for app:", app_base_path);
            // 1. check if dev handler exists in registry
            // 2. get version from descriptor
            // 3. rename dev handler with bumped version
            // 4. replace app symlink with bumped handler
            // 5. show message to update sequence manually
            break;
        default:
            throw new Error("Invalid mode command:" + mode);
    }

    return;
    exec("git clone --depth 1 " + git_url + " " + repo_path + repo_name)

    // get module name from package + npm install
    .then(() => {
        // check if package file exists
        return open(repo_path + repo_name + "/package.json", "r")
        .then((fd) => {

            // npm install
            console.log("- npm install...")
            return exec("cd " + repo_path + repo_name + "; npm i")

            // get module name from package
            .then(() => {
                console.log("- npm install done.")
                return read(fd);
            })
            .then(JSON.parse)
            .then((pkg) => {
                return pkg.name || repo_name;
            })
            .catch(log_error);
        })
        .catch((err) => {
            return repo_name;
        });
    })

    // remove existing dependency
    .then((repo_name) => {

        // check if a module is installed with that name (folder exits)
        return lstat(deps_path + repo_name)
        .then((stats) => {
            // remove directory or symlink
            console.log("- remove npm dependency.")
            return (stats.isSymbolicLink() ? unlink(deps_path + repo_name) : exec("rm -rf " + deps_path + repo_name))
            .then(() => {
                return repo_name;
            });
        })
        .catch((err) => {
            return err.code === "ENOENT" ? repo_name : Promise.reject(err);
        });
    })
    // create symlink to git repo
    .then((repo_name) => {
        console.log("- create symlink to git repo.")
        return symlink(repo_path  + repo_name, deps_path + repo_name, "dir");
    })
    .then(() => {
        console.log("Done!");
    })
    .catch(log_error);
};
