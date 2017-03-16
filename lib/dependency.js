"use strict"

const fs = require('fs');
const resolve = require('path').resolve;
const exec = require('child_process').exec;

const REGISTRY_BASE = resolve(__dirname + '/..') + '/';
const NODE_MODULES = REGISTRY_BASE + 'node_modules/';

exports.install = (dependency, callback) => {
    let modulePath = NODE_MODULES + dependency.module;

    let module = dependency.owner + '/' + dependency.module + '#' + dependency.version;
    fs.access(modulePath, (err) => {

        if (err) {
            if (err.code === 'ENOENT') {
                exec('npm i --prefix ' + REGISTRY_BASE + ' ' + module, (err) => {

                    if (err) {
                        return callback(err);
                    }

                    callback();
                });
            } else {
                callback();
            }
        } else {
            callback();
        }
    });
};

exports.uninstall = () => {};
