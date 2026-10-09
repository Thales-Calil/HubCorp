import { apiRequest } from './api';

function removerSenha(usuario) {
  const usuarioSeguro = { ...usuario };
  delete usuarioSeguro.senha;
  return usuarioSeguro;
}

export async function listarUsuarios(token) {
  const usuarios = await apiRequest('/api/usuarios', { token });
  return Array.isArray(usuarios) ? usuarios.map(removerSenha) : [];
}

export async function buscarUsuario(id, token) {
  const usuario = await apiRequest(`/api/usuarios/${id}`, { token });
  return removerSenha(usuario);
}

export async function criarUsuario(dados, token) {
  const usuario = await apiRequest('/api/usuarios', {
    method: 'POST',
    body: dados,
    token
  });

  return removerSenha(usuario);
}

export async function atualizarUsuario(id, dados, token) {
  const usuario = await apiRequest(`/api/usuarios/${id}`, {
    method: 'PUT',
    body: dados,
    token
  });

  return removerSenha(usuario);
}

export function excluirUsuario(id, token) {
  return apiRequest(`/api/usuarios/${id}`, {
    method: 'DELETE',
    token
  });
}
