const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Sector = sequelize.define("Sector", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: "setor",
    timestamps: false
});

module.exports = Sector;