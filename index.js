"use strict";

const runtime = require("./lib/runtime")
const dependency = require("./lib/dependency");
const registry = require("./lib/registry");
const search = require("./lib/search");

// runtime methods
exports.getFn = runtime.fn;
exports.getBundle = runtime.bundle;

// install/uninstall depencency
exports.install dependency.install;
exports.uninstall = dependency.uninstall;

// register/unregister functions
exports.register = registry.add;
exports.unregister = registry.remove;

// search functions
exports.search = search.find;
