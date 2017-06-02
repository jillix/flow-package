"use strict"

const promisify = require("util").promisify;
const access = promisify(require("fs").access);
const exec = promisify(require('child_process').exec);
const resolve = require('path').resolve;

const REGISTRY_BASE = resolve(__dirname + '/..') + '/';
const NODE_MODULES = REGISTRY_BASE + 'node_modules/';

exports.install = (dependency) => {
    let modulePath = NODE_MODULES + dependency.module;
    let module = dependency.owner + '/' + dependency.module + '#' + dependency.version;

    return access(modulePath).then(() => {
        return dependency;
    }).catch((err) => {
        if (err.code === 'ENOENT') {
            return exec('npm i --prefix ' + REGISTRY_BASE + ' ' + module)
            .then(() => {
                return dependency;
            });
        } else {
            return Promise.resolve(dependency);
        }
    });
};

exports.uninstall = () => {};
