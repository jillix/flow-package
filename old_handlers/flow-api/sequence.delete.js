"use strict";

module.exports = (event, state, args, next) => {
    new Promise((resolve, reject) => {
        resolve({status: 1, message: "Sequence successfully deleted", node: "Sequence_ID"});
    }).then(res => {
        next(null, {body: res});
    }).catch(err => {
        next(err);
    });
};
