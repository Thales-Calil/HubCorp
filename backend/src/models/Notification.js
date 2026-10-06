const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Notification = sequelize.define("Notification", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    autorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "usuario_id"
    },

    dataCriacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "data_criacao"
    },

}, {
    tableName: "notificacao",
    timestamps: false
});

module.exports = Notification;