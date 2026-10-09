const User = require("../models/User");
const UserFactory = require("../factories/UserFactory");
const bcrypt = require("bcryptjs");

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
            const dadosUsuario = UserFactory.criar(req.body);

            dadosUsuario.senha = await bcrypt.hash(dadosUsuario.senha, 10);

            const usuario = await User.create(dadosUsuario);

            const { senha, ...usuarioSemSenha } = usuario.toJSON();

            res.status(201).json(usuarioSemSenha);

        } catch (error) {
            console.error(error);

            res.status(400).json({
                error: "Erro ao criar usuário.",
                details: error.message
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
                email,
                senha,
                telefone,
                cargo,
                setorId,
                userType,
                ativo
            } = req.body;

            const dadosAtualizados = {
                nome,
                email,
                telefone,
                cargo,
                setorId,
                userType,
                ativo
            };

            // Só altera a senha se uma nova senha for enviada.
            if (senha) {
                dadosAtualizados.senha = await bcrypt.hash(senha, 10);
            }

            // Evita sobrescrever campos que não foram enviados.
            Object.keys(dadosAtualizados).forEach((campo) => {
                if (dadosAtualizados[campo] === undefined) {
                    delete dadosAtualizados[campo];
                }
            });

            await usuario.update(dadosAtualizados);

            const { senha: senhaOculta, ...usuarioSemSenha } =
                usuario.toJSON();

            res.json(usuarioSemSenha);
        } catch (error) {
            console.error(error);

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