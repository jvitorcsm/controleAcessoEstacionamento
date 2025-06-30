import request from 'supertest';
import app from '../../server';
import { describe, it, expect, vi } from 'vitest';


describe('Rotas de Logs', () => {
  it('deve retornar os logs administrativos', async () => {
    const login = await request(app).post('/auth/login').send({
      email: 'joao@senai.com',
      senha: '123456'
    });

    const res = await request(app)
      .get('/logs')
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
