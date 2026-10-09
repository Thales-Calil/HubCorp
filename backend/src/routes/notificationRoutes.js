const express = require("express");
const notificationController = require("../controllers/notificationController");

const authMiddleware = require("../middlewares/authMiddleware");
const permissionMiddleware = require("../middlewares/permissionMiddleware");

const router = express.Router();

// Listar notificações: RH, GERENTE e COLABORADOR
router.get(
    "/",
    authMiddleware,
    permissionMiddleware("VISUALIZAR_NOTIFICACAO"),
    notificationController.listar
);

// Buscar uma notificação: RH, GERENTE e COLABORADOR
router.get(
    "/:id",
    authMiddleware,
    permissionMiddleware("VISUALIZAR_NOTIFICACAO"),
    notificationController.buscarPorId
);

// Criar notificação: RH e GERENTE
router.post(
    "/",
    authMiddleware,
    permissionMiddleware("CRIAR_NOTIFICACAO"),
    notificationController.criar
);

// Editar notificação: somente RH
router.put(
    "/:id",
    authMiddleware,
    permissionMiddleware("EDITAR_NOTIFICACAO"),
    notificationController.atualizar
);

// Excluir notificação: somente RH
router.delete(
    "/:id",
    authMiddleware,
    permissionMiddleware("EXCLUIR_NOTIFICACAO"),
    notificationController.excluir
);

// Alterar setores associados: somente RH
router.put(
    "/:id/setores",
    authMiddleware,
    permissionMiddleware("EDITAR_NOTIFICACAO"),
    notificationController.adicionarSetores
);

module.exports = router;