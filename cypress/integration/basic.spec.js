/// <reference types="cypress" />

describe("Cypress basics", () => {
    it("Should visit a page and assert the title", () => {
        
        // Remova o comentario abaixo se quiser debugar o teste
        // cy.pause() // Usado para debugar o teste
        
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.title()
            .should('equal', "Campo de Treinamento")
            .and('contain', ' de ')

        let syncTitle // Define a variavel que ira guardar o valor do title
        cy.title().then(title => {
            console.log(title)
            cy.get('#formNome').type(title)
            syncTitle = title // Salva o nome do titulo em um avariavel
        })
        cy.get('[data-cy=dataSobrenome]').then(formNome => {
            cy.wrap(formNome).type(syncTitle)
        })
    })

    it("Should find and interact with 'Clique Me!' button", () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.get('#buttonSimple')
            .should('have.value', "Clique Me!")
            .click()
            .should('have.value', "Obrigado!")
    })

})