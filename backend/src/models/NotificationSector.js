const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const NotificationSector = sequelize.define("NotificationSector", {
    notificacaoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "notificacao_id"
    },

    setorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "setor_id"
    }
}, {
    tableName: "notificacao_setor",
    timestamps: false
});

module.exports = NotificationSector;