/// <reference types="cypress" />

describe('Popup...', () => {
    it('Manipulando Popup diretamente', () => {
        const stub = cy.stub().as('alert')
        cy.visit('https://www.wcaquino.me/cypress/frame.html')
        cy.get('#tfield').type('funciona ?')
        cy.on('window:alert',stub)
        cy.get('#otherButton')
            .click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Click OK!')
            })
    });

    it('Verificando se o Popup e aberto', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen')
        })
        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called')
    });

    describe('Manipulando Popups com links', () => {

        beforeEach(() => {
            cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        });

        it('Checando url do popup', () => {
            // Utilizado para links estaticos
            cy.contains('Popup2')
                .should('have.prop', 'href')
                .and('equal', 'https://www.wcaquino.me/cypress/frame.html')
        });

        it('Checando url dinamica do popup', () => {
            cy.contains('Popup2').then(a => {
                const href = a.prop('href') // O JQuery coleta a url que estiver no campo href
                cy.visit(href)
                cy.get('#tfield')
                    .type('funciona ?')
                    .should('have.value', 'funciona ?')
            })
        })

        it('Forca a entrada na url do popup e manipula-o com cypress', () => {
            // Remove o atributo target e clica no butao forcando a abertura da nova pagina no cypress
            const stub = cy.stub().as('alert')
            cy.contains('Popup2')
                .invoke('removeAttr', 'target')
                .click()
            cy.get('#tfield')
                .type('funciona ?')
                .should('have.value', 'funciona ?')
            cy.on('window:alert', stub)
            cy.on('window:alert',stub)
            cy.get('#otherButton')
                .click()
                .then(() => {
                    expect(stub.getCall(0)).to.be.calledWith('Click OK!')
                })
        });
        
    });
});