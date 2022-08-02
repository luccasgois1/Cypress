/// <reference types="cypress" />

describe('Work with basic elements', () => {    
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })
    
    describe('Text', () => {
        it('Busca abrangente', () => {
            cy.get('body').should('contain', 'Cuidado') // Busca abrangente
        })
    
        it('Busca mais especifica', () => {
            cy.get('span').should('contain', 'Cuidado') // Busca mais especifica
        })
    
        it('Busca detalhada e exata', () => {
            // have.text deve ter o nome exato
            cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
        })
    })
    
    describe('Links', () => {
        it('Quando clicar no link voltar deve aparecer uma mensagem de confirmação "Voltou!" MODO INDICADO', () => {
            cy.get('[href="#"]').click()
            cy.get('#resultado').should('have.text', 'Voltou!')
        })
    
        it('Apos clicar no link "Voltar" e recarregar a pagina não deve conter a mensagem "Voltou!"', () => {
            cy.get('[href="#"]').click()
            cy.get('#resultado').should('have.text', 'Voltou!')
            cy.reload()
            cy.get('#resultado').should('not.have.text', 'Voltou!')
            cy.contains('Voltar').click()
            cy.get('#resultado').should('have.text', 'Voltou!')
        })
    })

    describe('TextFields', () => {
        it('Campo do nome deve permitir preenchimento', () => {
            cy.get('#formNome')
                .type('Cypress Test')
                .should('have.value', 'Cypress Test')
        })

        it('Campo de sugestões deve permitir preenchimento', () => {
            cy.get('#elementosForm\\:sugestoes')
                .type('Teste de sugetoes')
                .should('have.value', 'Teste de sugetoes')
        })

        it('Campo Input do "Francisco" deve permitir preenchimento', () => {
            cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
                .type('????')
                .should('have.value', '????')
        })

        it('Campo de sobrenome deve permitir preenchimento e deleção de dados', () => {
            cy.get('[data-cy=dataSobrenome]')
                .type('Sobrenome12345{backspace}{backspace}')
                .should('have.value', 'Sobrenome123')
        })

        it('Campo de sugestões deve ser limpo e permitir a selecao de todo conteudo do campo', () => {
            cy.get('#elementosForm\\:sugestoes')
                .clear()
                .type('Erro{selectall}Acerto', {delay:10})
                .should('have.value', 'Acerto')

        })
    })

    describe('Radio Button', () => {
        it('Ao selecionar uma opcao do campo "Sexo" somente esta opcao deve estar selecionado', () => {
            cy.get('#formSexoFem')
                .click()
                .should('be.checked')
            cy.get('#formSexoMasc')
                .should('not.be.checked')
        })

        it('O campo "Sexo" deve conter apenas duas opcoes', () => {
            cy.get("[name=formSexo]")
                .should('have.length', 2)
        })
    })

    describe('Checkbox', () => {
        it('Ao clicar na opcao "Pizza" no campo "Qual a sua comida favorida?" a opcao devera estar selecionada', () => {
            cy.get('#formComidaPizza')
                .click()
                .should('be.checked')
        })

        it('Ao clicar em todos as opcoes do campo "Qual a sua comida favorita?" todas as opcoes devem estar selecionadas', () => {
            cy.get('[name=formComidaFavorita]')
                .click({multiple:true})
            cy.get('#formComidaCarne')
                .should('be.checked')
            cy.get('#formComidaFrango')
                .should('be.checked')
            cy.get('#formComidaPizza')
                .should('be.checked')
            cy.get('#formComidaVegetariana')
                .should('be.checked')
        })
    })

    describe('Combo', () => {
        it('Ao selecionar a opcao "2o grau completo" o campo "Escolaridade" deve aparecer o nome da opcao selecionada', () => {
            cy.get('[data-test=dataEscolaridade]')
                .select('2o grau completo')
                .should('have.value', '2graucomp')
        })
        it('Ao selecionar a opcao "1o grau completo" o campo "Escolaridade" deve aparecer o nome da opcao selecionada', () => {
            cy.get('[data-test=dataEscolaridade]')
                .select('1graucomp')
                .should('have.value', '1graucomp') // Lembre de utilizar o value e nao o texto visot na tela
        })
    })

    describe.only('Combo Multiplo', () => {
        it('Ao selecionar multiplas opcoes no campo "Pratica esportes ?" todas as opcoes escolhidas aparecerao marcadas', () => {
            cy.get('[data-testid=dataEsportes]')
                .select(['natacao', 'futebol', 'nada'])
        })
    })
})

