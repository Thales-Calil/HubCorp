const express = require("express");
const answeredFormController = require("../controllers/answeredFormController");

const authMiddleware = require("../middlewares/authMiddleware");
const permissionMiddleware = require("../middlewares/permissionMiddleware");

const router = express.Router();

// Consultar todos os formulários respondidos: somente RH
router.get(
    "/",
    authMiddleware,
    permissionMiddleware("GERENCIAR_FORMULARIOS"),
    answeredFormController.listar
);

// Consultar um formulário respondido: somente RH
router.get(
    "/:id",
    authMiddleware,
    permissionMiddleware("GERENCIAR_FORMULARIOS"),
    answeredFormController.buscarPorId
);

// Enviar formulário respondido: RH, GERENTE e COLABORADOR
router.post(
    "/",
    authMiddleware,
    permissionMiddleware("RESPONDER_FORMULARIO"),
    answeredFormController.criar
);

// Editar registro: somente RH
router.put(
    "/:id",
    authMiddleware,
    permissionMiddleware("GERENCIAR_FORMULARIOS"),
    answeredFormController.atualizar
);

// Excluir registro: somente RH
router.delete(
    "/:id",
    authMiddleware,
    permissionMiddleware("GERENCIAR_FORMULARIOS"),
    answeredFormController.excluir
);

module.exports = router;