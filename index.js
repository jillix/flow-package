'use strict';

const fs = require('fs');
const Path = require('path');
const HANDLERS_PATH = Path.join(__dirname, 'lib/handlers');
const RE_method_path = /^<([^\/]+)\/([^#]+)(?:#([^\?]+))?\?(.*)>$/;
const libob = require('libobject');
const exec = require('child_process').exec;
const exists = require('fs').access;

exports.buildSchemaObject = (path) => {

    // check if schema object reached
    if (path.indexOf('.json') > -1) {
        return require(path);
    }

    if (!fs.lstatSync(path).isDirectory()) {
        return;
    }

    let obj = {};
    let files = fs.readdirSync(path);
    for (let i = 0; i < files.length; ++i) {
        if (files[i].indexOf('.') === 0) {
            continue;
        }

        let file = buildSchemaObject(Path.join(path, files[i]));
        if (!file) {
            continue
        }

        obj[files[i]] = file;
    }
    return obj;
};

function saveRequire (module, method, callback) {
    try {
        let msg_method = method;
        if (!(method = libob.path.get(method, require(module)))) {
            return callback(new Error('Flow-nodejs.adapter.require: Method "' + msg_method + '" not found on module "' + module + '".'));
        }
        callback(null, method);
    } catch (err) {
        callback(err);
    }
}

exports.getFn = (fnIri, role, callback) => {

    return callback(null, (event, state, args, next) => {
        console.log("dummy handler:", state, args, event.data);
        next();
    });

    // TODO require module from registry
    // TODO install non existent modules to registry
    // TODO create a registry location config

    method_iri = method_iri.match(RE_method_path);
    if (!method_iri || !method_iri[1] || !method_iri[2] || !method_iri[4]) {
        return cb(new Error('Flow-nodejs.adapter.fn: Invalid method path.'));
    }

    const entrypoint = {
        base: "/home/adioo/Repos/flow-nodejs/",
        module_root: "/home/adioo/Repos/flow-nodejs/node_modules/"
    };
    let module = method_iri[2].indexOf('/') > -1 ? method_iri[2].split('/')[0] : method_iri[2];
    let file = entrypoint.module_root + method_iri[2];

    exists(entrypoint.module_root + module, (err) => {
        if (err) {
            return exec('npm i --prefix ' + entrypoint.base + ' ' + method_iri[1] + '/'  +  module + (method_iri[3] ? '#' + method_iri[3]: ''), err => {

                if (err) {
                    return cb(err);
                }

                saveRequire(file, method_iri[4], cb);
            });
        }

        saveRequire(file, method_iri[4], cb);
    });
};
