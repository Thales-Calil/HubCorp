import { apiRequest } from './api';

export function listarSetores(token) {
  return apiRequest('/api/setores', { token });
}

export function buscarSetor(id, token) {
  return apiRequest(`/api/setores/${id}`, { token });
}

export function criarSetor(dados, token) {
  return apiRequest('/api/setores', { method: 'POST', body: dados, token });
}

export function atualizarSetor(id, dados, token) {
  return apiRequest(`/api/setores/${id}`, { method: 'PUT', body: dados, token });
}

export function excluirSetor(id, token) {
  return apiRequest(`/api/setores/${id}`, { method: 'DELETE', token });
}
