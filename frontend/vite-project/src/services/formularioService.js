import { apiRequest } from './api';

export function listarFormularios(token) {
  return apiRequest('/api/formularios', { token });
}

export function buscarFormulario(id, token) {
  return apiRequest(`/api/formularios/${id}`, { token });
}

export function criarFormularioCompleto(dados, token) {
  return apiRequest('/api/formularios/completo', {
    method: 'POST',
    body: dados,
    token
  });
}

export function atualizarFormulario(id, dados, token) {
  return apiRequest(`/api/formularios/${id}`, {
    method: 'PUT',
    body: dados,
    token
  });
}

export function excluirFormulario(id, token) {
  return apiRequest(`/api/formularios/${id}`, {
    method: 'DELETE',
    token
  });
}
