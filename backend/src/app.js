const express = require("express");
const cors = require("cors");

const app = express();

const sectorRoutes = require("./routes/sectorRoutes");
const userRoutes = require("./routes/userRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const formRoutes = require("./routes/formRoutes");
const questionRoutes = require("./routes/questionRoutes");
const answeredFormRoutes = require("./routes/answeredFormRoutes");
const answerRoutes = require("./routes/answerRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/setores", sectorRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/notificacoes", notificationRoutes);
app.use("/api/formularios", formRoutes);
app.use("/api/perguntas", questionRoutes);
app.use("/api/formularios-respondidos", answeredFormRoutes);
app.use("/api/respostas", answerRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "HubCorp API funcionando!"
    });
});

module.exports = app;