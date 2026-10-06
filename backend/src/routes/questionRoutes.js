const express = require("express");
const questionController = require("../controllers/questionController");

const router = express.Router();

router.get("/", questionController.listar);
router.get("/:id", questionController.buscarPorId);
router.post("/", questionController.criar);
router.put("/:id", questionController.atualizar);
router.delete("/:id", questionController.excluir);

module.exports = router;