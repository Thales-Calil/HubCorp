const express = require("express");
const answerController = require("../controllers/answerController");

const authMiddleware = require("../middlewares/authMiddleware");
const permissionMiddleware = require("../middlewares/permissionMiddleware");

const router = express.Router();

// Listar respostas: somente RH
router.get(
    "/",
    authMiddleware,
    permissionMiddleware("GERENCIAR_FORMULARIOS"),
    answerController.listar
);

// Consultar resposta por ID: somente RH
router.get(
    "/:id",
    authMiddleware,
    permissionMiddleware("GERENCIAR_FORMULARIOS"),
    answerController.buscarPorId
);

// Criar resposta: RH, GERENTE e COLABORADOR
router.post(
    "/",
    authMiddleware,
    permissionMiddleware("RESPONDER_FORMULARIO"),
    answerController.criar
);

// Editar resposta: somente RH
router.put(
    "/:id",
    authMiddleware,
    permissionMiddleware("GERENCIAR_FORMULARIOS"),
    answerController.atualizar
);

// Excluir resposta: somente RH
router.delete(
    "/:id",
    authMiddleware,
    permissionMiddleware("GERENCIAR_FORMULARIOS"),
    answerController.excluir
);

module.exports = router;