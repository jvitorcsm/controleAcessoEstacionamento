import { describe, it, expect, vi } from 'vitest';
import { authMiddleware } from '../../src/middlewares/authMiddleware';
import { Request, Response } from 'express';

describe('Middleware de Autenticação', () => {
  it('deve bloquear requisição sem token', () => {
    const req = { headers: {} } as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as unknown as Response;
    const next = vi.fn();

    authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ mensagem: 'Token não fornecido' });
  });
});