'use strict';

const resolve = require('path').resolve;
const exec = require('child_process').exec;
const fs = require('fs');
const browserify = require('browserify');
const replace = require('browserify-replace');
const babelify = require('babelify');
const uglify = require('uglifyify');
const zlib = require('zlib');

const REGISTRY_BASE = resolve(__dirname + '/..') + '/';
const HANDLER_BASE = resolve(__dirname + '/handlers') + '/';
const NODE_MODULES =  REGISTRY_BASE + 'node_modules/';
const REPLACE_FROM = /FLOW_ENV/;

function saveRequire (handler, callback) {
    try {
        const msg_handler = handler;
        handler = require(handler);
        if (typeof handler !== 'function') {
            return callback(new Error('Flow-registry.runtime.fn: Handler "' + msg_handler + '" is not a function.'));
        }
        callback(null, handler);
    } catch (err) {
        callback(err);
    }
}

exports.fn = (fnIri, role, callback) => {
    const details = getFnDetails(fnIri)

    if (details instanceof Error) {
        return callback(details);
    }

    if (isExcluded(details.moduleName)) {
        return saveRequire(details.fnPath, callback);
    }

    fs.access(details.modulePath, (err) => {

        if (err) {

            if (err.code === 'ENOENT') {
                exec('npm i --prefix ' + REGISTRY_BASE + ' ' + details.moduleName, (err) => {

                    if (err) {
                        return callback(err);
                    }

                    saveRequire(details.fnPath, callback);
                });
            } else {
                callback(err);
            }

        } else {
            saveRequire(details.fnPath, callback);
        }
    });
};

function getFnDetails (fnIri) {

    fnIri = fnIri.split('/');
    if (fnIri.length !== 4) {
        return new Error('Flow-registry.runtime.fn: Invalid handler path "' + fnIri.join('/') + '"');
    }

    return {
        fnName: fnIri[3],
        moduleName: fnIri[0] + '/' + fnIri[1] + '#' + fnIri[2],
        modulePath: NODE_MODULES + fnIri[1],
        fnPath: HANDLER_BASE + fnIri.join('/') + '.js'
    };
}

function isExcluded (module) {
    const EXCLUDED = ['jillix/flow-registry#v0.1.0'];

    if (EXCLUDED.indexOf(module) > -1) {
        return true;
    }

    return false;
}

// Bundle client handlers
//
//  TODO check access before bundling
//
// example config
// let config = {
//     procution: true,
//     env: {
//         sequence: '/sequence/',
//         fn: '/fn/'
//     }
// };
exports.bundle = (fnIri, config, callback) => {

    // default config values
    config = config || {};
    config.env = config.env || {};
    config.env.sequence = config.env.sequence || '/sequence/';
    config.env.fn = config.env.fn || '/fn/';

    // get function details
    const details = getFnDetails(fnIri)

    if (details instanceof Error) {
        return callback(details);
    }

    // compute target
    let target = resolve(
        details.fnPath,
        '../',
        'bundle.' + details.fnName + '.js'
    );

    fs.access(target, err => {

        if (!err) {
            return callback(null, target);
        }

        // create browserify instance
        let b = browserify(details.fnPath, {
            cache: {},
            packageCache: {}
        });

        // replace flow env vars
        b.transform(replace, {
            replace: [{
                from: REPLACE_FROM,
                to: JSON.stringify(config.env)
            }]
        });

        // set handler require name
        b.require(details.fnPath, {
            expose: fnIri
        });

        b.transform(babelify, {presets: ['es2015'], global: true});
        config.production && b.transform(uglify, {global: true});

        let writeStream = fs.createWriteStream(target);
        writeStream.on('close', () => callback(null, target));

        b.bundle(error => {

            if (error) {
                fs.unlink(target, () => {
                    callback(error);
                });
            }
        }).pipe(zlib.createGzip({level: zlib.Z_BEST_COMPRESSION})).pipe(writeStream);
    });
};