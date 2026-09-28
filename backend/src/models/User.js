const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },

    telefone: {
        type: DataTypes.STRING,
        allowNull: true
    },

    cargo: {
        type: DataTypes.STRING,
        allowNull: true
    },

    setorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "setor_id"
    },

    userType: {
        type: DataTypes.STRING,
        allowNull: false
    },

    ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: "usuario",
    timestamps: false
});

module.exports = User;