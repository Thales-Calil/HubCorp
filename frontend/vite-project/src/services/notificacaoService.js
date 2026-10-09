import { apiRequest } from './api';

export function listarNotificacoes(token) {
  return apiRequest('/api/notificacoes', { token });
}

export function buscarNotificacao(id, token) {
  return apiRequest(`/api/notificacoes/${id}`, { token });
}

export function criarNotificacao(dados, token) {
  return apiRequest('/api/notificacoes', {
    method: 'POST',
    body: dados,
    token
  });
}

export function atualizarNotificacao(id, dados, token) {
  return apiRequest(`/api/notificacoes/${id}`, {
    method: 'PUT',
    body: dados,
    token
  });
}

export function excluirNotificacao(id, token) {
  return apiRequest(`/api/notificacoes/${id}`, {
    method: 'DELETE',
    token
  });
}

export function atualizarSetoresNotificacao(id, setores, token) {
  return apiRequest(`/api/notificacoes/${id}/setores`, {
    method: 'PUT',
    body: { setores },
    token
  });
}
