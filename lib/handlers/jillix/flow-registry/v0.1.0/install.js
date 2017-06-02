'use strict';

const Registry = require('../../../../../');

module.exports = (event, state, args, next) => {
    let data = event.data || {};
    let dependency = data.dependency || args.dependency;

    if (!dependency) {
        return next(new Error('Flow-registry.install: Dependency missing.'));
    }

    let splits = dependency.split('/');

    Registry.install({
        owner: splits[0],
        module: splits[1],
        version: splits[2]
    }).then(()=>{next()})
    .catch(next);
};
