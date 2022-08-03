/// <reference types="cypress" />

describe('Esperas...', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })
    
    it('Deve aguardar o elemento ficar disponivel', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
            .should('exist')
            .type('Funciona')
            .should('have.value', 'Funciona')

    });
});