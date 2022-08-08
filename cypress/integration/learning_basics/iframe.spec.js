/// <reference types="cypress" />

describe('Iframes', () => {
    
    it('Manipulando iframes' ,() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body)
                .find('#tfield')
                .type('funciona ?')
                .should('have.value', 'funciona ?')
        })
    })
    
    it('Manipulando iframes diretamente' ,() => {
        const stub = cy.stub().as('alert')
        cy.visit('https://www.wcaquino.me/cypress/frame.html')
        cy.get('#tfield').type('funciona ?')
        cy.on('window:alert',stub)
        cy.get('#otherButton')
            .click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Click OK!')
            })
        })
    })
