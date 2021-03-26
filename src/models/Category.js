const Sequelize = require('sequelize');
const connection = require('../database/database');

const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{ // Uma versão do title para ser colocado na url, como por exemplo: Desenvolvimento Web -> desenvolvimento-web ;
        type: Sequelize.STRING,
        allowNull: false
    }
})

// Category.sync({force: true});

module.exports = Category;