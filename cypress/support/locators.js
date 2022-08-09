const locators = {
    LOGIN: {
        USER:'[data-test=email]',
        PASSWORD:'[data-test=passwd]',
        BTN_LOGIN:'.btn'
    },
    MENU:{
        HOME:'[data-test=menu-home]',
        SETTINGS:'[data-test=menu-settings]',
        CONTAS:'[href="/contas"]',
        RESET:'[href="/reset"]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]'
    },
    CONTAS:{
        NOME:'[data-test=nome]',
        BTN_SALVAR:'.btn',
        FN_XP_BTN_ALTERAR: nome => `//table//td[contains(.,'${nome}')]/..//i[@class='far fa-edit']`
    },
    MOVIMENTACAO:{
        DESCRICAO:'[data-test=descricao]',
        VALOR:'[data-test=valor]',
        INTERESSADO:'[data-test=envolvido]',
        STATUS:'[data-test=status]',
        BTN_SALVAR:'.btn-primary'
    },
    EXTRATO:{
        TRANSACOES:'.list-group > li'
    },
    SALDO:{
        FN_XP_SALDO_CONTA: nome => `//td[contains(.,'${nome}')]/../td[2]`
    },
    MESSAGE:'.toast-message'
}

export default locators;