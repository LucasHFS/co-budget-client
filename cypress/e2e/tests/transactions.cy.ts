describe('Transactions page', () => {
  beforeEach(() => {
    cy.mockLogin();
    cy.intercept("/api/budgets**", { fixture: 'budgets.json'}).as("budgets")

    cy.visit('http://localhost:3001')
  })

  it.only('should create a transaction', () => {
    cy.intercept({ url: '/api/transactions*', times: 2 }, { body: { transactions: [] }}).as("emptyTransactions");

    cy.intercept('POST', '/api/transactions', {
      statusCode: 201,
      fixture: 'transaction.json',
    }).as("createTransaction");

    cy.wait('@emptyTransactions');
    cy.intercept('GET', '/api/transactions*', { body: { transactions: [ {
      id: 2,
      name: "Test Transaction",
      price: 17.5,
      kind: "fixed",
      status: "criado",
      dueAt: "2024-05-01",
      budgetId: 1,
      transactionType: "expense"
    } ]} }).as("newTransaction");

    cy.get('#budget').click()
    cy.get('li').contains('Budget 1').click()
    cy.get('#add').click();
    cy.get('input[name="name"]').type('Test Transaction');
    cy.get('input[name="price"]').type('17.5');
    cy.get('#dueDate').type('10/05/2024');
    cy.get('button[type="submit"]').click();

    cy.wait('@createTransaction');

    cy.wait('@newTransaction');

    cy.get('[data-testid="transactionBox"]').should('have.length', 1);
    cy.get('[data-testid="transactionTitle"]').should('contain', 'Test Transaction');
  });
})
