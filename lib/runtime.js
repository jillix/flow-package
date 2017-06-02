'use strict';

const resolve = require('path').resolve;
const fs = require('fs');
const browserify = require('browserify');
const replace = require('browserify-replace');
const babelify = require('babelify');
const uglify = require('uglifyify');
const zlib = require('zlib');
const dependency = require('./dependency');

const REGISTRY_BASE = resolve(__dirname + '/..') + '/';
const HANDLER_BASE = resolve(__dirname + '/handlers') + '/';
const NODE_MODULES =  REGISTRY_BASE + 'node_modules/';
const REPLACE_FROM = /FLOW_ENV/;

function saveRequire (details) {
    try {
        let handler = details.fnPath;
        handler = require(handler);
        if (typeof handler !== 'function') {
            return Promise.reject(new Error('Flow-registry.runtime.fn: Handler "' + details.fnPath + '" is not a function.'));
        }
        return handler;
    } catch (err) {
        Promise.reject(err);
    }
}

exports.fn = (fnIri, role) => {
    return getFnDetails(fnIri).then((details) => {
        if (isExcluded(details.owner + '/' + details.module)) {
            return details;
        }

        return dependency.install(details);
    }).then(saveRequire);
};

function getFnDetails (fnIri) {

    fnIri = fnIri.split('/');
    if (fnIri.length !== 4) {
        return Promise.reject(new Error('Flow-registry.runtime.fn: Invalid handler path "' + fnIri.join('/') + '"'));
    }

    let details = {
        owner: fnIri[0],
        module: fnIri[1],
        version: fnIri[2],
        fnName: fnIri[3],
        modulePath: NODE_MODULES + fnIri[1],
        fnPath: HANDLER_BASE + fnIri.join('/') + '.js'
    };
    details.bundlePath = resolve(details.fnPath, '../','bundle.' + details.fnName + '.js');
    return Promise.resolve(details);
}

function isExcluded (module) {
    const EXCLUDED = ['jillix/flow-registry'];
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
    getFnDetails(fnIri).then(dependency.install).then((details) => {
        return new Promise((resolve, reject) => {
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

            b.transform(babelify, {presets: ['babel-preset-es2015'], global: true});
            config.production && b.transform(uglify, {global: true});

            let writeStream = fs.createWriteStream(details.bundlePath);
            writeStream.on('close', () => resolve(details.bundlePath));

            b.bundle(error => {

                if (error) {
                    fs.unlink(details.bundlePath, () => {
                        reject(error);
                    });
                }
            }).pipe(zlib.createGzip({level: zlib.Z_BEST_COMPRESSION})).pipe(writeStream);
        });
    }).then((bundlepath) => {
        callback(null, bundlepath);
    }).catch(callback);
};
