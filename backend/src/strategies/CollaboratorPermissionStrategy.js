const PermissionStrategy = require("./PermissionStrategy");

class CollaboratorPermissionStrategy extends PermissionStrategy {

    podeExecutar(acao) {
        const permissoes = [
            "VISUALIZAR_NOTIFICACAO",
            "RESPONDER_FORMULARIO"
        ];

        return permissoes.includes(acao);
    }
}

module.exports = CollaboratorPermissionStrategy;