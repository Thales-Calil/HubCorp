class PermissionStrategy {

    podeExecutar(acao) {
        throw new Error("O método podeExecutar deve ser implementado.");
    }
}

module.exports = PermissionStrategy;