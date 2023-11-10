const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('event', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        killer_id: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        killer_name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        victim_id: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        victim_name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        date: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    })
}
