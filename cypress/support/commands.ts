/// <reference types="cypress" />
// ***********************************************

Cypress.Commands.add("mockLogin", () => {
  cy.setCookie('co-budget.token', 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzZWU1YjdhYS04MjE1LTQ1YzUtOTYzOC02ZWU0MGNmYTFkODUiLCJzdWIiOiIxIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNzE0NTg2MTEzLCJleHAiOjE3MTU4ODIxMTN9.KMO_jmvFVVT2k8qp87Zke_Jx9zNe3fBRLruXgMGQB68')

  cy.intercept('GET','/api/user', {
    statusCode: 200,
    fixture: 'user.json',
  }).as("user");
})
