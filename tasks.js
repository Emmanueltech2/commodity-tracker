const appTaskExtras = require('./app_tasks');
const {chpTasks, chaTasks} = appTaskExtras;
module.exports = [
    ...chpTasks,
    ...chaTasks
];