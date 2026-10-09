const express = require("express");
const formController = require("../controllers/formController");

const router = express.Router();

router.get("/", formController.listar);
router.post("/completo", formController.criarCompleto);
router.get("/:id", formController.buscarPorId);
router.post("/", formController.criar);
router.put("/:id", formController.atualizar);
router.delete("/:id", formController.excluir);

module.exports = router;