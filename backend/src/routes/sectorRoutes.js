const express = require("express");
const sectorController = require("../controllers/sectorController");

const router = express.Router();

router.get("/", sectorController.listar);
router.get("/:id", sectorController.buscarPorId);
router.post("/", sectorController.criar);
router.put("/:id", sectorController.atualizar);
router.delete("/:id", sectorController.excluir);

module.exports = router;