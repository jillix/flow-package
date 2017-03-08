"use strict"

const myModule = require("myModule");

module.exports = (event, state, args, next) => {
    next();
};
