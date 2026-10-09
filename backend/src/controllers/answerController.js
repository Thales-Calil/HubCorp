const Answer = require("../models/Answer");
const Question = require("../models/Question");
const AnswerValidationContext = require("../strategies/AnswerValidationContext");

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

        const pergunta = await Question.findByPk(perguntaId);

        if (!pergunta) {
            return res.status(404).json({
                error: "Pergunta não encontrada."
            });
        }

        const strategy = AnswerValidationContext.obterStrategy(
            pergunta.tipo
        );

        const valido = strategy.validar(valor, pergunta.opcoes);

        if (!valido) {
            return res.status(400).json({
                error: "Resposta inválida para o tipo da pergunta."
            });
        }

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