/// <reference types="cypress" />

describe('Work with basic elements', () => {    
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })
    
    describe('Text', () => {
        it('Busca abrangente', () => {
            cy.get('body').should('contain', 'Cuidado') // Busca abrangente
        })
    
        it('Busca mais especifica', () => {
            cy.get('span').should('contain', 'Cuidado') // Busca mais especifica
        })
    
        it('Busca detalhada e exata', () => {
            // have.text deve ter o nome exato
            cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
        })
    })
    
    describe ('Links', () => {
        it('Quando clicar no link voltar deve aparecer uma mensagem de confirmação "Voltou!" MODO INDICADO', () => {
            cy.get('[href="#"]').click()
            cy.get('#resultado').should('have.text', 'Voltou!')
        })
    
        it('Apos clicar no link "Voltar" e recarregar a pagina não deve conter a mensagem "Voltou!"', () => {
            cy.get('[href="#"]').click()
            cy.get('#resultado').should('have.text', 'Voltou!')
            cy.reload()
            cy.get('#resultado').should('not.have.text', 'Voltou!')
            cy.contains('Voltar').click()
            cy.get('#resultado').should('have.text', 'Voltou!')
        })
    })
 
})

