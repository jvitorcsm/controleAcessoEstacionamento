// Login

// Deve exibir erros se campos estiverem vazios
// Deve logar com credenciais válidas
// Deve rejeitar login inválido

describe('Login', () => {
  it('Deve exibir erro se os campos estiverem vazios', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('button[type=submit]').click();
    cy.contains('E-mail é obrigatório').should('exist');
    cy.contains('Senha é obrigatória').should('exist');
  });

  it('Deve realizar login com credenciais válidas', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[name=email]').type('joao@senai.com');
    cy.get('input[name=senha]').type('123456');
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/dashboard');
  });
});
    