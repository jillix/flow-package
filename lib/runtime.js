"use strict";

const resolve = require("path").resolve;
const exec = require('child_process').exec;
const exists = require('fs').access;
const registry_base = resolve(__dirname + "/..") + "/";
const handler_base = resolve(__dirname + "/handlers") + "/";
const node_modules =  registry_base + "node_modules/";

function saveRequire (handler, callback) {
    try {
        const msg_handler = handler;
        handler = require(handler);
        if (typeof handler !== "function") {
            return callback(new Error('Flow-registry.runtime.fn: Handler "' + msg_handler + '" is not a function.'));
        }
        callback(null, handler);
    } catch (err) {
        callback(err);
    }
}

exports.fn = (fn_iri, role, callback) => {

    fn_iri = fn_iri.split("/");
    if (fn_iri.length !== 4) {
        return callback(new Error('Flow-registry.runtime.fn: Invalid handler path "' + fn_iri.join("/") + '"'));
    }

    const installed = node_modules + fn_iri[1];
    const module = fn_iri[0] + "/" + fn_iri[1] + "#" + fn_iri[2];
    fn_iri = handler_base + fn_iri.join("/");

    exists(installed, (err) => {

        if (err) {

            if (err.code === 'ENOENT') {
                exec("npm i --prefix " + registry_base + " " + module, (err) => {

                    if (err) {
                        return callback(err);
                    }

                    saveRequire(fn_iri, callback);
                });
            } else {
                callback(err);
            }

        } else {
            saveRequire(fn_iri, callback);
        }
    });
};

exports.bundle = (fniri, role, callback) => {};
