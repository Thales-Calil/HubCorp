const PermissionStrategy = require("./PermissionStrategy");

class RHPermissionStrategy extends PermissionStrategy {

    podeExecutar(acao) {
        const permissoes = [
            "GERENCIAR_USUARIOS",
            "GERENCIAR_SETORES",
            "GERENCIAR_FORMULARIOS",
            "CRIAR_NOTIFICACAO",
            "VISUALIZAR_NOTIFICACAO",
            "RESPONDER_FORMULARIO"
        ];

        return permissoes.includes(acao);
    }
}

module.exports = RHPermissionStrategy;