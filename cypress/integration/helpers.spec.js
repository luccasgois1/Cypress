/// <reference types="cypress" />

describe('Helpers', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Wrap', () => {
        // Wrap é utilizado para encapsular um elemento do javascript e coloca-lo dentro do cypress para poder utilizar as ferramentas do cypress para avalia-lo como should

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500)
        })

        cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botao'))
        cy.wrap(promise).then(retorno => console.log(retorno)) // Utilizando o wrap com essa promise eu garanto que a funcao sera executada respeitando a ordem do Cypress visto que esta sendo resolvida pelo cypress por estar encapsulada
        cy.get('#buttonList').then(() => console.log('Encontrei o segundo botao'))
    });

    it('Its', () => {
        cy.title()
            .its('length') // Serve para acessar parametros de objetos ex: {nome: Luccas, sobrenome: Gois} .its('nome').should('be.equal', 'Luccas')
            .should('be.equal', 20)
    });

    it.only('Invoke', () => {
        const soma = (a, b) => a + b
        cy.wrap({funcao_soma:soma})
        .invoke('funcao_soma', 2, 7) // usada para chamar funcoes do objeto JS que nao sao do Cypress para o Cypress
        .should('be.equal', 9)

        cy.get('#resultado')
        .invoke('html', '<input type="button" value="Hacked XD" \>')
        // Acessou o objeto resultado na pagina e invocou a funcao html para inserir um codigo html no objeto
    });
});