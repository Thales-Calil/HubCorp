const Question = require("../models/Question");
const QuestionFactory = require("../factories/QuestionFactory");

class QuestionController {

    async listar(req, res) {
        try {
            const perguntas = await Question.findAll();

            res.json(perguntas);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Erro ao buscar perguntas.",
                details: error.message
            });
        }
    }

    async buscarPorId(req, res) {
        try {
            const pergunta = await Question.findByPk(req.params.id);

            if (!pergunta) {
                return res.status(404).json({
                    error: "Pergunta não encontrada."
                });
            }

            res.json(pergunta);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Erro ao buscar pergunta.",
                details: error.message
            });
        }
    }

    async criar(req, res) {
        try {
            const {
                formularioId,
                titulo,
                tipo,
                ordem,
                opcoes
            } = req.body;

            const dadosPergunta = QuestionFactory.criar(tipo, {
                formularioId,
                titulo,
                ordem,
                opcoes
            });

            const pergunta = await Question.create(dadosPergunta);

            res.status(201).json(pergunta);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Erro ao criar pergunta.",
                details: error.message
            });
        }
    }

    async atualizar(req, res) {
        try {
            const pergunta = await Question.findByPk(req.params.id);

            if (!pergunta) {
                return res.status(404).json({
                    error: "Pergunta não encontrada."
                });
            }

            const {
                formularioId,
                titulo,
                tipo,
                ordem
            } = req.body;

            const dadosPergunta = QuestionFactory.criar(tipo, {
                formularioId,
                titulo,
                ordem
            });

            await pergunta.update(dadosPergunta);

            res.json(pergunta);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Erro ao atualizar pergunta.",
                details: error.message
            });
        }
    }

    async excluir(req, res) {
        try {
            const pergunta = await Question.findByPk(req.params.id);

            if (!pergunta) {
                return res.status(404).json({
                    error: "Pergunta não encontrada."
                });
            }

            await pergunta.destroy();

            res.json({
                message: "Pergunta excluída com sucesso."
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Erro ao excluir pergunta.",
                details: error.message
            });
        }
    }
}

module.exports = new QuestionController();