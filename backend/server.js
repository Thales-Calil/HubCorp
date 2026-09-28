const app = require("./src/app");
const sequelize = require("./src/database/connection");

require("./src/models/associations");

/// configuração da porta. Verifica porta no arquivo .env, se não tiver, a porta é 3000
const PORT = process.env.PORT || 3000;

/// função assíncrona para iniciar o servidor backend
async function startServer() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        console.log("Banco de dados conectado!");

        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao conectar com o banco:", error);
    }
}

startServer();