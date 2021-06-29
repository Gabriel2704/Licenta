const Sequelize = require('sequelize');
const db = require('../config/db');

const Task = db.define('task', {
    description: {
        type: Sequelize.STRING,
    },
    priority: {
        type: Sequelize.STRING,
    },
});

module.exports = Task;