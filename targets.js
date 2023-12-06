const appTargetExtras = require('./app_targets');
const {chpTargets, chaTargets} = appTargetExtras;
module.exports = [
    ...chpTargets,
    ...chaTargets
];