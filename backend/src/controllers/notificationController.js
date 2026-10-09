const Notification = require("../models/Notification");
const Sector = require("../models/Sector");
const NotificationFacade = require("../facades/NotificationFacade");

class NotificationController {

    async listar(req, res) {
        try {
            const notificacoes = await Notification.findAll({
                include: Sector
            });

            res.json(notificacoes);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Erro ao buscar comunicados.",
                details: error.message
            });
        }
    }

    async buscarPorId(req, res) {
        try {
            const notificacao = await Notification.findByPk(req.params.id, {
                include: {
                    model: Sector
                }
            });

            if (!notificacao) {
                return res.status(404).json({
                    error: "Comunicado não encontrado."
                });
            }

            res.json(notificacao);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Erro ao buscar comunicado.",
                details: error.message
            });
        }
    }

    async criar(req, res) {
        try {
            const {
                titulo,
                descricao,
                autorId,
                setores
            } = req.body;

            const notificacao = await NotificationFacade.criarNotificacao(
                { titulo, descricao, autorId },
                setores || []
            );

            res.status(201).json(notificacao);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Erro ao criar comunicado.",
                details: error.message
            });
        }
    }

    async atualizar(req, res) {
        try {
            const notificacao = await Notification.findByPk(req.params.id);

            if (!notificacao) {
                return res.status(404).json({
                    error: "Comunicado não encontrado."
                });
            }

            const {
                titulo,
                descricao,
                autorId
            } = req.body;

            await notificacao.update({
                titulo,
                descricao,
                autorId
            });

            res.json(notificacao);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Erro ao atualizar comunicado.",
                details: error.message
            });
        }
    }

    async excluir(req, res) {
        try {
            const notificacao = await Notification.findByPk(req.params.id);

            if (!notificacao) {
                return res.status(404).json({
                    error: "Comunicado não encontrado."
                });
            }

            await notificacao.destroy();

            res.json({
                message: "Comunicado excluído com sucesso."
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Erro ao excluir comunicado.",
                details: error.message
            });
        }
    }

    async adicionarSetores(req, res) {
    try {
        const notificacao = await Notification.findByPk(req.params.id);

        if (!notificacao) {
            return res.status(404).json({
                error: "Comunicado não encontrado."
            });
        }

        const { setores } = req.body;

        await notificacao.setSectors(setores);

        res.json({
            message: "Setores associados ao comunicado com sucesso."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Erro ao associar setores.",
            details: error.message
        });
    }
    }
}

module.exports = new NotificationController();