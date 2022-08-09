const locators = {
    HOME:{
        BTN_CUSTOMER_LOGIN:'.borderM > :nth-child(1) > .btn',
        BTN_BANK_MANAGER_LOGIN:':nth-child(3) > .btn',
    },

    MENU:{
        BTN_HOME:'.home',
    },
    
    BANK_MANAGER:{
        MENU_ADD_CUSTOMER:'[ng-class="btnClass1"]',
        MENU_OPEN_ACCOUNT:'[ng-class="btnClass2"]',
        MENU_CUSTOMERS:'[ng-class="btnClass3"]',
    },

    ADD_CUSTOMER:{
        FIRST_NAME_INPUT:':nth-child(1) > .form-control',
        LAST_NAME_INPUT:':nth-child(2) > .form-control',
        POST_CODE_INPUT:':nth-child(3) > .form-control',
        BTN_ADD_CUSTOMER:'form.ng-dirty > .btn',

    },

    CUSTOMER_LOGIN:{
        USER:'#userSelect',
        BTN_LOGIN:'form.ng-valid > .btn',
    },

    CUSTOMERS:{
        PAGE_CONTENT:'.borderM',
        FN_XPATH_CUSTOMER_ACCOUNT_NUMBER: customer_first_name => `//td[contains(.,'${customer_first_name}')]/../td[4]`,
    },

    OPEN_ACCOUNT:{
        USER:'#userSelect',
        CURRENCY:'#currency',
        BTN_PROCESS:'form.ng-dirty > button',
    },

    CUSTOMER_ACCOUNT:{
        PAGE_CONTENT:'.borderM',
        MENU_DEPOSIT:'[ng-class="btnClass2"]',
        MENU_WITHDRAWL:'[ng-class="btnClass3"]',
        VALUE_INPUT:'.form-control',
        BTN_TRANSACTION:'form.ng-dirty > .btn',
        TRANSACTION_STATUS_MESSAGE:'.error',
        XPATH_BALANCE_VALUE:"//div[@class='center'][contains(.,'Balance')]/strong[2]",
    }
}

export default locators;