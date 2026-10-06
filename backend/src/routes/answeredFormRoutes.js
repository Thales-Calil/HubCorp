const express = require("express");
const answeredFormController = require("../controllers/answeredFormController");

const router = express.Router();

router.get("/", answeredFormController.listar);
router.get("/:id", answeredFormController.buscarPorId);
router.post("/", answeredFormController.criar);
router.put("/:id", answeredFormController.atualizar);
router.delete("/:id", answeredFormController.excluir);

module.exports = router;