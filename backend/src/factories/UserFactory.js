class UserFactory {

    static criar(dados) {

        const tiposPermitidos = [
            "RH",
            "GERENTE",
            "COLABORADOR"
        ];

        if (!tiposPermitidos.includes(dados.userType)) {
            throw new Error("Tipo de usuário inválido.");
        }

        return {
            nome: dados.nome,
            email: dados.email,
            senha: dados.senha,
            telefone: dados.telefone || null,
            cargo: dados.cargo || null,
            setorId: dados.setorId,
            userType: dados.userType,
            ativo: dados.ativo ?? true
        };
    }
}

module.exports = UserFactory;