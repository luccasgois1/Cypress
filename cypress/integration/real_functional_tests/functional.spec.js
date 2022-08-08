/// <reference types="cypress" />

import locators from "../../support/locators"
import '../../support/commandsContas'

describe('Real Functional Tests', () => {
    
    const user_credentials = {
        name:'uchiha',
        email:'uchiha@email.com',
        password:'uchiha'
    }

    before(() => {
        cy.login(user_credentials.email, user_credentials.password)
        cy.resetApp()
    })

    it('Login', () => {
        cy.get(locators.MESSAGE).should('contain', `Bem vindo, ${user_credentials.name}!`)
    });

    it('Criar conta', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta teste')
        cy.get(locators.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    });

    it('Atualizar uma conta', () => {
        cy.acessarMenuConta()
         cy.xpath(locators.CONTAS.XP_BTN_ALTERAR ).click()
        cy.get(locators.CONTAS.NOME)
            .clear()
            .type('Conta teste atualizada')
        cy.get(locators.CONTAS.BTN_SALVAR ).click()
        cy.get(locators.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    });

    it('Nao deve criar conta com nome ja existente', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta teste atualizada')
        cy.get(locators.MESSAGE).should('contain', 'code 400')
    });

    it('Deve fazer uma movimentacao financeira', () => {
        cy.get(locators.MENU.MOVIMENTACAO).click()
        cy.get(locators.MOVIMENTACAO.DESCRICAO).type('Teste')
        cy.get(locators.MOVIMENTACAO.VALOR).type('123')
        cy.get(locators.MOVIMENTACAO.INTERESSADO).type('TesteMan')
        cy.get(locators.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(locators.MESSAGE).should('contain', 'Movimentação inserida com sucesso')

        cy.get(locators.EXTRATO.TRANSACOES).should('have.length', 7)
        cy.get(locators.EXTRATO.TRANSACOES)
            .should('contain', 'Teste')
            .and('contain','123,00')
    });
})