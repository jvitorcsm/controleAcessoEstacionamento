// Histórico

// Deve listar acessos realizados
// Deve filtrar por placa/data
// Deve manter responsividade nos principais tamanhos de tela

describe('Histórico de Acesso', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/historico');
  });

  it('Deve listar os acessos', () => {
    cy.get('table').should('exist');
    cy.contains('MHA7768').should('exist');
  });

  it('Deve permitir busca por placa', () => {
    cy.get('input[placeholder="Buscar por placa"]').type('MHA7768');
    cy.contains('MHA7768').should('exist');
  });
});
