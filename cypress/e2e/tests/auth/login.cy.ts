describe('User Login page', () => {
  beforeEach(() => {
    cy.intercept("/api/budgets", { body: { budgets: [] }}).as("budgets")
    cy.intercept("/api/transactions**", { body: { transactions: [] }}).as("transactions")
  })

  it("should redirect unauthenticated user to login page", function () {
    cy.visit("http://localhost:3001/budgets");
    cy.location("pathname").should("equal", "/login");
    cy.get('h1').should('contain', 'Login');
  });

  it('should login successfully', () => {
    cy.visit('http://localhost:3001/login')

    cy.intercept('POST','/api/users/login', {
      statusCode: 200,
      fixture: 'user.json',
    }).as("login");

    cy.get('input[name="email"]').type('sample@test.com')
    cy.get('input[name="password"]').type('21345678')

    cy.get('button[type="submit"]').click()
    cy.wait("@login");

    cy.location("pathname").should("equal", "/budgets");

    cy.getCookie("co-budget.token").should("exist");
  })

  it('should display login errors', () => {
    cy.intercept('POST','/api/users/login', {
      statusCode: 422,
      body: {
        errors: ["Email ou Senha invalidos!"]
      },
    }).as("login");

    cy.visit('http://localhost:3001/login')

    cy.get('input[name="email"]').type('inexistent@test.com')
    cy.get('input[name="password"]').type('21345678')

    cy.get('button[type="submit"]').click()
    cy.wait("@login");

    cy.get('li').should('contain', 'Email ou Senha invalidos!');

    cy.get('button[type="submit"]').should('not.be.disabled')
  })

  describe('when user is logged in', () => {
    it('redirects to the home page', () => {
      cy.mockLogin();
      cy.visit('http://localhost:3001/login')

      cy.location("pathname").should("equal", "/");
    })
  })
})
