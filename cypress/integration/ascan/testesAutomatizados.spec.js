/// <reference types="cypress" />

describe('Test Plan XYZ Bank', () => {
    before(() => {
        cy.visit('http://www.way2automation.com/angularjs-protractor/banking/#/login')
    })
    beforeEach(() => {
        cy.get('.home').click()
    });

    it('When the bank maneger creates a new user the registred data should apper in customers', () => {
        cy.get(':nth-child(3) > .btn').click()
        cy.get('[ng-class="btnClass1"]').click()
        cy.get(':nth-child(1) > .form-control').type('Severo')
        cy.get(':nth-child(2) > .form-control').type('Snape')
        cy.get(':nth-child(3) > .form-control').type('E71995')
        cy.get('form.ng-dirty > .btn').click()
        cy.get('[ng-class="btnClass3"]').click()
        cy.get('tbody')
            .should('contain', 'Severo')
            .and('contain', 'Snape')
            .and('contain', 'E71995')
    });

    it('When a created customer tries to login it should be redirected to the user page and recive a Welcome message', () => {
        cy.get('.borderM > :nth-child(1) > .btn').click()
        cy.get('#userSelect').select('Severo Snape')
        cy.get('form.ng-valid > .btn').click()
        cy.get('.borderM').should('contain', 'Welcome Severo Snape')
    });

    it('When a customer tries to open an account the bank manager should be able to do it', () => {
        cy.get(':nth-child(3) > .btn').click()
        cy.get('[ng-class="btnClass2"]').click()
        cy.get('#userSelect').select('Severo Snape')
        cy.get('#currency').select('Dollar')
        cy.get('form.ng-dirty > button').click()
        cy.get('[ng-class="btnClass3"]').click()
        cy.xpath("//td[contains(.,'Severo')]/../td[4]")
            .should('not.be.empty')
    });

    it('When the customer tries to Withdrawl more money that is in the account the operation should be blocked', () => {
        cy.get('.borderM > :nth-child(1) > .btn').click()
        cy.get('#userSelect').select('Harry Potter')
        cy.get('form.ng-valid > .btn').click()
        cy.get('.borderM').should('contain','Welcome Harry Potter')
        cy.get('[ng-class="btnClass3"]').click()
        cy.get('.form-control').type('123')
        cy.get('form.ng-dirty > .btn').click()
        cy.get('.error').should('contain', 'Transaction Failed. You can not withdraw amount more than the balance.')
    });

    it('When the customer tries to Deposit money in the accould the balance should increase and a message "Deposit Sucessful" should appear', () => {
        cy.get('.borderM > :nth-child(1) > .btn').click()
        cy.get('#userSelect').select('Harry Potter')
        cy.get('form.ng-valid > .btn').click()
        cy.get('.borderM').should('contain','Welcome Harry Potter')
        cy.get('[ng-class="btnClass2"]').click()
        cy.get('.form-control').type('123')
        cy.get('form.ng-dirty > .btn').click()
        cy.get('.error').should('contain', 'Deposit Successful')
        cy.xpath("//div[@class='center'][contains(.,'Balance')]/strong[2]")
            .should('contain', '123')
    });

    it('When the customer tries to Withdrawl money equal than the balance of the account a message "Transaction successful" should appear', () => {
        cy.get('.borderM > :nth-child(1) > .btn').click()
        cy.get('#userSelect').select('Harry Potter')
        cy.get('form.ng-valid > .btn').click()
        cy.get('.borderM').should('contain','Welcome Harry Potter')
        cy.get('[ng-class="btnClass3"]').click()
        cy.get('.form-control').type('123')
        cy.get('form.ng-dirty > .btn').click()
        cy.get('.error').should('contain', 'Transaction successful')
        cy.xpath("//div[@class='center'][contains(.,'Balance')]/strong[2]")
            .should('contain', '0')
    });

});