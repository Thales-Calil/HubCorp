const AnswerValidationStrategy = require("./AnswerValidationStrategy");

class MultipleChoiceAnswerStrategy extends AnswerValidationStrategy {

  validar(valor, opcoes) {

    return Array.isArray(opcoes) && opcoes.includes(valor);

  }
}

module.exports = MultipleChoiceAnswerStrategy;
