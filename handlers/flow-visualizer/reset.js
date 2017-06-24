'use strict';

module.exports = (event, state, args, next) => {

    state.VIS.manipulation.reset();
    next();
};