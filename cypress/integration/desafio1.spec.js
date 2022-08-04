/// <reference types="cypress" />
describe('Desafio 1', () => {
    
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Teste - Desafio 1', () => {
        const expected_message_name = 'Nome eh obrigatorio'
        const expected_message_lastname = 'Sobrenome eh obrigatorio'
        const expected_message_gender = 'Sexo eh obrigatorio'
        const expected_message__succesful_registry = 'Cadastrado!'
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#formCadastrar')
            .click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith(expected_message_name)
            })
        cy.get('#formNome').type('Lucao')
        cy.get('#formCadastrar')
            .click()
            .then(() => {
                expect(stub.getCall(1)).to.be.calledWith(expected_message_lastname)
            })
        cy.get('[data-cy=dataSobrenome]').type('dos Raios')    
        cy.get('#formCadastrar')
            .click()
            .then(() => {
                expect(stub.getCall(2)).to.be.calledWith(expected_message_gender)
            })

        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()
        cy.get('#resultado').should('contain','Cadastrado!')        

    });
});