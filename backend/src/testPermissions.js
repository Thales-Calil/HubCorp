const PermissionContext = require("./strategies/PermissionContext");

console.log(
    "RH pode gerenciar usuários:",
    PermissionContext.podeExecutar("RH", "GERENCIAR_USUARIOS")
);

console.log(
    "Gerente pode gerenciar usuários:",
    PermissionContext.podeExecutar("GERENTE", "GERENCIAR_USUARIOS")
);

console.log(
    "Colaborador pode responder formulário:",
    PermissionContext.podeExecutar("COLABORADOR", "RESPONDER_FORMULARIO")
);