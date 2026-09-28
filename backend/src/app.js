const express = require("express");
const cors = require("cors");

const app = express();

const sectorRoutes = require("./routes/sectorRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/setores", sectorRoutes);
app.use("/api/usuarios", userRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "HubCorp API funcionando!"
    });
});

module.exports = app;