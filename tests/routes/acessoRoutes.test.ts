// Rotas

// POST /entrada: deve criar entrada válida
// POST /saida: deve registrar saída e calcular permanência
// GET /historico: deve listar acessos
// GET /veiculo/:placa: deve retornar dados do veículo

import request from 'supertest';
import app from '../../server';
import { describe, it, expect, vi } from 'vitest';

describe('Rotas de Acesso', () => {
  it('GET /historico deve retornar histórico', async () => {
    const response = await request(app).get('/historico');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /saida deve registrar saída do veículo', async () => {
    const entrada = await request(app).post('/entrada').send({
      placa: 'TEST123',
      proprietario: 'Fulano de Tal'
    });

    const response = await request(app).post('/saida').send({
      placa: 'TEST123'
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('saida');
  });
});
