import request from 'supertest';
import app from '../../server';// aj
import { describe, it, expect, vi } from 'vitest';


describe('Rotas de Autenticação', () => {
  it('deve realizar login com credenciais válidas', async () => {
    const response = await request(app).post('/auth/login').send({
      email:'joao@senai.com',
      senha: '123456'
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('deve falhar com credenciais inválidas', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'invalido@email.com',
      senha: 'senhaerrada'
    });

    expect(response.status).toBe(401);
  });
});
