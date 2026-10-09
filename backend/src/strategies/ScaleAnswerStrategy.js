const AnswerValidationStrategy = require("./AnswerValidationStrategy");

class ScaleAnswerStrategy extends AnswerValidationStrategy {

    validar(valor) {
        const numero = Number(valor);

        return Number.isInteger(numero) && numero >= 1 && numero <= 5;
    }
}

module.exports = ScaleAnswerStrategy;