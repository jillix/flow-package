"use strict";

module.exports = (event, state, args, next) => {
    new Promise((resolve, reject) => {
        resolve({id: "Sequence_ID", name: "Sequence Name"});
    }).then(res => {
        next(null, {body: res});
    }).catch(err => {
        next(err);
    });
};
