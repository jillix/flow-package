"use strict";

const resolve = require("path").resolve;
const fs = require("fs");
const args = process.argv;
const NODE_MODULES = resolve(__dirname, "../node_modules/");
const HANDLER_BASE = resolve(__dirname + "/handlers") + "/";
const exec = require("child_process").exec;
const rimraf = require("rimraf");
const chokidar = require("chokidar");
const runtime = require("./runtime");

let modules = {};

function start () {

    if (args.length < 4) {
        return console.log(new Error("Invalid Arguments."));
    }

    const modulesDir = resolve(__dirname, "../", args[args.length - 1]);
    const modules = args.slice(2, -1);

    // the directory where the dev modules will be installed must already exist
    fs.access(modulesDir, err => {

        if (err) {
            return console.log(err.message);
        }

        // For each module provided clone and install all the required
        // dependencies, if it"s not already cloned
        // Remove the module from the registry and create a symlink to the dev module
        // Watch for changes and rebundle if necessary
        let index = 0
        function iterate (module) {

            // end
            if (index >= modules.length) {
                return console.log("Done installing modules.");
            }

            // a valid module contains the owner, module name and version
            // owner/module/version
            if (module.split("/").length !== 3) {
                return console.log(new Error(module + " is not a valid module ref."));
            }

            console.log("installing module: " + module);
            installModule(module, modulesDir, err => {

                if (err) {
                    return console.log(err.message);
                }


                setupSymlinks(module, modulesDir, err => {

                    if (err) {
                        return console.log(err.message);
                    }

                    console.log("watching module: " + module);

                    watchModule(module, modulesDir);
                    iterate(modules[++index]);
                });
            });
        }

        iterate(modules[index]);
    });
}

// this will clone and install all the required dependencies of a module
function installModule (module, modulesDir, callback) {

    let details = module.split("/");
    let devModulePath = resolve(modulesDir, module);

    fs.access(resolve(modulesDir, module), err => {

        // skip next steps if module already exists
        if (!err || err.code !== "ENOENT") {
            return callback();
        }

        exec("git clone git@github.com:" + details[0] + "/" + details[1] + ".git " + devModulePath, err => {

            if (err) {
                return callback(err);
            }

            exec("cd " + devModulePath + "; npm i", err => {

                if (err) {
                    return callback(err);
                }

                // create a symlink to the babelify presets
                // it is required in order for babelify to work
                fs.symlink(resolve(__dirname, "../../", "babel-preset-es2015"), resolve(devModulePath, "node_modules/babel-preset-es2015"), err => {

                    if (err) {
                        return callback(err);
                    }

                    callback();
                });
            });
        });
    });
}

// this will remove the module from the registry and create all the required links
function setupSymlinks (module, modulesDir, callback) {

    let details = module.split("/");
    let modulePath = resolve(NODE_MODULES, details[1]);
    let devModulePath = resolve(modulesDir, module);

    rimraf(modulePath, err => {

        if (err) {
            return callback(err);
        }

        fs.symlink(devModulePath, modulePath, err => {

            if (err) {
                return callback(err);
            }

            callback();
        });
    });
}

// this will watch for changes in a module or its handlers
function watchModule (module, modulesDir) {

    const pathToModule = resolve(modulesDir, module);
    const pathToHandlers = resolve(HANDLER_BASE, module);


    modules[module] = {
        handlers: []
    };
    fs.readdir(pathToHandlers, (err, files) => {

        if (err) {
            return console.log(new Error("Failed to get handler files for module: " + module));
        }

        files.forEach(file => {

            if (file.length < 3 || file.indexOf("bundle.") === 0 || file.substr(file.length - 3) !== ".js") {
                return;
            }

            modules[module].handlers.push(pathToHandlers + "/" + file);
        });

        let watchList = modules[module].handlers.concat([pathToModule]);
        let watcher = chokidar.watch(watchList, {
            ignored: /(^|[\/\\])\../,
            persistent: true
        });
        watcher.on("change", (path, stats) => {

            // rebundle based on the type of the file
            if (modules[module].handlers.indexOf(path) < 0) {
                modules[module].handlers.forEach(handler => bundleHandler(pathToHandlers, module, handler.substr(handler.lastIndexOf("/") + 1)));
            } else {
                bundleHandler(pathToHandlers, module, path.substr(path.lastIndexOf("/") + 1));
            }
        });
    });
}

// this will rebundle a handler
function bundleHandler (pathToHandlers, module, file) {

    // only rebundle if js file changed
    if (file.length < 3 || file.indexOf("bundle.") === 0 || file.substr(file.length - 3) !== ".js") {
        return;
    }

    // only rebundle if handler was already bundled before
    fs.access(pathToHandlers + "/bundle." + file, err => {

        if (err && err.code === "ENOENT") {
            return ;
        }

        let fnIri = module + "/" + file.slice(0, -3);

        // remove the old bundle
        fs.unlink(pathToHandlers + "/bundle." + file, err => {

            if (err) {
                console.log("Failed to delete old bundle for handler: " + fnIri);
                return console.log(err);
            }

            // build the new bundle
            console.log("Bundle handler: " + fnIri);
            runtime.bundle(fnIri, {}, (err) => {

                if (err) {
                    console.log("Failed to bundle handler: " + fnIri);
                    return console.log(err);
                }

                console.log("Bundle done for handler: " + fnIri);
            });
        });
    });
}

start();
