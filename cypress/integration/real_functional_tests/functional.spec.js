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

    beforeEach(() => {
        cy.get(locators.MENU.HOME).click()
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
         cy.xpath(locators.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar') ).click()
        cy.get(locators.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(locators.CONTAS.BTN_SALVAR ).click()
        cy.get(locators.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    });

    it('Nao deve criar conta com nome ja existente', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta mesmo nome')
        cy.get(locators.MESSAGE).should('contain', 'code 400')
    });

    it('Deve fazer uma movimentacao financeira', () => {
        cy.get(locators.MENU.MOVIMENTACAO).click()
        cy.get(locators.MOVIMENTACAO.DESCRICAO).type('Teste')
        cy.get(locators.MOVIMENTACAO.VALOR).type('123')
        cy.get(locators.MOVIMENTACAO.INTERESSADO).type('TesteMan')
        cy.get(locators.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get(locators.MOVIMENTACAO.STATUS).click()
        cy.get(locators.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(locators.MESSAGE).should('contain', 'Movimentação inserida com sucesso')

        cy.get(locators.EXTRATO.TRANSACOES).should('have.length', 7)
        cy.get(locators.EXTRATO.TRANSACOES)
            .should('contain', 'Teste')
            .and('contain','123,00')
    });

    it('Deve ver o saldo', () => {
        cy.get(locators.MENU.HOME).click()
        cy.xpath(locators.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain','534,00')
    });

    it('Deve remover uma transacao', () => {
        cy.get(locators.MENU.EXTRATO).click()
        cy.xpath(locators.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(locators.MESSAGE).should('contain', 'Movimentação removida com sucesso')
    });
    
})