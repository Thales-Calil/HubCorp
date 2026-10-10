import { apiRequest } from './api';

export function listarFormulariosRespondidos(token) {
  return apiRequest('/api/formularios-respondidos', { token });
}

export function buscarFormularioRespondido(id, token) {
  return apiRequest(`/api/formularios-respondidos/${id}`, { token });
}

export function criarFormularioRespondido(dados, token) {
  return apiRequest('/api/formularios-respondidos', {
    method: 'POST',
    body: dados,
    token
  });
}

export function listarRespostas(token) {
  return apiRequest('/api/respostas', { token });
}

export function buscarResposta(id, token) {
  return apiRequest(`/api/respostas/${id}`, { token });
}

export function criarResposta(dados, token) {
  return apiRequest('/api/respostas', {
    method: 'POST',
    body: dados,
    token
  });
}
