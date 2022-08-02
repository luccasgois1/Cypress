/// <reference types="cypress" />

describe('Work with basic elements - Text', () => {
    it('Text - Busca abrangente', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.get('body').should('contain', 'Cuidado') // Busca abrangente
    })

    it('Text - Busca mais especifica', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.get('span').should('contain', 'Cuidado') // Busca mais especifica
    })

    it('Text - Busca detalhada e exata', () => {
        // have.text deve ter o nome exato
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })
})