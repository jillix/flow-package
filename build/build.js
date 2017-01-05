'use strict';

const modules = require('./modules');
const fs = require('fs');
const path = require('path');
const async = require('async');
const request = require('request');
let methods = [];


async.each(modules, (item, next) => {

    request.get(item, (err, res, body) => {

        if (err) {
            throw new Error('Failed to get module descriptor for: ' + item + '\n ERROR: ' + err.message);
        }

        let packageJson;
        try {
            packageJson = JSON.parse(body);
        } catch (e) {
            throw new Error('Failed to parse module descriptor: ' + item + '\n ERROR: ' + e.message);
        }

        if (!packageJson.exports) {
            next(null);
        }

        packageJson.exports.forEach(method => {
            method.module = packageJson['@id'];
            method.moduleName = packageJson.name;
            method.moduleVersion = packageJson.version;
            method.moduleAuthor = packageJson.author;
            methods.push(method);
        });

        next(null);
    });
}, err => {

    if (err) {
        throw err;
    }

    let pathToJson = path.join(__dirname, '../lib/methods.json');
    fs.writeFile(pathToJson, JSON.stringify(methods, null, 2), 'utf8', (err) => {

        if (err) {
            throw err;
        }

        console.log('Done!');
    });
});
