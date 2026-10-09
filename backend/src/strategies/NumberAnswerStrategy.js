const AnswerValidationStrategy = require("./AnswerValidationStrategy");

class NumberAnswerStrategy extends AnswerValidationStrategy {

    validar(valor) {
        return !isNaN(Number(valor));
    }
}

module.exports = NumberAnswerStrategy;