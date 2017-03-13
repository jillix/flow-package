'use strict';

module.exports = (event, state, args, next) => {
    state.VIS.interaction.zoom(args);
    next();
};