const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            error: "Token de autenticação não informado."
        });
    }

    const partes = authorization.split(" ");

    if (partes.length !== 2 || partes[0] !== "Bearer") {
        return res.status(401).json({
            error: "Formato do token inválido."
        });
    }

    const token = partes[1];

    try {
        const dadosUsuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = dadosUsuario;

        next();
    } catch (error) {
        return res.status(401).json({
            error: "Token inválido ou expirado."
        });
    }
}

module.exports = authMiddleware;