import { apiRequest } from './api';

export function listarSetores(token) {
  return apiRequest('/api/setores', { token });
}

export function buscarSetor(id, token) {
  return apiRequest(`/api/setores/${id}`, { token });
}
