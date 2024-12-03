const { Sequelize } = require('sequelize')


const sequelize = new Sequelize ({
    dialect: 'sqlite',
    storage: 'taskdb.sqlite'
})

module.exports = sequelize