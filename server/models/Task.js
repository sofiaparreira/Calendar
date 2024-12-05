const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')


const Task = sequelize.define('Task', {
    id: {
        primaryKey:true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 3
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    },

    date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },

    employee: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Task