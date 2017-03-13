"use strict"

const fs = require("fs");
const Path = require("path");
const HANDLERS_PATH = Path.join(__dirname, "lib/handlers");

exports.find = () => {};
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
