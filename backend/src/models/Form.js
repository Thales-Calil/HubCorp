const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Form = sequelize.define("Form", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    dataCriacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "data_criacao"
    },

    ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: "formulario",
    timestamps: false
});

module.exports = Form;