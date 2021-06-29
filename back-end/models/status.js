const Sequelize = require('sequelize');
const db = require('../config/db');

const Status = db.define('status', {
    status: {
        type: Sequelize.BOOLEAN
    },    
});

module.exports = Status;