#!/usr/bin/env node
"use strict"
require("./" + ((mode)=> {
    switch (mode) {
        case "dependency":
        case "dep":
        case "d":
            return "dev_dependency";
        case "handler":
        case "hnd":
        case "h":
            return "dev_handler";
        case "bump":
        case "bmp":
        case "b":
            return "bump_handler";
        default:
            throw new Error("Invalid command:", mode);
    }
})(process.argv[2]))(process.argv.slice(3));
