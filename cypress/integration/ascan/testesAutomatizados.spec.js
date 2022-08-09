/// <reference types="cypress" />

import locators from "../../support/locatorsBankXYZ"

describe('Test Plan XYZ Bank', () => {
    before(() => {
        cy.visit('http://www.way2automation.com/angularjs-protractor/banking/#/login')
    })
    beforeEach(() => {
        cy.get(locators.MENU.BTN_HOME).click()
    });

    describe('Testcases New User', () => {
        const customer = {
            first_name:'Severo',
            last_name:'Snape',
            post_code:'E71995'
        }
        const customerName = `${customer.first_name} ${customer.last_name}`
        it('When the bank maneger creates a new user the registred data should apper in customers', () => {
            cy.get(locators.HOME.BTN_BANK_MANAGER_LOGIN).click()
            cy.get(locators.BANK_MANAGER.MENU_ADD_CUSTOMER).click()
            cy.get(locators.ADD_CUSTOMER.FIRST_NAME_INPUT).type(customer.first_name)
            cy.get(locators.ADD_CUSTOMER.LAST_NAME_INPUT).type(customer.last_name)
            cy.get(locators.ADD_CUSTOMER.POST_CODE_INPUT).type(customer.post_code)
            cy.get(locators.ADD_CUSTOMER.BTN_ADD_CUSTOMER).click()
            cy.get(locators.BANK_MANAGER.MENU_CUSTOMERS).click()
            cy.get('tbody')
                .should('contain', customer.first_name)
                .and('contain', customer.last_name)
                .and('contain', customer.post_code)
        });
    
        it('When a created customer tries to login it should be redirected to the user page and recive a Welcome message', () => {
            cy.get(locators.HOME.BTN_CUSTOMER_LOGIN).click()
            cy.get(locators.CUSTOMER_LOGIN.USER).select(customerName)
            cy.get(locators.CUSTOMER_LOGIN.BTN_LOGIN).click()
            cy.get(locators.CUSTOMERS.PAGE_CONTENT).should('contain', `Welcome ${customerName}`)
        });
    
        it('When a customer tries to open an account the bank manager should be able to do it', () => {
            cy.get(locators.HOME.BTN_BANK_MANAGER_LOGIN).click()
            cy.get(locators.BANK_MANAGER.MENU_OPEN_ACCOUNT).click()
            cy.get(locators.OPEN_ACCOUNT.USER).select(customerName)
            cy.get(locators.OPEN_ACCOUNT.CURRENCY).select('Dollar')
            cy.get(locators.OPEN_ACCOUNT.BTN_PROCESS).click()
            cy.get(locators.BANK_MANAGER.MENU_CUSTOMERS).click()
            cy.xpath(locators.CUSTOMERS.FN_XPATH_CUSTOMER_ACCOUNT_NUMBER(customer.first_name))
                .should('not.be.empty')
        });        
    });

    describe('Testcases Account Transactions', () => {
        beforeEach(() => {
            const customerName = 'Harry Potter'
            cy.get(locators.HOME.BTN_CUSTOMER_LOGIN).click()
            cy.get(locators.CUSTOMER_LOGIN.USER).select(customerName)
            cy.get(locators.CUSTOMER_LOGIN.BTN_LOGIN).click()
            cy.get(locators.CUSTOMER_ACCOUNT.PAGE_CONTENT).should('contain',`Welcome ${customerName}`)
        });
        it('When the customer tries to Withdrawl more money that is in the account the operation should be blocked', () => {
            cy.get(locators.CUSTOMER_ACCOUNT.MENU_WITHDRAWL).click()
            cy.get(locators.CUSTOMER_ACCOUNT.VALUE_INPUT).type('123')
            cy.get(locators.CUSTOMER_ACCOUNT.BTN_TRANSACTION).click()
            cy.get(locators.CUSTOMER_ACCOUNT.TRANSACTION_STATUS_MESSAGE).should('contain', 'Transaction Failed. You can not withdraw amount more than the balance.')
        });
    
        it('When the customer tries to Deposit money in the accould the balance should increase and a message "Deposit Sucessful" should appear', () => {
            cy.get(locators.CUSTOMER_ACCOUNT.MENU_DEPOSIT).click()
            cy.get(locators.CUSTOMER_ACCOUNT.VALUE_INPUT).type('123')
            cy.get(locators.CUSTOMER_ACCOUNT.BTN_TRANSACTION).click()
            cy.get(locators.CUSTOMER_ACCOUNT.TRANSACTION_STATUS_MESSAGE).should('contain', 'Deposit Successful')
            cy.xpath(locators.CUSTOMER_ACCOUNT.XPATH_BALANCE_VALUE)
                .should('contain', '123')
        });
    
        it('When the customer tries to Withdrawl money equal than the balance of the account a message "Transaction successful" should appear', () => {
            cy.get(locators.CUSTOMER_ACCOUNT.MENU_WITHDRAWL).click()
            cy.get(locators.CUSTOMER_ACCOUNT.VALUE_INPUT).type('123')
            cy.get(locators.CUSTOMER_ACCOUNT.BTN_TRANSACTION).click()
            cy.get(locators.CUSTOMER_ACCOUNT.TRANSACTION_STATUS_MESSAGE).should('contain', 'Transaction successful')
            cy.xpath(locators.CUSTOMER_ACCOUNT.XPATH_BALANCE_VALUE)
                .should('contain', '0')
        });
    
    });

});