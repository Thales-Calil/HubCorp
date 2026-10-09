const express = require("express");
const sectorController = require("../controllers/sectorController");

const authMiddleware = require("../middlewares/authMiddleware");
const permissionMiddleware = require("../middlewares/permissionMiddleware");

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    permissionMiddleware("GERENCIAR_SETORES"),
    sectorController.listar
);

router.get(
    "/:id",
    authMiddleware,
    permissionMiddleware("GERENCIAR_SETORES"),
    sectorController.buscarPorId
);

router.post(
    "/",
    authMiddleware,
    permissionMiddleware("GERENCIAR_SETORES"),
    sectorController.criar
);

router.put(
    "/:id",
    authMiddleware,
    permissionMiddleware("GERENCIAR_SETORES"),
    sectorController.atualizar
);

router.delete(
    "/:id",
    authMiddleware,
    permissionMiddleware("GERENCIAR_SETORES"),
    sectorController.excluir
);

module.exports = router;