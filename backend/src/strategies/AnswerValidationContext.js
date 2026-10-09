const ScaleAnswerStrategy = require("./ScaleAnswerStrategy");
const TextAnswerStrategy = require("./TextAnswerStrategy");
const NumberAnswerStrategy = require("./NumberAnswerStrategy");
const YesNoAnswerStrategy = require("./YesNoAnswerStrategy");
const MultipleChoiceAnswerStrategy = require("./MultipleChoiceAnswerStrategy");

class AnswerValidationContext {

    static obterStrategy(tipo) {

        switch (tipo) {

            case "ESCALA":
                return new ScaleAnswerStrategy();

            case "TEXTO":
                return new TextAnswerStrategy();

            case "NUMERO":
                return new NumberAnswerStrategy();

            case "SIM_NAO":
                return new YesNoAnswerStrategy();
            
            case "MULTIPLA_ESCOLHA":
                return new MultipleChoiceAnswerStrategy();

            default:
                throw new Error("Tipo de pergunta não possui estratégia de validação.");
        }
    }
}

module.exports = AnswerValidationContext;