const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

class AuthController {
    async login(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({
                    error: "Informe o e-mail e a senha."
                });
            }

            const usuario = await User.findOne({
                where: { email }
            });

            if (!usuario) {
                return res.status(401).json({
                    error: "E-mail ou senha inválidos."
                });
            }

            if (!usuario.ativo) {
                return res.status(403).json({
                    error: "Este usuário está inativo."
                });
            }

            const senhaCorreta = await bcrypt.compare(
                senha,
                usuario.senha
            );

            if (!senhaCorreta) {
                return res.status(401).json({
                    error: "E-mail ou senha inválidos."
                });
            }

            if (!process.env.JWT_SECRET) {
                throw new Error("JWT_SECRET não configurado.");
            }

            const token = jwt.sign(
                {
                    id: usuario.id,
                    userType: usuario.userType
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            return res.json({
                message: "Login realizado com sucesso.",
                token,
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    cargo: usuario.cargo,
                    setorId: usuario.setorId,
                    userType: usuario.userType
                }
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                error: "Erro ao realizar login."
            });
        }
    }
}

module.exports = new AuthController();