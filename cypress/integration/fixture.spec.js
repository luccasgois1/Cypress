/// <reference types="cypress" />

describe('Fixtures ...', () => {
        
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Get data from fixture file', () => {
        cy.fixture('userData').as('usuario').then(function () {
            cy.get('#formNome').type(this.usuario.nome)  
            cy.get('[data-cy=dataSobrenome]').type(this.usuario.sobrenome)
            cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()
            cy.get(`[name=formComidaFavorita][value=${this.usuario.comida}]`).click()
            cy.get('[data-test=dataEscolaridade]').select(this.usuario.escolaridade)
            cy.get('[data-testid=dataEsportes]').select(this.usuario.esportes)
            cy.get('#formCadastrar').click()
            cy.get('#resultado').should('contain','Cadastrado!')
        })
    });
});