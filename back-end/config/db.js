const Sequelize = require('sequelize');

module.exports = new Sequelize('licenta', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
      },
});

