// Registro de acesso

// Deve registrar novo veículo com dados válidos
// Deve exibir erro se algum campo estiver faltando
// Deve impedir duplicação do mesmo veículo

// Saída de veículo

// Deve registrar a saída corretamente
// Deve calcular o tempo de permanência
// Deve exibir o veículo como "Saiu" no histórico

describe('Registro de Acesso', () => {
  beforeEach(() => {
    cy.login(); // Comando customizado de login, crie no support/commands.ts
  });

  it('Deve registrar um novo veículo', () => {
    cy.visit('/acesso');
    cy.get('input[name=placa]').type('MHA7768');
    cy.get('input[name=proprietario]').type('João da Silva');
    cy.get('button[type=submit]').click();
    cy.contains('Veículo registrado com sucesso').should('exist');
  });
});
