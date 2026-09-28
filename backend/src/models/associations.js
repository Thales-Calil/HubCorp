const User = require("./User");
const Sector = require("./Sector");

User.belongsTo(Sector, {
    foreignKey: "setorId"
});

Sector.hasMany(User, {
    foreignKey: "setorId"
});

module.exports = {
    User,
    Sector
};