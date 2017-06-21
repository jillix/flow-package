"use strict"

const dummy = require("flow-dummy");
console.log(dummy);
module.exports = (event, state, args, next) => {
    next(null, null, event.pipe(dummy.multiplyMe()));
};
