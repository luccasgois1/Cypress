/// <reference types="cypress" />

describe('Time ...', () => {
    
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })    

    it('Usando clock para escolher o tempo do teste', () => {
        const dt = new Date(2012, 3, 10, 15, 23, 50)
        const dateFormat = {year:'numeric', month:'2-digit', day:'2-digit'}
        const formatedDt = Intl.DateTimeFormat('pt', dateFormat).format(dt)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', formatedDt)
    });

    it.only('Usando tick para mockar o tempo de um teste que o clock esta parado', () => {
        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span')
            .invoke('text')
            .should('lte', 0)
        cy.tick(10000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span')
            .invoke('text')
            .should('gte', 10000)
        cy.tick(5000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span')
            .invoke('text')
            .should('gte', 15000)
    
    });
});