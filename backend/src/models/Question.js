const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Question = sequelize.define("Question", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    formularioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "formulario_id"
    },

    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    ordem: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    opcoes: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    tableName: "pergunta",
    timestamps: false
});

module.exports = Question;