const User = require("../models/User");

class UserController {

    async listar(req, res) {
        try {
            const usuarios = await User.findAll();

            res.json(usuarios);
        } catch (error) {
            res.status(500).json({
                error: "Erro ao buscar usuários."
            });
        }
    }

    async buscarPorId(req, res) {
        try {
            const usuario = await User.findByPk(req.params.id);

            if (!usuario) {
                return res.status(404).json({
                    error: "Usuário não encontrado."
                });
            }

            res.json(usuario);
        } catch (error) {
            res.status(500).json({
                error: "Erro ao buscar usuário."
            });
        }
    }

    async criar(req, res) {
        try {
            const {
                nome,
                email,
                senha,
                telefone,
                cargo,
                setorId,
                userType,
                ativo
            } = req.body;

            const usuario = await User.create({
                nome,
                email,
                senha,
                telefone,
                cargo,
                setorId,
                userType,
                ativo
            });

            res.status(201).json(usuario);
        } catch (error) {
            res.status(500).json({
                error: "Erro ao criar usuário.",
            });
        }
    }

    async atualizar(req, res) {
        try {
            const usuario = await User.findByPk(req.params.id);

            if (!usuario) {
                return res.status(404).json({
                    error: "Usuário não encontrado."
                });
            }

            const {
                nome,
                emailCorporativo,
                senha,
                telefone,
                cargo,
                setorId,
                userType,
                ativo
            } = req.body;

            await usuario.update({
                nome,
                emailCorporativo,
                senha,
                telefone,
                cargo,
                setorId,
                userType,
                ativo
            });

            res.json(usuario);
        } catch (error) {
            res.status(500).json({
                error: "Erro ao atualizar usuário."
            });
        }
    }

    async excluir(req, res) {
        try {
            const usuario = await User.findByPk(req.params.id);

            if (!usuario) {
                return res.status(404).json({
                    error: "Usuário não encontrado."
                });
            }

            await usuario.destroy();

            res.json({
                message: "Usuário excluído com sucesso."
            });
        } catch (error) {
            res.status(500).json({
                error: "Erro ao excluir usuário."
            });
        }
    }
}

module.exports = new UserController();