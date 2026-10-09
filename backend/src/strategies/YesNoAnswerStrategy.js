const AnswerValidationStrategy = require("./AnswerValidationStrategy");

class YesNoAnswerStrategy extends AnswerValidationStrategy {

    validar(valor) {
        return valor === "SIM" || valor === "NAO";
    }
}

module.exports = YesNoAnswerStrategy;