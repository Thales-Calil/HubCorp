const AnsweredForm = require("../models/AnsweredForm");

class AnsweredFormController {

    async listar(req, res) {
        try {
            const formulariosRespondidos = await AnsweredForm.findAll();

            res.json(formulariosRespondidos);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Erro ao buscar formulários respondidos.",
                details: error.message
            });
        }
    }

    async buscarPorId(req, res) {
        try {
            const formularioRespondido = await AnsweredForm.findByPk(req.params.id);

            if (!formularioRespondido) {
                return res.status(404).json({
                    error: "Formulário respondido não encontrado."
                });
            }

            res.json(formularioRespondido);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Erro ao buscar formulário respondido.",
                details: error.message
            });
        }
    }

    async criar(req, res) {
        try {
            const {
                formularioId,
                usuarioId
            } = req.body;

            const formularioRespondido = await AnsweredForm.create({
                formularioId,
                usuarioId
            });

            res.status(201).json(formularioRespondido);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Erro ao registrar formulário respondido.",
                details: error.message
            });
        }
    }

    async atualizar(req, res) {
        try {
            const formularioRespondido = await AnsweredForm.findByPk(req.params.id);

            if (!formularioRespondido) {
                return res.status(404).json({
                    error: "Formulário respondido não encontrado."
                });
            }

            const {
                formularioId,
                usuarioId
            } = req.body;

            await formularioRespondido.update({
                formularioId,
                usuarioId
            });

            res.json(formularioRespondido);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Erro ao atualizar formulário respondido.",
                details: error.message
            });
        }
    }

    async excluir(req, res) {
        try {
            const formularioRespondido = await AnsweredForm.findByPk(req.params.id);

            if (!formularioRespondido) {
                return res.status(404).json({
                    error: "Formulário respondido não encontrado."
                });
            }

            await formularioRespondido.destroy();

            res.json({
                message: "Formulário respondido excluído com sucesso."
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Erro ao excluir formulário respondido.",
                details: error.message
            });
        }
    }
}

module.exports = new AnsweredFormController();