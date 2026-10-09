const PermissionContext = require("../strategies/PermissionContext");

function permissionMiddleware(acao) {
    return (req, res, next) => {
        try {
            const userType = req.user.userType;

            const permitido = PermissionContext.podeExecutar(
                userType,
                acao
            );

            if (!permitido) {
                return res.status(403).json({
                    error: "Você não tem permissão para executar esta ação."
                });
            }

            next();
        } catch (error) {
            return res.status(403).json({
                error: "Não foi possível verificar a permissão."
            });
        }
    };
}

module.exports = permissionMiddleware;