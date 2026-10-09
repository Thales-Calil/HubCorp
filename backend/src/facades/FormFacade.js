const Form = require("../models/Form");
const Question = require("../models/Question");
const QuestionFactory = require("../factories/QuestionFactory");

class FormFacade {

  static async criarFormularioCompleto(dadosFormulario, perguntas) {
    const formulario = await Form.create(dadosFormulario);
    const perguntasCriadas = [];
    
    for (const pergunta of perguntas) {
      const dadosPergunta = QuestionFactory.criar(pergunta.tipo, {
        formularioId: formulario.id,
        titulo: pergunta.titulo,
        ordem: pergunta.ordem,
        opcoes: pergunta.opcoes,
      });
      const perguntaCriada = await Question.create(dadosPergunta);
      perguntasCriadas.push(perguntaCriada);
    }
    return { formulario, perguntas: perguntasCriadas };
  }
}
module.exports = FormFacade;
