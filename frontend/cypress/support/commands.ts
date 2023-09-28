/// <reference types="cypress" />

Cypress.Commands.add("getByLabel", (selector) => {
    return cy.get(`[aria-label=${selector}]`);
});
