const express = require("express");
const questionController = require("../controllers/questionController");

const authMiddleware = require("../middlewares/authMiddleware");
const permissionMiddleware = require("../middlewares/permissionMiddleware");

const router = express.Router();

// Consultar perguntas: RH, GERENTE e COLABORADOR
router.get(
    "/",
    authMiddleware,
    permissionMiddleware("VISUALIZAR_FORMULARIO"),
    questionController.listar
);

router.get(
    "/:id",
    authMiddleware,
    permissionMiddleware("VISUALIZAR_FORMULARIO"),
    questionController.buscarPorId
);

// Gerenciar perguntas: somente RH
router.post(
    "/",
    authMiddleware,
    permissionMiddleware("GERENCIAR_FORMULARIOS"),
    questionController.criar
);

router.put(
    "/:id",
    authMiddleware,
    permissionMiddleware("GERENCIAR_FORMULARIOS"),
    questionController.atualizar
);

router.delete(
    "/:id",
    authMiddleware,
    permissionMiddleware("GERENCIAR_FORMULARIOS"),
    questionController.excluir
);

module.exports = router;