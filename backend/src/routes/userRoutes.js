const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.listar);
router.get("/:id", userController.buscarPorId);
router.post("/", userController.criar);
router.put("/:id", userController.atualizar);
router.delete("/:id", userController.excluir);

module.exports = router;