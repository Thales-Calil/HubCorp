import { apiRequest } from './api';

export function listarPerguntas(token) {
  return apiRequest('/api/perguntas', { token });
}

export function buscarPergunta(id, token) {
  return apiRequest(`/api/perguntas/${id}`, { token });
}

export function criarPergunta(dados, token) {
  return apiRequest('/api/perguntas', {
    method: 'POST',
    body: dados,
    token
  });
}

export function atualizarPergunta(id, dados, token) {
  return apiRequest(`/api/perguntas/${id}`, {
    method: 'PUT',
    body: dados,
    token
  });
}

export function excluirPergunta(id, token) {
  return apiRequest(`/api/perguntas/${id}`, {
    method: 'DELETE',
    token
  });
}
