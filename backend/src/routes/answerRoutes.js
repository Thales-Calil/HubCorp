const express = require("express");
const answerController = require("../controllers/answerController");

const router = express.Router();

router.get("/", answerController.listar);
router.get("/:id", answerController.buscarPorId);
router.post("/", answerController.criar);
router.put("/:id", answerController.atualizar);
router.delete("/:id", answerController.excluir);

module.exports = router;