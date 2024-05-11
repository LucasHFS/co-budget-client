describe('Budgets page', () => {
  beforeEach(() => {
    cy.mockLogin();
    cy.intercept("/api/transactions**", { body: { transactions: [] }}).as("transactions")

    cy.visit('http://localhost:3001/budgets')
  })

  it('should create budgets', () => {
    cy.intercept({ url: '/api/budgets', times: 1 }, { body: { budgets: [] }}).as("emptyBudgets");
    cy.get('h2').should('contain', 'Você ainda não possui nenhum orçamento');

    cy.intercept('POST', '/api/budgets', {
      statusCode: 200,
      fixture: 'budget.json',
    }).as("createBudget");

    cy.wait('@emptyBudgets');
    cy.intercept('GET', '/api/budgets', { body: { budgets: [{ id: 3, name: 'Test Budget' }] }}).as("newBudget");

    cy.get('#add').click();
    cy.get('input[name="name"]').type('Test Budget');
    cy.get('button[type="submit"]').click();

    cy.wait('@createBudget');

    cy.wait('@newBudget');

    cy.get('h2').should('contain', 'Selecione o Orçamento');
    cy.get('[data-testid="budgetBox"]').should('have.length', 1);
    cy.get('[data-testid="budgetTitle"]').should('contain', 'Test Budget');
  });

  it('should edit a budget', () => {
    cy.intercept({ method: 'GET', url: '/api/budgets', times: 1 }, { body: { budgets: [{ id: 3, name: 'Test Budget' }] }}).as("budgets");

    cy.intercept('PUT', '/api/budgets/*', {
      statusCode: 200,
      fixture: 'budget.json',
    }).as("createBudget");

    cy.wait('@budgets');

    cy.intercept('GET', '/api/budgets', { body: { budgets: [{ id: 3, name: 'Edited Budget' }] }} ).as("editedBudget");

    cy.get('[data-testid="editBudgetBtn"]').first().click();

    cy.get('input[name="name"]').clear().type('Edited Budget');

    cy.get('button[type="submit"]').click();

    cy.wait('@editedBudget');

    cy.get('[data-testid="budgetTitle"]').should('contain', 'Edited Budget');
  })

  it('should delete a budget', () => {
    cy.intercept({ method: 'GET', url: '/api/budgets', times: 1 }, { body: { budgets: [{ id: 3, name: 'Test Budget' }] }}).as("budgets");

    cy.intercept('DELETE', '/api/budgets/*', {
      statusCode: 200,
      body: {},
    }).as("deleteBudget");

    cy.wait('@budgets');

    cy.intercept('GET', '/api/budgets', { body: { budgets: [] }} ).as("emptyBudgets");

    cy.get('[data-testid="editBudgetBtn"]').first().click();
    cy.get('button').contains('Excluir').click();

    cy.get('button').last().click();

    cy.wait('@deleteBudget');

    cy.wait('@emptyBudgets');

    cy.get('h2').should('contain', 'Você ainda não possui nenhum orçamento');
  })


  it('should select a budget', () => {
    cy.intercept('GET','/api/budgets', { fixture: 'budgets.json' }).as("budgets");

    cy.wait('@budgets');

    cy.get('[data-testid="budgetBox"]').first().click();

    cy.location("pathname").should("equal", "/");
  })
})
