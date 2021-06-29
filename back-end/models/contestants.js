const Sequelize = require('sequelize');
const db = require('../config/db');

const Contestants = db.define('contestants', {
    firstname: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    facebook: {
        type: Sequelize.STRING
    },
    cv: {
        type: Sequelize.STRING
    }
});

module.exports = Contestants;