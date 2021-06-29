const Sequelize = require('sequelize');
const db = require('../config/db');

const SingleEvents = db.define('single_events', {
    name: {
        type: Sequelize.STRING
    },
    company: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
});

module.exports = SingleEvents;