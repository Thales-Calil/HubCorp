const RHPermissionStrategy = require("./RHPermissionStrategy");
const ManagerPermissionStrategy = require("./ManagerPermissionStrategy");
const CollaboratorPermissionStrategy = require("./CollaboratorPermissionStrategy");

class PermissionContext {

    static obterStrategy(userType) {

        switch (userType) {
            case "RH":
                return new RHPermissionStrategy();

            case "GERENTE":
                return new ManagerPermissionStrategy();

            case "COLABORADOR":
                return new CollaboratorPermissionStrategy();

            default:
                throw new Error("Tipo de usuário inválido.");
        }
    }

    static podeExecutar(userType, acao) {
        const strategy = this.obterStrategy(userType);
        return strategy.podeExecutar(acao);
    }
}

module.exports = PermissionContext;