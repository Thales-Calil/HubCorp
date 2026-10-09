import { ApiError, apiRequest } from './api';

export class AuthError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
}

export async function login({ email, senha }) {
  try {
    const data = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: { email, senha }
    });

    if (!data?.token || !data?.usuario) {
      throw new AuthError('UNEXPECTED_ERROR');
    }

    return data;
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }

    if (error instanceof ApiError && error.status === 401) {
      throw new AuthError('INVALID_CREDENTIALS');
    }

    if (error instanceof ApiError && error.status === 403) {
      throw new AuthError('INACTIVE_USER');
    }

    if (error instanceof ApiError && error.status === 0) {
      throw new AuthError('API_UNAVAILABLE');
    }

    throw new AuthError('UNEXPECTED_ERROR');
  }
}
