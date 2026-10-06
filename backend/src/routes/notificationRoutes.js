const express = require("express");
const notificationController = require("../controllers/notificationController");

const router = express.Router();

router.get("/", notificationController.listar);
router.get("/:id", notificationController.buscarPorId);
router.post("/", notificationController.criar);
router.put("/:id", notificationController.atualizar);
router.delete("/:id", notificationController.excluir);
router.put("/:id/setores", notificationController.adicionarSetores);

module.exports = router;