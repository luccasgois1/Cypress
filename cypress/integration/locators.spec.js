/// <reference types="cypress" />

describe('Locators ...', () => {

    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('JQuery', () => {
        cy.get(':nth-child(1) > :nth-child(3) > [type=\'button\']')
        cy.get("[onclick*='Francisco']")
    });

    it('XPath', () => {
        cy.xpath("//input[contains(@onclick, 'Francisco')]")
    });
});