/// <reference types="cypress" />

describe('Dinamic Test', () => {
        
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    function selecFoodByLabel(labelName) {
        cy.contains('label', labelName)
            .invoke('attr', 'for')
            .then((id) =>{
                cy.get('#' + id).click()
            })
    }

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
    foods.forEach(food => {
        it(`Cadastro com comida variada - ${food}`, () => {
            cy.fixture('userData').as('usuario').then(function () {
                cy.get('#formNome').type(this.usuario.nome)  
                cy.get('[data-cy=dataSobrenome]').type(this.usuario.sobrenome)
                cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()
                selecFoodByLabel(food)
                cy.get('[data-test=dataEscolaridade]').select(this.usuario.escolaridade)
                cy.get('[data-testid=dataEsportes]').select(this.usuario.esportes)
                cy.get('#formCadastrar').click()
                cy.get('#resultado').should('contain','Cadastrado!')
            })
            
    })
    });

    it('Seleciona todas as comidas usando each', () => {
        cy.fixture('userData').as('usuario').then(function () {
            cy.get('#formNome').type(this.usuario.nome)  
            cy.get('[data-cy=dataSobrenome]').type(this.usuario.sobrenome)
            cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()
            cy.get('[name=formComidaFavorita]').each(element => {
                cy.wrap(element.click())
            })
            cy.get('[data-test=dataEscolaridade]').select(this.usuario.escolaridade)
            cy.get('[data-testid=dataEsportes]').select(this.usuario.esportes)
            cy.get('#formCadastrar').click()
            // Nao da para selecionar todas as opcoes pq uma pessoa nao pode comer carne e ser vegetariano ao mesmo tempo
            cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
        })
    });

    it.only('Deve selecionar todas as comidas exceto Vegetariano usando each', () => {
        cy.fixture('userData').as('usuario').then(function () {
            cy.get('#formNome').type(this.usuario.nome)  
            cy.get('[data-cy=dataSobrenome]').type(this.usuario.sobrenome)
            cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()
            cy.get('[name=formComidaFavorita]').each(element => {
                if (element.val() != 'vegetariano')
                    cy.wrap(element.click())
            })
            cy.get('[data-test=dataEscolaridade]').select(this.usuario.escolaridade)
            cy.get('[data-testid=dataEsportes]').select(this.usuario.esportes)
            cy.get('#formCadastrar').click()
            cy.get('#resultado').should('contain','Cadastrado!')
        })
    });

});