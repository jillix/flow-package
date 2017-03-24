'use strict';

const resolve = require('path').resolve;
const fs = require('fs');
const args = process.argv;
const NODE_MODULES = resolve(__dirname, '../node_modules/');
const HANDLER_BASE = resolve(__dirname + '/handlers') + '/';
const exec = require('child_process').exec;
const rimraf = require('rimraf');
const chokidar = require('chokidar');
const runtime = require('./runtime');

function start () {

    if (args.length < 4) {
        return console.log(new Error('Invalid Arguments.'));
    }

    const modulesDir = resolve(__dirname, '../', args[args.length - 1]);
    const modules = args.slice(2, -1);

    // check if the dev modules folder exists
    fs.access(modulesDir, err => {

        if (err) {
            return console.log(err.message);
        }

        modules.forEach(module => setupModule(module, modulesDir, err => {

            if (err) {
                return console.log(err);
            }

            console.log('Installed module: ' + module);

            watchModule(module, modulesDir);
        }));
    });
}

// clone module and create symlink
function setupModule (module, modulesDir, callback) {
    let splits = module.split('/');

    if (!splits || splits.length < 3) {
        return callback('Invalid module name.');
    }

    // check if module is not already cloned
    fs.access(resolve(modulesDir, module), err => {

        // skip next steps if module already exists
        if (!err || err.code !== 'ENOENT') {
            return callback();
        }

        // clone the module
        exec('git clone git@github.com:' + splits[0] + '/' + splits[1] + '.git ' + resolve(modulesDir, module), err => {

            if (err) {
                return callback(err);
            }

            // remove the module from registry and create symlink
            rimraf(resolve(NODE_MODULES, splits[1]), err => {

                if (err) {
                    return callback(err);
                }

                // create a symlink to the dev module
                fs.symlink(resolve(modulesDir, module), resolve(NODE_MODULES, splits[1]), err => {

                    if (err) {
                        return callback(err);
                    }

                    // install dev module deps
                    exec('cd ' + resolve(modulesDir, module) + '; npm i', err => {

                        if (err) {
                            return callback(err);
                        }

                        // create a symlink to the babelify presets
                        fs.symlink(resolve(__dirname, '../../', 'babel-preset-es2015'), resolve(modulesDir, module, 'node_modules/babel-preset-es2015'), err => {

                            if (err) {
                                return callback(err);
                            }

                            callback();
                        });
                    });
                });
            });
        });
    });
}

function watchModule (module, modulesDir) {

    // build required paths
    const pathToModule = resolve(modulesDir, module);
    const pathToHandlers = resolve(HANDLER_BASE, module);

    // initialize watcher
    let watcher = chokidar.watch([pathToModule, pathToHandlers], {
        ignored: /(^|[\/\\])\../,
        persistent: true
    });
    watcher.on('change', (path, stats) => {

        // rebundle based on the type of the file
        if (path.indexOf(modulesDir) > -1) {
            fs.readdir(pathToHandlers, (err, files) => {

                if (err) {
                    console.log('Failed to get handler files for module: ' + module);
                    return console.log(err);
                }

                files.forEach(file => bundleHandler(pathToHandlers, module, file));
            });

        } else {
            bundleHandler(pathToHandlers, module, path.substr(path.lastIndexOf('/') + 1));
        }

    });
}

function bundleHandler (pathToHandlers, module, file) {

    // only rebundle if js file changed
    if (file.length < 3 || file.indexOf('bundle.') === 0 || file.substr(file.length - 3) !== '.js') {
        return;
    }

    // only rebundle if handler was already bundled before
    fs.access(pathToHandlers + '/bundle.' + file, err => {

        if (err && err.code === 'ENOENT') {
            return ;
        }

        let fnIri = module + '/' + file.slice(0, -3);

        // remove the old bundle
        fs.unlink(pathToHandlers + '/bundle.' + file, err => {

            if (err) {
                console.log('Failed to delete old bundle for handler: ' + fnIri);
                return console.log(err);
            }

            // build the new bundle
            console.log('Bundle handler: ' + fnIri);
            runtime.bundle(fnIri, {}, (err) => {

                if (err) {
                    console.log('Failed to bundle handler: ' + fnIri);
                    return console.log(err);
                }

                console.log('Bundle done for handler: ' + fnIri);
            });
        });
    });
}

start();