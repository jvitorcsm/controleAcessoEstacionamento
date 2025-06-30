// Controller

// Deve retornar 201 ao registrar entrada
// Deve retornar erro 400 se dados estiverem faltando
// Deve retornar 200 ao registrar saída

import request from 'supertest';
import app from '../../server';
import { describe, it, expect, vi } from 'vitest';

describe('Acesso Controller', () => {
  it('Deve criar um novo registro de entrada', async () => {
    const response = await request(app).post('/entrada').send({
      placa: 'XYZ9876',
      proprietario: 'Maria Teste'
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve retornar erro ao enviar dados incompletos', async () => {
    const response = await request(app).post('/entrada').send({
      placa: ''
    });

    expect(response.statusCode).toBeGreaterThanOrEqual(400);
  });
});
