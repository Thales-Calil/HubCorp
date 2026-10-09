const express = require("express");
const formController = require("../controllers/formController");

const authMiddleware = require("../middlewares/authMiddleware");
const permissionMiddleware = require("../middlewares/permissionMiddleware");

const router = express.Router();

// Listar formulários: somente RH
router.get(
    "/",
    authMiddleware,
    permissionMiddleware("VISUALIZAR_FORMULARIO"),
    formController.listar
);

// Criar formulário completo com perguntas: somente RH
router.post(
    "/completo",
    authMiddleware,
    permissionMiddleware("GERENCIAR_FORMULARIOS"),
    formController.criarCompleto
);

// Buscar formulário por ID: somente RH
router.get(
    "/:id",
    authMiddleware,
    permissionMiddleware("VISUALIZAR_FORMULARIO"),
    formController.buscarPorId
);

// Criar formulário: somente RH
router.post(
    "/",
    authMiddleware,
    permissionMiddleware("GERENCIAR_FORMULARIOS"),
    formController.criar
);

// Editar formulário: somente RH
router.put(
    "/:id",
    authMiddleware,
    permissionMiddleware("GERENCIAR_FORMULARIOS"),
    formController.atualizar
);

// Excluir formulário: somente RH
router.delete(
    "/:id",
    authMiddleware,
    permissionMiddleware("GERENCIAR_FORMULARIOS"),
    formController.excluir
);

module.exports = router;