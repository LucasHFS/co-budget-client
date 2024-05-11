describe('User Register page', () => {
  beforeEach(() => {
    cy.intercept("/api/budgets", { body: { budgets: [] }}).as("budgets")
    cy.intercept("/api/transactions**", { body: { transactions: [] }}).as("transactions")
  })

  it('should register successfully', () => {
    cy.visit('http://localhost:3001/register')

    cy.intercept('POST','/api/users', {
      statusCode: 200,
      fixture: 'user.json',
    }).as("register");

    cy.get('input[name="username"]').type('testUser')
    cy.get('input[name="email"]').type('inexistent@test.com')
    cy.get('input[name="password"]').type('21345678')

    cy.get('button[type="submit"]').click()
    cy.wait("@register");

    cy.location("pathname").should("equal", "/budgets");

    cy.getCookie("co-budget.token").should("exist");
  })

  it('should display register errors', () => {
    cy.intercept('POST','/api/users', {
      statusCode: 422,
      body: {
        errors: ["email já está em uso"]
      },
    }).as("register");

    cy.visit('http://localhost:3001/register')

    cy.get('input[name="email"]').type('inexistent@test.com')
    cy.get('input[name="username"]').type('testUser')
    cy.get('input[name="password"]').type('21345678')

    cy.get('button[type="submit"]').click()
    cy.wait("@register");

    cy.get('li').should('contain', 'email já está em uso');

    cy.get('button[type="submit"]').should('not.be.disabled')
  })

  describe('when user is signed in', () => {
    it('redirects to the home page', () => {
      cy.mockLogin();

      cy.visit('http://localhost:3001/register')

      cy.location("pathname").should("equal", "/");
    })
  })
})
