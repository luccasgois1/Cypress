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

    describe.only('TextFields', () => {
        it('Campo do nome deve permitir preenchimento', () => {
            cy.get('#formNome')
                .type('Cypress Test')
                .should('have.value', 'Cypress Test')
        })

        it('Campo de sugestões deve permitir preenchimento', () => {
            cy.get('#elementosForm\\:sugestoes')
                .type('Teste de sugetoes')
                .should('have.value', 'Teste de sugetoes')
        })

        it('Campo Input do "Francisco" deve permitir preenchimento', () => {
            cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
                .type('????')
                .should('have.value', '????')
        })

        it('Campo de sobrenome deve permitir preenchimento e deleção de dados', () => {
            cy.get('[data-cy=dataSobrenome]')
                .type('Sobrenome12345{backspace}{backspace}')
                .should('have.value', 'Sobrenome123')
        })

        it('Campo de sugestões deve ser limpo e permitir a selecao de todo conteudo do campo', () => {
            cy.get('#elementosForm\\:sugestoes')
                .clear()
                .type('Erro{selectall}Acerto', {delay:10})
                .should('have.value', 'Acerto')

        })
    })
 
})

