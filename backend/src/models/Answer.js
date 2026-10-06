const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Answer = sequelize.define("Answer", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    formularioRespondidoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "formulario_respondido_id"
    },

    perguntaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "pergunta_id"
    },

    valor: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: "resposta",
    timestamps: false
});

module.exports = Answer;