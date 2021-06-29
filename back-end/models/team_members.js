const Sequelize = require('sequelize');
const db = require('../config/db');

const TeamMembers = db.define('team_members', {
    name: {
        type: Sequelize.STRING,
    },
    role: {
        type: Sequelize.STRING,
    },
});

module.exports = TeamMembers;