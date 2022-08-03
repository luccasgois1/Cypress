/// <reference types="cypress" />

describe("Cypress basics", () => {
    it("Should visit a page and assert the title", () => {
        
        // Remova o comentario abaixo se quiser debugar o teste
        // cy.pause() // Usado para debugar o teste
        
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.title()
            .should('equal', "Campo de Treinamento")
            .and('contain', ' de ')

        cy.title().then(title => {
            console.log(title)
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