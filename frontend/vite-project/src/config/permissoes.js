export const permissoesPorPerfil = {
  RH: [
    'GERENCIAR_USUARIOS',
    'GERENCIAR_SETORES',
    'GERENCIAR_FORMULARIOS',
    'CRIAR_NOTIFICACAO',
    'VISUALIZAR_NOTIFICACAO',
    'RESPONDER_FORMULARIO',
    'EDITAR_NOTIFICACAO',
    'EXCLUIR_NOTIFICACAO',
    'VISUALIZAR_FORMULARIO'
  ],
  GERENTE: [
    'CRIAR_NOTIFICACAO',
    'VISUALIZAR_NOTIFICACAO',
    'RESPONDER_FORMULARIO',
    'VISUALIZAR_FORMULARIO'
  ],
  COLABORADOR: [
    'VISUALIZAR_NOTIFICACAO',
    'RESPONDER_FORMULARIO',
    'VISUALIZAR_FORMULARIO'
  ]
};

export function perfilReconhecido(userType) {
  return Object.prototype.hasOwnProperty.call(permissoesPorPerfil, userType);
}

export function temPermissao(userType, acao) {
  return perfilReconhecido(userType) && permissoesPorPerfil[userType].includes(acao);
}
