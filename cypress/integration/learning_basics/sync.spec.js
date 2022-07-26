/// <reference types="cypress" />
describe('Esperas...', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })
    
    it('Deve aguardar o elemento ficar disponivel', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo')
            .type('Funciona')
            .should('have.value', 'Funciona')

    });

    it('Uso do find', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        // Nao utilizar o find quando o elemento demora para aparecer
        cy.get('#lista li span')
            .should('contain', 'Item 2')
    });
    
    it('Uso do timeout', () => {
        // Nao utilizar o wait ou mudar as configuracoes do projeto, exceto se extremamente necessario
        cy.get('#buttonList').click()
        cy.get('#lista li', {timeout:30000})
            .should('contain', 'Item 2')
    });

    it.skip('Uso do retry no Click', () => {
        // O retry no caso do click nao funciona 
        // pois o click altera o codigo html e 
        // por seguranca o cypress nao continua
        // ESSE TESTE DEVE FALHAR PARA MOSTRAR A FALHA DO RETRY COM CLICK
        cy.get('#buttonCount')
            .click()
            .should('have.value', '111')
    });

    it('Should x Then', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li span', {timeout:30000})
            .should(lista_itens => {
            // .then(lista_itens => {
                expect(lista_itens).contain('Item 2')
            })
        // O Then espera ate ter uma resposta do sistema e enfim ele se executa uma vez
        // O Should fica tentando acertar a execucao ate atingir o timeout
        // Casos que precisem de retrys(Should) Casos que precisam apenas de espera de resposta(Then)
    });
});