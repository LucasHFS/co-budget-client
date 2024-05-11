/// <reference types="cypress" />
// ***********************************************

Cypress.Commands.add("mockLogin", () => {
  cy.setCookie('co-budget.token', 'adfadsfa2asdfadslfj.1234123adfadsf.adsfa232')

  cy.intercept('GET','/api/user', {
    statusCode: 200,
    fixture: 'user.json',
  }).as("user");
})
