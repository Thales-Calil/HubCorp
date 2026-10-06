const User = require("./User");
const Sector = require("./Sector");
const Notification = require("./Notification");
const NotificationSector = require("./NotificationSector");
const Question = require("./Question");
const Form = require ("./Form");
const AnsweredForm = require("./AnsweredForm");
const Answer = require("./Answer");

User.belongsTo(Sector, {
    foreignKey: "setorId"
});

Sector.hasMany(User, {
    foreignKey: "setorId"
});

Notification.belongsTo(User, {
    foreignKey: "autorId",
    as: "autor"
});

User.hasMany(Notification, {
    foreignKey: "autorId"
});

Notification.belongsToMany(Sector, {
    through: NotificationSector,
    foreignKey: "notificacaoId",
    otherKey: "setorId"
});

Sector.belongsToMany(Notification, {
    through: NotificationSector,
    foreignKey: "setorId",
    otherKey: "notificacaoId"
});

Form.hasMany(Question, {
    foreignKey: "formularioId"
});

Question.belongsTo(Form, {
    foreignKey: "formularioId"
});

Form.hasMany(AnsweredForm, {
    foreignKey: "formularioId"
});

AnsweredForm.belongsTo(Form, {
    foreignKey: "formularioId"
});

User.hasMany(AnsweredForm, {
    foreignKey: "usuarioId"
});

AnsweredForm.belongsTo(User, {
    foreignKey: "usuarioId"
});

AnsweredForm.hasMany(Answer, {
    foreignKey: "formularioRespondidoId"
});

Answer.belongsTo(AnsweredForm, {
    foreignKey: "formularioRespondidoId"
});

Question.hasMany(Answer, {
    foreignKey: "perguntaId"
});

Answer.belongsTo(Question, {
    foreignKey: "perguntaId"
});

module.exports = {
    User,
    Sector,
    Notification,
    NotificationSector,
    Form,
    Question,
    AnsweredForm,
    Answer
};