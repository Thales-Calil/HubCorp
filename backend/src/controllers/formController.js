const Form = require("../models/Form");
const FormFacade = require("../facades/FormFacade");

class FormController {
  async listar(req, res) {
    try {
      const formularios = await Form.findAll();

      res.json(formularios);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Erro ao buscar formulários.",
        details: error.message,
      });
    }
  }

  async buscarPorId(req, res) {
    try {
      const formulario = await Form.findByPk(req.params.id);

      if (!formulario) {
        return res.status(404).json({
          error: "Formulário não encontrado.",
        });
      }

      res.json(formulario);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Erro ao buscar formulário.",
        details: error.message,
      });
    }
  }

  async criar(req, res) {
    try {
      const { titulo, ativo } = req.body;

      const formulario = await Form.create({
        titulo,
        ativo,
      });

      res.status(201).json(formulario);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Erro ao criar formulário.",
        details: error.message,
      });
    }
  }

  async atualizar(req, res) {
    try {
      const formulario = await Form.findByPk(req.params.id);

      if (!formulario) {
        return res.status(404).json({
          error: "Formulário não encontrado.",
        });
      }

      const { titulo, ativo } = req.body;

      await formulario.update({
        titulo,
        ativo,
      });

      res.json(formulario);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Erro ao atualizar formulário.",
        details: error.message,
      });
    }
  }

  async excluir(req, res) {
    try {
      const formulario = await Form.findByPk(req.params.id);

      if (!formulario) {
        return res.status(404).json({
          error: "Formulário não encontrado.",
        });
      }

      await formulario.destroy();

      res.json({
        message: "Formulário excluído com sucesso.",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Erro ao excluir formulário.",
        details: error.message,
      });
    }
  }

  async criarCompleto(req, res) {
    try {
      const { titulo, ativo, perguntas } = req.body;
      const resultado = await FormFacade.criarFormularioCompleto(
        { titulo, ativo },
        perguntas || [],
      );
      res.status(201).json(resultado);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: "Erro ao criar formulário completo.",
          details: error.message,
        });
    }
  }
}

module.exports = new FormController();
