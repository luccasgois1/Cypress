/// <reference types="cypress" />

describe("Cypress basics", () => {
    it("Should visit a page and assert the title", () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.title()
            .should('equal', "Campo de Treinamento")
            .and('contain', ' de ')
    })
})