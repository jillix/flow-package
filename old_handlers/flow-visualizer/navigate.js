'use strict';

module.exports = (event, state, args, next) => {
    let data = event.data || {};
    let nodeId = data.node ? (data.node.id || data.node) : null;

    if (!data.event || !data.event.keyCode) {
        return next(new Error('Flow-visualizer.navigate: No keyCode provided.'));
    }

    let direction;
    switch (data.event.keyCode) {
        case 37:
            direction = 'left';
            break;
        case 38:
            direction = 'up';
            break;
        case 39:
            direction = 'right';
            break;
        case 40:
            direction = 'down';
    };

    if (!direction) {
        return next(new Error('Flow-visualizer.navigate: Invalid direction provided.'));
    }

    let result = state.VIS.navigation.navigate(direction, nodeId);
    if (result) {
        event.flow(state.events.navigationNode, {node: result});
    }

    next();
};