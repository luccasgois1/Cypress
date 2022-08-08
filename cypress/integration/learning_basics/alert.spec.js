/// <reference types="cypress" />

describe('Alerts...', () => {
    
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })
    
    it('Alert message', () => {
        // Substituido por funcao clickAlert em support/commands.js
        // cy.get('#alert').click()
        // cy.on('window:alert', msg => {
        //     expect(msg).to.be.equal('Alert Simples')
        // })
        cy.clickAlert('#alert', 'Alert Simples')
    });
    it('Alert message with Mock', () => {
        const expected_alert_message = 'Alert Simples'
        const stub = cy.stub().as('alert')
        cy.on('window:alert', stub)
        cy.get('#alert').click()
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith(expected_alert_message)
        })

    });

    it('Confirm message', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Confirmado')
        })
        cy.get('#confirm').click()
    });

    it('Deny message', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
            return false
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado')
        })
        cy.get('#confirm').click()
    });

    it('Prompt', () => {
        const expected_typed_value = '42'
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns(expected_typed_value)
        })
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal(`Era ${expected_typed_value}?`)
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal(':D')
        })
        cy.get('#prompt').click()
    });

});