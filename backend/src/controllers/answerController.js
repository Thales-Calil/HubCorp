const Answer = require("../models/Answer");

class AnswerController {

    async listar(req, res) {
        try {
            const respostas = await Answer.findAll();

            res.json(respostas);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Erro ao buscar respostas.",
                details: error.message
            });
        }
    }

    async buscarPorId(req, res) {
        try {
            const resposta = await Answer.findByPk(req.params.id);

            if (!resposta) {
                return res.status(404).json({
                    error: "Resposta não encontrada."
                });
            }

            res.json(resposta);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Erro ao buscar resposta.",
                details: error.message
            });
        }
    }

    async criar(req, res) {
        try {
            const {
                formularioRespondidoId,
                perguntaId,
                valor
            } = req.body;

            const resposta = await Answer.create({
                formularioRespondidoId,
                perguntaId,
                valor
            });

            res.status(201).json(resposta);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Erro ao criar resposta.",
                details: error.message
            });
        }
    }

    async atualizar(req, res) {
        try {
            const resposta = await Answer.findByPk(req.params.id);

            if (!resposta) {
                return res.status(404).json({
                    error: "Resposta não encontrada."
                });
            }

            const {
                formularioRespondidoId,
                perguntaId,
                valor
            } = req.body;

            await resposta.update({
                formularioRespondidoId,
                perguntaId,
                valor
            });

            res.json(resposta);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Erro ao atualizar resposta.",
                details: error.message
            });
        }
    }

    async excluir(req, res) {
        try {
            const resposta = await Answer.findByPk(req.params.id);

            if (!resposta) {
                return res.status(404).json({
                    error: "Resposta não encontrada."
                });
            }

            await resposta.destroy();

            res.json({
                message: "Resposta excluída com sucesso."
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Erro ao excluir resposta.",
                details: error.message
            });
        }
    }
}

module.exports = new AnswerController();