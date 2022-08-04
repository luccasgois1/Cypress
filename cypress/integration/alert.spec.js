/// <reference types="cypress" />

describe('Alerts...', () => {
    
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })
    
    it('Alert message', () => {
        cy.get('#alert').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Alert Simples')
        })
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
});