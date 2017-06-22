"use strict";

const bundle = require("./lib/bundle");
const registry = require("./lib/registry");
const search = require("./lib/search");

/*
Registry functionality:

- Manage data in a DB of register handlers
    * register()
    * unregister()
    * getFile()
    * search()

Optimizations:
It's a better idea to create a separate project for the registry.
In a Registry as a service style. (Static file server for code and meta data)
integrate registry to editor GUI to build applications
Note: bundling should be handled in a clean dev workflow, that requires separate modules.
*/

// get
exports.bundle = bundle;

// register/unregister functions
exports.register = registry.add;
exports.unregister = registry.remove;

// search functions
exports.search = search.find;

// dev functions
exports.edit = () => {
    // steps???
};
