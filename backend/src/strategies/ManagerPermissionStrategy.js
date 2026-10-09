const PermissionStrategy = require("./PermissionStrategy");

class ManagerPermissionStrategy extends PermissionStrategy {

    podeExecutar(acao) {
        const permissoes = [
            "CRIAR_NOTIFICACAO",
            "VISUALIZAR_NOTIFICACAO",
            "RESPONDER_FORMULARIO"
        ];

        return permissoes.includes(acao);
    }
}

module.exports = ManagerPermissionStrategy;