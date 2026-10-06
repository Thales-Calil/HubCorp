const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const AnsweredForm = sequelize.define("AnsweredForm", {
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

    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "usuario_id"
    },

    dataResposta: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "data_resposta"
    }
}, {
    tableName: "formulario_respondido",
    timestamps: false
});

module.exports = AnsweredForm;