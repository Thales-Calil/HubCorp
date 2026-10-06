class QuestionFactory {

    static criar(tipo, dados) {

        switch (tipo) {

            case "ESCALA":
                return {
                    ...dados,
                    tipo: "ESCALA"
                };

            case "MULTIPLA_ESCOLHA":
                return {
                    ...dados,
                    tipo: "MULTIPLA_ESCOLHA"
                };

            case "TEXTO":
                return {
                    ...dados,
                    tipo: "TEXTO"
                };

            case "NUMERO":
                return {
                    ...dados,
                    tipo: "NUMERO"
                };

            case "SIM_NAO":
                return {
                    ...dados,
                    tipo: "SIM_NAO"
                };

            default:
                throw new Error("Tipo de pergunta inválido.");
        }
    }
}

module.exports = QuestionFactory;