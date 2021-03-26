const Sequelize = require('sequelize');
require('dotenv').config();

const connection = new Sequelize('guiapress', process.env.DATABASE_USER_NAME, process.env.DATABASE_USER_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;
