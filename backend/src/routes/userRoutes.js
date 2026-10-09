const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const permissionMiddleware = require("../middlewares/permissionMiddleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  permissionMiddleware("GERENCIAR_USUARIOS"),
  userController.listar,
);

router.get(
  "/:id",
  authMiddleware,
  permissionMiddleware("GERENCIAR_USUARIOS"),
  userController.buscarPorId,
);

router.post(
  "/",
  authMiddleware,
  permissionMiddleware("GERENCIAR_USUARIOS"),
  userController.criar,
);

router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware("GERENCIAR_USUARIOS"),
  userController.atualizar,
);

router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("GERENCIAR_USUARIOS"),
  userController.excluir,
);
module.exports = router;
