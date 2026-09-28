const Sector = require("../models/Sector");

class SectorController {

    async listar(req, res) {
        try {
            const setores = await Sector.findAll();

            res.json(setores);
        } catch (error) {
            res.status(500).json({
                error: "Erro ao buscar setores."
            });
        }
    }

    async buscarPorId(req, res) {
        try {
            const setor = await Sector.findByPk(req.params.id);

            if (!setor) {
                return res.status(404).json({
                    error: "Setor não encontrado."
                });
            }

            res.json(setor);
        } catch (error) {
            res.status(500).json({
                error: "Erro ao buscar setor."
            });
        }
    }

    async criar(req, res) {
        try {
            const { nome, descricao } = req.body;

            const setor = await Sector.create({
                nome,
                descricao
            });

            res.status(201).json(setor);
        } catch (error) {
            res.status(500).json({
                error: "Erro ao criar setor."
            });
        }
    }

    async atualizar(req, res) {
        try {
            const setor = await Sector.findByPk(req.params.id);

            if (!setor) {
                return res.status(404).json({
                    error: "Setor não encontrado."
                });
            }

            const { nome, descricao } = req.body;

            await setor.update({
                nome,
                descricao
            });

            res.json(setor);
        } catch (error) {
            res.status(500).json({
                error: "Erro ao atualizar setor."
            });
        }
    }

    async excluir(req, res) {
        try {
            const setor = await Sector.findByPk(req.params.id);

            if (!setor) {
                return res.status(404).json({
                    error: "Setor não encontrado."
                });
            }

            await setor.destroy();

            res.json({
                message: "Setor excluído com sucesso."
            });
        } catch (error) {
            res.status(500).json({
                error: "Erro ao excluir setor."
            });
        }
    }
}

module.exports = new SectorController();