const AnswerValidationStrategy = require("./AnswerValidationStrategy");

class TextAnswerStrategy extends AnswerValidationStrategy {

    validar(valor) {
        return typeof valor === "string" && valor.trim().length > 0;
    }
}

module.exports = TextAnswerStrategy;