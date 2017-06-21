"use strict";

// Create a new sequence node
module.exports = (event, state, args, next) => {

    // Store
    // Api
    new Promise((resolve, reject) => {
        resolve({status: 1, message: "Sequence successfully created", node: "Sequence_ID"});
    }).then(res => {
        next(null, {body: res});
    }).catch(err => {
        next(err);
    });
};
